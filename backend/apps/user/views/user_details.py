from django.db.models.aggregates import Sum
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.views import APIView

from apps.finance.models import Balance
from apps.shared.response import APIResponse
from apps.user.models import User
from apps.user.serializers import (
    UpdateUserSerializer,
    UserSerializer,
)


class UserDetailsView(APIView):
    serializer_class = None

    def get(self, request):

        user = User.objects.get(pk=request.user.id)

        serializer = UserSerializer(user)

        return APIResponse(message="User Fetched Successfully", data=serializer.data)

    @extend_schema(request=UpdateUserSerializer, responses=UpdateUserSerializer)
    def put(self, request):

        serializer = UpdateUserSerializer(request.user, request.data, partial=True)

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return APIResponse(message="User updated successfully.", data=serializer.data)

    def delete(self, request):

        balance = Balance.objects.filter(user_id=request.user.id).aggregate(
            total_balance=Sum("balance")
        )

        total = balance.get("total_balance")

        if total is not None and total != 0:
            return APIResponse(
                success=False,
                message="Cannot delete your account. You have some expenses remaining to be settled.",
                status_code=status.HTTP_403_FORBIDDEN,
            )

        request.user.delete()

        return APIResponse(
            message="User deleted successfully", status_code=status.HTTP_200_OK
        )
