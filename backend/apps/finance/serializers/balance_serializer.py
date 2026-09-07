from rest_framework.serializers import ModelSerializer

from apps.finance.models import Balance


class BalanceSerializer(ModelSerializer):
    class Meta:
        model = Balance
        fields = ["user", "group", "balance"]
        