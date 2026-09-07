from rest_framework import status
from rest_framework.views import APIView

from apps.expense.serializer import ExpenseCategorySerializer
from apps.shared.response import APIResponse


class CategroyView(APIView):
    serializer_class = ExpenseCategorySerializer

    def post(self, request):
        """
        Create a category
        """

        serializer = ExpenseCategorySerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        serializer.save(created_by=request.user, updated_by=request.user)

        return APIResponse(
            message="Category created successfully.",
            data=serializer.data,
            status_code=status.HTTP_201_CREATED,
        )
