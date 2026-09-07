from django.db import transaction
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.views import APIView

from apps.activity.models import ActionType, ModulesType
from apps.activity.services import create_activity
from apps.finance.serializers import BalanceSerializer
from apps.group.serializers import GroupSerializer, MembershipSerializer
from apps.shared.response import APIResponse


class GroupsView(APIView):
    serializer_class = GroupSerializer
    parser_classes = (MultiPartParser, FormParser)

    @transaction.atomic
    def post(self, request):
        """
        Creates a group and adds group creator to that group with admin privilage.
        """

        # Validate payload
        serializer = GroupSerializer(data=request.data)


        # Raise exception if invalid
        serializer.is_valid(raise_exception=True)

        # Save validated data, provide extra data directly to save it
        group_instance = serializer.save(
            created_by=request.user, updated_by=request.user
        )

        # Add user to group
        membership_payload = {
            "user": request.user.id,
            "group": group_instance.id,
            "isAdmin": True,
        }

        membership_serializer = MembershipSerializer(data=membership_payload)

        membership_serializer.is_valid(raise_exception=True)

        membership_serializer.save()

        # Create balance record for this user on this group
        balance_serializer = BalanceSerializer(
            data={"user": request.user.id, "group": group_instance.id, "balance": 0}
        )

        balance_serializer.is_valid(raise_exception=True)

        balance_serializer.save()

        create_activity(
            user_id=request.user.id,
            group_id=group_instance.id,
            module=ModulesType.GROUP,
            action=ActionType.CREATE,
            details={"group": group_instance.name},
        )

        return APIResponse(
            message="Group created successfully",
            data=serializer.data,
            status_code=status.HTTP_201_CREATED,
        )
