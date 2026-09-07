from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenBlacklistSerializer

from apps.shared.response import APIResponse


class LogoutView(APIView):
    serializer_class = None

    def post(self, request):

        # get refresh token from cookie
        refresh_token = request.COOKIES.get("refresh_token")

        # black list
        TokenBlacklistSerializer(data=refresh_token)

        response = APIResponse(
            message="Logout Successful", status_code=status.HTTP_204_NO_CONTENT
        )

        response.delete_cookie("refresh_token")
        response.delete_cookie("access_token")

        return response
