from django.urls import path

from apps.expense.views import (
    CategoryDetailView,
    CategoryListView,
    CategroyView,
    CreateExpenseView,
    ExpenseDetailByGroupView,
    ExpenseDetailsView,
)

urlpatterns = [
    path("", CreateExpenseView.as_view()),
    path("group/<int:group_id>/", ExpenseDetailByGroupView.as_view()),
    path("category/", CategroyView.as_view()),
    path("category/<int:id>/", CategoryDetailView.as_view()),
    path("category/group/<int:group_id>/", CategoryListView.as_view()),
    path("<int:expense_id>/", ExpenseDetailsView.as_view()),
]
