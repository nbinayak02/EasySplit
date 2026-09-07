from rest_framework.serializers import ModelSerializer

from apps.expense.models import Expense


class UpdateExpenseInfoSerializer(ModelSerializer):
    class Meta:
        model = Expense
        fields = ("id", "title", "category")
        read_only_fields = ["id"]