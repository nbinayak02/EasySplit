from rest_framework.permissions import AllowAny
from rest_framework.views import APIView

from apps.group.models import Groups
from apps.group.serializers import GroupSerializer, PublicGroupIdSerializer
from apps.shared.response import APIResponse


class PublicGroupDetailView(APIView):
    serializer_class = PublicGroupIdSerializer
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request, public_group_id):
        """
        Returns a group having public_group_id
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

        # Serialize group to json
        serialized_group = GroupSerializer(group)

        return APIResponse(
            data=serialized_group.data,
        )
