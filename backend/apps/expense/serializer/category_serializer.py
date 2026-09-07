from rest_framework import serializers

from apps.expense.models import ExpenseCategory


class ExpenseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseCategory
        fields = [  # noqa: RUF012
            "name",
            "group",
            "id",
            "created_at",
            "updated_at",
            "created_by",
            "updated_by",
        ]
        read_only_fields = [  # noqa: RUF012
            "created_at",
            "updated_at",
            "id",
            "created_by",
            "updated_by",
        ]
