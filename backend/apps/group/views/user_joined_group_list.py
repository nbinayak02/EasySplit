from django.db.models.aggregates import Count
from rest_framework import status
from rest_framework.views import APIView

from apps.group.models import GroupMembership, Groups
from apps.group.serializers import GroupSerializer
from apps.shared.response import APIResponse


class UserJoinedGroupsListView(APIView):
    serializer_class = None
    
    # Get all groups where user is joined
    def get(self, request):
        """
        Returns the list of groups where the user is joined. Also total number of members in each group is returned with list.
        """
        data = []

        # Find groups where user is joined
        groups = Groups.objects.filter(member_group__user=request.user.id)

        # Create a list of those group id
        group_ids = [group.id for group in groups]

        # Fetch total_user in each groups
        user_count = (
            GroupMembership.objects.filter(group_id__in=group_ids)
            .values("group_id")
            .annotate(total_users=Count("id"))
        )

        # user_count is in format: {group_id:1, total_users:4}
        # To simplify getting the value to add to group convert to dictionary of form
        # {1:4}

        user_count_dict = {
            u_count["group_id"]: u_count["total_users"] for u_count in user_count
        }

        # Convert group queryset to json
        serializer = GroupSerializer(groups, many=True)

        data = serializer.data

        # Append corresponding user count to group
        for group in data:
            group_id = group.get("id")
            total_user = user_count_dict.get(group_id)
            group["total_user"] = total_user

        return APIResponse(data=data, status_code=status.HTTP_200_OK)
