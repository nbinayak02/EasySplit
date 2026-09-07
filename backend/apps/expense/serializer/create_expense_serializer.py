from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from apps.expense.models import Expense
from apps.expense.models.expense import SplitType
from apps.user.models import User


# for validating amount and user id
class PayerSerializer(serializers.Serializer):
    """
    Validates payer id and amount paid.
    """

    id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)


# for validating split
class SplitSerializer(serializers.Serializer):
    """
    Validates split types and it's corresponding payloads.
    """

    type = serializers.ChoiceField(choices=SplitType.choices)

    participants = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), many=True, required=False
    )

    shares = PayerSerializer(many=True, required=False)

    def validate(self, data):

        type = data.get("type")
        shares = data.get("shares")

        # Assume empty participants as split equally with all group members

        if type != SplitType.EQUALLY and (not shares or len(shares) <= 1):
            raise serializers.ValidationError(
                "At least two persons are required to split the bill."
            )

        return data


# final serializer
class CreateExpenseSerializer(ModelSerializer):
    """
    Serializer to validate expense creation payload.
    """

    payers = PayerSerializer(many=True)
    split = SplitSerializer()

    class Meta:
        model = Expense

        fields = (
            "id",
            "title",
            "amount",
            "category",
            "group",
            "payers",
            "split",
            "created_at",
            "updated_at",
            "created_by",
            "updated_by",
        )

        read_only_fields = (
            "id",
            "created_at",
            "updated_at",
            "created_by",
            "updated_by",
        )

    def validate(self, data):

        # the validate function runs after the field validation has completed.
        # since field validation has requred so we need not to supply default value while using get()
        amount = data.get("amount")
        payers = data.get("payers")
        split = data.get("split")
        split_type = split.get("type")

        totalPaidAmount = sum(payer.get("amount") for payer in payers)

        if totalPaidAmount != amount:
            raise serializers.ValidationError(
                "Total paid amount must be equal to expense amount."
            )

        if split_type == SplitType.AMOUNT:
            shares = split.get("shares")
            totalSplitAmount = sum(share.get("amount") for share in shares)

            if totalSplitAmount != amount:
                raise serializers.ValidationError(
                    "Total split amount must be equal to expense amount."
                )

        if split_type == SplitType.PERCENTAGE:
            shares = split.get("shares")
            totalSplitPercentage = sum(share.get("amount") for share in shares)

            if totalSplitPercentage != 100:
                raise serializers.ValidationError(
                    "Total split percentage must be equal to 100%"
                )
        return data
