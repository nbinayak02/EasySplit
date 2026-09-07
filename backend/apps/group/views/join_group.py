from django.db import transaction
from rest_framework import status
from rest_framework.views import APIView

from apps.activity.models import ActionType, ModulesType
from apps.activity.services import create_activity
from apps.finance.serializers import BalanceSerializer
from apps.group.models import Groups
from apps.group.serializers import (
    GroupSerializer,
    MembershipSerializer,
    PublicGroupIdSerializer,
)
from apps.shared.exceptions import ResourceNotFoundException
from apps.shared.response import APIResponse


class JoinGroupView(APIView):
    serializer_class = PublicGroupIdSerializer

    @transaction.atomic
    def post(self, request, public_group_id):
        """
        Joins user to a group via public group id.
        """

        # Validate public_group_id
        serializer = PublicGroupIdSerializer(data={"group_id": public_group_id})

        serializer.is_valid(raise_exception=True)

        try:
            group = Groups.objects.get(group_id=public_group_id)

            membership_payload = {
                "user": request.user.id,
                "group": group.id,
                "isAdmin": False,
            }

            membership_serializer = MembershipSerializer(data=membership_payload)

            membership_serializer.is_valid(raise_exception=True)

            membership_serializer.save()

            # Create balance record for this user on this group
            balance_serializer = BalanceSerializer(
                data={"user": request.user.id, "group": group.id, "balance": 0}
            )

            balance_serializer.is_valid(raise_exception=True)

            balance_serializer.save()

            serialized_group = GroupSerializer(group)

            create_activity(
                user_id=request.user.id,
                group_id=group.id,
                module=ModulesType.GROUP,
                action=ActionType.JOIN,
            )

            return APIResponse(
                message="Group Joined Successfully.",
                data=serialized_group.data,
                status_code=status.HTTP_200_OK,
            )

        except Groups.DoesNotExist:
            raise ResourceNotFoundException("Provided public group id is not valid.")
