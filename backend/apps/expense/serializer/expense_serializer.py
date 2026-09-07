from rest_framework.serializers import ModelSerializer

from apps.expense.models.expense import Expense


class ExpenseSerializer(ModelSerializer):
    class Meta:
        model = Expense
        fields = (
            "id",
            "title",
            "amount",
            "category",
            "group",
            "split_type",
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
