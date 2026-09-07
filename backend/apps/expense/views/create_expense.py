from django.db import transaction
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.views import APIView

from apps.activity.models import ActionType, ModulesType
from apps.activity.services import create_activity
from apps.expense.serializer import (
    CreateExpenseSerializer,
    ExpenseResponseSerializer,
)
from apps.expense.services import expense_creation_service
from apps.shared.response import APIResponse


class CreateExpenseView(APIView):
    """
    Creates expense, splits the amount and saves initial payments.
    """

    # decorate to tell swagger to use different serializer in request and response
    @extend_schema(request=CreateExpenseSerializer, responses=ExpenseResponseSerializer)
    @transaction.atomic
    def post(self, request):

        # validate request
        serialized_request = CreateExpenseSerializer(data=request.data)

        # throw error
        serialized_request.is_valid(raise_exception=True)

        # store validated data
        valid_data = serialized_request.validated_data

        valid_data["created_by"] = request.user
        valid_data["updated_by"] = request.user

        created_expense = expense_creation_service(valid_data=valid_data)

        details = {
            "title": created_expense["title"],
            "amount": created_expense["amount"],
        }

        group = valid_data.get("group")

        create_activity(
            user_id=request.user.id,
            group_id=group.id,
            module=ModulesType.EXPENSE,
            action=ActionType.CREATE,
            details=details,
        )

        return APIResponse(
            message="Expense created successfully",
            data=created_expense,
            status_code=status.HTTP_201_CREATED,
        )
