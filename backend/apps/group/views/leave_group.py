from django.db import transaction
from rest_framework import status
from rest_framework.views import APIView

from apps.activity.models import ActionType, ModulesType
from apps.activity.services import create_activity
from apps.finance.models import Balance
from apps.group.models import GroupMembership
from apps.shared.response import APIResponse


class LeaveGroupView(APIView):
    serializer_class = None

    @transaction.atomic
    def post(self, request, group_id):

        user_balance = Balance.objects.get(user_id=request.user.id, group_id=group_id)

        if user_balance.balance != 0:
            return APIResponse(
                message="You cannot leave the group as you have pending settlements left.",
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            )

        GroupMembership.objects.filter(
            user_id=request.user.id, group_id=group_id
        ).delete()

        create_activity(
            user_id=request.user.id,
            group_id=group_id,
            action=ActionType.LEAVE,
            module=ModulesType.GROUP,
        )

        return APIResponse(
            message="Group left successfully.",
        )
