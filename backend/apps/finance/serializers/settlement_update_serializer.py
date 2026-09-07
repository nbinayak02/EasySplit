from rest_framework.serializers import ModelSerializer

from apps.finance.models import Settlement


class SettlementUpdatePaidToSerializer(ModelSerializer):
    class Meta:
        model = Settlement
        fields = ["paid_to", "amount"]
