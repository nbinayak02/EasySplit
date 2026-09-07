from rest_framework.serializers import ModelSerializer

from apps.finance.models.initial_payment import InitialPayment


class InitialPaymentSerializer(ModelSerializer):
    class Meta:
        model = InitialPayment
        fields = ("expense", "paid_by", "amount")
