from rest_framework import status
from rest_framework.views import APIView

from apps.expense.models.category import ExpenseCategory
from apps.expense.serializer import ExpenseCategorySerializer
from apps.shared.exceptions.custom_exceptions import ResourceNotFoundException
from apps.shared.response import APIResponse


class CategoryDetailView(APIView):
    serializer_class = None

    def get_category(self, pk):
        try:
            category = ExpenseCategory.objects.get(pk=pk)
            return category
        except ExpenseCategory.DoesNotExist:
            raise ResourceNotFoundException("Category not found.")

    def get(self, request, id):

        category = self.get_category(id)

        serializer = ExpenseCategorySerializer(category)

        return APIResponse(
            message="Category fetched successfully", data=serializer.data
        )

    def put(self, request, id):

        category = self.get_category(id)

        serializer = ExpenseCategorySerializer(
            category, data=request.data, partial=True
        )

        serializer.is_valid(raise_exception=True)

        serializer.save(updated_by=request.user)

        return APIResponse(
            message="Category updated successfully", data=serializer.data
        )

    def delete(self, request, id):

        category = self.get_category(id)

        category.delete()

        return APIResponse(
            message="Category Deleted successfully",
            status_code=status.HTTP_204_NO_CONTENT,
        )
