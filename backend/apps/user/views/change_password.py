from rest_framework.views import APIView

from apps.shared.response import APIResponse
from apps.user.serializers import ChangePasswordSerializer


class ChangePasswordView(APIView):
    serializer_class = ChangePasswordSerializer

    def patch(self, request):

        serializer = ChangePasswordSerializer(request.user, data=request.data)

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return APIResponse(message="Password changed successfully.")
