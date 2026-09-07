from rest_framework.serializers import ModelSerializer

from apps.finance.models import Settlement
from apps.user.serializers import UserSerializer


class SettlementListByGroupSerializer(ModelSerializer):
    paid_by = UserSerializer(read_only=True)
    paid_to = UserSerializer(read_only=True)

    class Meta:
        model = Settlement
        fields = (
            "id",
            "paid_by",
            "paid_to",
            "group",
            "amount",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")
