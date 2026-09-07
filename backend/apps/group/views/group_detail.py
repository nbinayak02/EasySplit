from django.db import transaction
from django.db.models import Q
from django.db.models.aggregates import Count, Sum
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from rest_framework.views import APIView

from apps.activity.models import ActionType, ModulesType
from apps.activity.services import create_activity
from apps.finance.models.balance import Balance
from apps.group.models import GroupMembership, Groups
from apps.group.serializers import GroupSerializer, UpdateGroupSerializer
from apps.shared.exceptions.custom_exceptions import ResourceNotFoundException
from apps.shared.response import APIResponse


class GroupDetailView(APIView):
    serializer_class = None

    def get_group(self, group_id):
        try:
            return Groups.objects.get(pk=group_id)
        except Groups.DoesNotExist:
            raise ResourceNotFoundException("Group not found.")

    def only_allow_admin(self, user_id, group_id):

        is_admin = GroupMembership.objects.filter(
            user_id=user_id, group_id=group_id, isAdmin=True
        ).exists()

        if not is_admin:
            raise PermissionDenied("Only admin can perform this action.")

    def get(self, request, group_id):
        group = self.get_group(group_id=group_id)

        a = 1 / 0

        serializer = GroupSerializer(group)

        return APIResponse(message="Group fetched successfully", data=serializer.data)

    @extend_schema(request=UpdateGroupSerializer, responses=UpdateGroupSerializer)
    @transaction.atomic
    def put(self, request, group_id):

        self.only_allow_admin(user_id=request.user.id, group_id=group_id)

        group = self.get_group(group_id=group_id)

        serializer = UpdateGroupSerializer(group, request.data, partial=True)

        serializer.is_valid(raise_exception=True)

        serializer.save()

        create_activity(
            group_id=group_id,
            user_id=request.user.id,
            action=ActionType.UPDATE,
            module=ModulesType.GROUP,
        )

        return APIResponse(message="Group updated successfully", data=serializer.data)

    @transaction.atomic
    def delete(self, request, group_id):

        self.only_allow_admin(user_id=request.user.id, group_id=group_id)
        group = self.get_group(group_id=group_id)
        print(group)

        group_balance = Balance.objects.filter(group=group).aggregate(
            total_negative_count=Count("balance", filter=Q(balance__lt=0))
        )

        if group_balance.get("total_negative_count") != 0:
            return APIResponse(
                success=False,
                message="Cannot delete group as it has pending settlements left.",
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            )

        create_activity(
            group_id=group_id,
            user_id=request.user.id,
            action=ActionType.DELETE,
            module=ModulesType.GROUP,
            details={"group": group.name},
        )

        group.delete()

        return APIResponse(
            message="Group deleted successfully", status_code=status.HTTP_200_OK
        )
