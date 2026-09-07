from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from apps.shared.response import APIResponse


class LoginView(APIView):
    serializer_class = TokenObtainPairSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):

        # get token
        serializer = TokenObtainPairSerializer(data=request.data)

        # if not valid, raise error
        serializer.is_valid(raise_exception=True)

        refresh_token = serializer.validated_data["refresh"]
        access_token = serializer.validated_data["access"]

        response = APIResponse(
            message="Login Successful", status_code=status.HTTP_200_OK, data=None
        )

        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,
            secure=False,
            samesite="Lax",
            path="/",
            max_age=7 * 24 * 60 * 60,
        )

        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=False,
            samesite="Lax",
            path="/",
            max_age=15 * 60 * 60,  # max age takes seconds
        )

        return response
