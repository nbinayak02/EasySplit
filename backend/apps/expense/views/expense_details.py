from django.db import transaction
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView

from apps.activity.models import ActionType, ModulesType
from apps.activity.services import create_activity
from apps.expense.models import Expense
from apps.expense.serializer import UpdateExpenseInfoSerializer
from apps.expense.services import (
    expense_deletion_service,
)
from apps.shared.response import APIResponse


class ExpenseDetailsView(APIView):
    serializer_class = None

    def get_expense(self, expense_id):
        try:
            return Expense.objects.get(pk=expense_id)
        except Expense.DoesNotExist:
            # sends 404 instead of 500
            raise NotFound("The expense is not found.")

    def get(self, request, expense_id):
        expense = self.get_expense(expense_id=expense_id)
        serializer = UpdateExpenseInfoSerializer(expense)
        return APIResponse(
            message="Expense info fetched successfully", data=serializer.data
        )

    @transaction.atomic
    def delete(self, request, expense_id):

        expense = self.get_expense(expense_id=expense_id)

        if expense.created_by != request.user:
            return APIResponse(
                message="You cannot delete expense created by others.",
                success=False,
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            )

        expense_deletion_service(expense)

        # record activity
        create_activity(
            user_id=request.user.id,
            group_id=expense.group_id,
            module=ModulesType.EXPENSE,
            action=ActionType.DELETE,
        )

        return APIResponse(message="Expense deleted successfully")

    @transaction.atomic
    def patch(self, request, expense_id):

        expense = self.get_expense(expense_id=expense_id)

        if expense.created_by != request.user:
            return APIResponse(
                message="You cannot update expense created by others.",
                success=False,
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            )

        serializer = UpdateExpenseInfoSerializer(expense, data=request.data)

        serializer.is_valid(raise_exception=True)

        serializer.save()

        create_activity(
            user_id=request.user.id,
            group_id=expense.group_id,
            module=ModulesType.EXPENSE,
            action=ActionType.UPDATE,
        )

        return APIResponse(message="Expense updated successfully.")
