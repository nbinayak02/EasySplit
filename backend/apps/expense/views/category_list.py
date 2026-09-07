from rest_framework.views import APIView

from apps.expense.models import ExpenseCategory
from apps.expense.serializer import ExpenseCategorySerializer
from apps.shared.response import APIResponse


class CategoryListView(APIView):
    serializer_class = None

    def get(self, request, group_id):
        """
        Returns a list of categories by group_id
        """

        categories = ExpenseCategory.objects.filter(group_id=group_id)

        serializer = ExpenseCategorySerializer(categories, many=True)

        return APIResponse(
            message="Categories fetched successfully.", data=serializer.data
        )
