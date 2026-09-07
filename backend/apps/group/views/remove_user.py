from django.db import transaction
from rest_framework import status
from rest_framework.views import APIView

from apps.activity.models import ActionType, ModulesType
from apps.activity.services import create_activity
from apps.finance.models.balance import Balance
from apps.group.models.membership import GroupMembership
from apps.shared.response import APIResponse


class RemoveUserView(APIView):
    serializer_class = None

    @transaction.atomic
    def post(self, request, group_id, user_id):

        is_request_user_admin = GroupMembership.objects.filter(
            group_id=group_id, user_id=request.user.id, isAdmin=True
        ).exists()

        if not is_request_user_admin:
            return APIResponse(
                message="Only group admin can perform this action.",
                success=False,
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            )

        # check user balance
        user_balance = Balance.objects.get(user_id=user_id, group_id=group_id)

        if user_balance.balance != 0:
            return APIResponse(
                message="Cannot remove the user from the group as they have pending settlements left.",
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            )

        GroupMembership.objects.filter(user_id=user_id, group_id=group_id).delete()

        create_activity(
            user_id=request.user.id,
            group_id=group_id,
            action=ActionType.DELETE,
            module=ModulesType.USER,
        )

        return APIResponse(
            message="Removed user from the group successfully.",
        )
