from rest_framework.permissions import AllowAny
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
)
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer

from apps.shared.response import APIResponse


class RefreshView(APIView):
    serializer_class = None
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")

        if refresh_token is None:
            return APIResponse(
                message="Refresh token not found.",
                success=False,
                status_code=HTTP_400_BAD_REQUEST,
            )

        serializer = TokenRefreshSerializer(data={"refresh": refresh_token})

        if serializer.is_valid():
            refresh_token = serializer.validated_data["refresh"]
            access_token = serializer.validated_data["access"]

            response = APIResponse(status_code=HTTP_200_OK)

            response.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=False,
                samesite="Lax",
                path="/",
            )

            response.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=False,
                samesite="Lax",
                path="/",
            )

            return response
        else:
            return APIResponse(
                success=False, status_code=HTTP_401_UNAUTHORIZED, errors="TOKEN_INVALID"
            )
