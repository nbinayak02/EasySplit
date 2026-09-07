from rest_framework import status
from rest_framework.views import APIView

from apps.group.models import GroupMembership, Groups
from apps.group.serializers import PublicGroupIdSerializer
from apps.shared.response import APIResponse


class ValidateUserGroupJoined(APIView):
    def get(self, request, public_group_id):
        """
        Returns true if user joined a group
        """

        # Validate public group id
        serializer = PublicGroupIdSerializer(data={"group_id": public_group_id})

        serializer.is_valid(raise_exception=True)

        # Retrive group
        group = Groups.objects.get(group_id=public_group_id)

        if group is None:
            return APIResponse(
                success=False, message="Group not found for provided public group id."
            )

        # check if user is joined
        isUserJoined = GroupMembership.objects.filter(
            user=request.user.id, group=group.id
        ).exists()

        if isUserJoined == False:
            return APIResponse(
                success=False,
                message="You do not have permission to view the group.",
                status_code=status.HTTP_200_OK,
                data=False,
            )

        return APIResponse(
            data=True,
        )
