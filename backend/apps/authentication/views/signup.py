from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView

from apps.authentication.serializer import SignupSerializer
from apps.shared.response import APIResponse
from apps.user.models import User


class SignupView(APIView):
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):

        # validate and convert to object
        serializer = SignupSerializer(data=request.data)

        # raise error if not valid
        serializer.is_valid(raise_exception=True)

        # check if user already exists
        if User.objects.filter(email=serializer.validated_data.get("email")).exists():
            return APIResponse(
                success=False,
                message="User already exists.",
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            )

        # save user to db
        serializer.save()

        # return response
        return APIResponse(
            success=True,
            message="Signup Successful.",
            data=serializer.data,
            status_code=status.HTTP_201_CREATED,
        )
