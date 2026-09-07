from rest_framework import serializers

from apps.expense.models.expense import Expense

from .initial_payment_serializer import InitialPaymentSerializer
from .split_participants_serializer import SplitParticipantsSerializer


class ExpenseResponseSerializer(serializers.ModelSerializer):
    initial_payment = InitialPaymentSerializer(
        source="initial_payment_expense", many=True
    )

    # Source maps the source string to field name
    # expense object has field named by source string as it was fetched by reverse relation related name

    split_participants = SplitParticipantsSerializer(
        source="split_participant_expense", many=True
    )

    class Meta:
        model = Expense
        fields = (
            "id",
            "title",
            "amount",
            "category",
            "group",
            "split_type",
            "initial_payment",
            "split_participants",
            "created_by",
            "updated_by",
            "created_at",
            "updated_at",
        )
