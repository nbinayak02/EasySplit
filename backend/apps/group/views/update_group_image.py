from django.db import transaction
from rest_framework.exceptions import PermissionDenied
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.views import APIView

from apps.activity.models import ActionType, ModulesType
from apps.activity.services import create_activity
from apps.group.models import GroupMembership, Groups
from apps.group.serializers import (
    UpdateGroupProfileImageSerializer,
)
from apps.shared.response import APIResponse


class UpdateGroupImageView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = UpdateGroupProfileImageSerializer

    def get_group(self, group_id):
        return Groups.objects.get(pk=group_id)

    def only_allow_admin(self, user_id, group_id):

        is_admin = GroupMembership.objects.filter(
            user_id=user_id, group_id=group_id, isAdmin=True
        ).exists()

        if not is_admin:
            raise PermissionDenied("Only admin can perform this action.")

    @transaction.atomic
    def patch(self, request, group_id):

        self.only_allow_admin(user_id=request.user.id, group_id=group_id)

        group = self.get_group(group_id=group_id)

        serializer = UpdateGroupProfileImageSerializer(group, request.data)

        serializer.is_valid(raise_exception=True)

        serializer.save()

        create_activity(
            group_id=group_id,
            user_id=request.user.id,
            action=ActionType.UPDATE,
            module=ModulesType.GROUP,
        )

        return APIResponse(message="Group updated successfully", data=serializer.data)
