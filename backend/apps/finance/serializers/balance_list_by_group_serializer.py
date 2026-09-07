from rest_framework.serializers import ModelSerializer

from apps.finance.models.balance import Balance
from apps.user.serializers import UserSerializer


class BalanceListByGroupSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Balance
        fields = ("id", "user", "group", "balance")
