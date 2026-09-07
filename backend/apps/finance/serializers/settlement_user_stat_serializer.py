from rest_framework import serializers

from apps.finance.models import Settlement
from apps.group.serializers import GroupSerializer
from apps.user.serializers import UserSerializer


class UserSettlementsStatsSerializer(serializers.ModelSerializer):
    group = GroupSerializer()
    paid_by = UserSerializer()
    paid_to = UserSerializer()

    class Meta:
        model = Settlement
        fields = (
            "id",
            "group",
            "paid_by",
            "paid_to",
            "amount",
            "created_at",
            "updated_at",
        )
