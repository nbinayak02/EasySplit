from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView

from apps.expense.models.expense import Expense
from apps.expense.serializer import ExpenseResponseSerializer
from apps.shared.response import APIResponse


class ExpenseDetailByGroupView(APIView):
    @extend_schema(responses=ExpenseResponseSerializer)
    def get(self, request, group_id):
        """
        Returns all expenses by group_id
        """

        expenses = Expense.objects.filter(group_id=group_id).prefetch_related(
            "initial_payment_expense",
            "split_participant_expense",
        )

        response_serializer = ExpenseResponseSerializer(expenses, many=True)

        return APIResponse(
            message="Expenses fetched successfully", data=response_serializer.data
        )
