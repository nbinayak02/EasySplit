from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.views import APIView

from apps.shared.response import APIResponse
from apps.user.serializers import UpdateUserProfileImageSerializer


class UpdateUserProfileView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = UpdateUserProfileImageSerializer

    def patch(self, request):

        serializer = UpdateUserProfileImageSerializer(request.user, request.data)

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return APIResponse(
            message="Profile updated successfully.", data=serializer.data
        )
