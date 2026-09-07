from rest_framework.serializers import ModelSerializer, ValidationError

from apps.finance.models import Settlement


class SettlementSerializer(ModelSerializer):
    class Meta:
        model = Settlement
        fields = (
            "group",
            "paid_by",
            "paid_to",
            "amount",
            "created_at",
            "updated_at",
        )

        read_only_fields = ("created_at", "updated_at")

        def validate(self, data):
            paid_by = data.paid_by
            paid_to = data.paid_to

            if paid_by == paid_to:
                raise ValidationError("You cannot pay to yourself.")

            return data
