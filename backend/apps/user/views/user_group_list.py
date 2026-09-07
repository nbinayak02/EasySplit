from rest_framework.views import APIView

from apps.group.models import GroupMembership
from apps.shared.response import APIResponse
from apps.user.serializers import GroupMemberListSerializer


class UserListView(APIView):
    serializer_class = None

    def get(self, request, group_id):
        """
        Returns the list of user joined in a group.
        """

        # find users joined in the group
        users = GroupMembership.objects.filter(group=group_id).select_related("user")

        # convert to json
        serializer = GroupMemberListSerializer(users, many=True)

        return APIResponse(message="Users fetched successfully", data=serializer.data)
