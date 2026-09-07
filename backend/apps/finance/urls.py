from django.urls import path

from apps.finance.views import (
    CreateSettlementView,
    GroupBalanceListView,
    GroupSettlementListView,
    SettlementDetailView,
    SimplifiedSettlementView,
    UserBalanceStatsView,
    UserSettlementStatsView,
)

urlpatterns = [
    path("settlement/user/", CreateSettlementView.as_view()),
    path("settlement/<int:id>/", SettlementDetailView.as_view()),
    path("settlement/user/<int:user_id>/", UserSettlementStatsView.as_view()),
    path("settlement/group/<int:group_id>/", GroupSettlementListView.as_view()),
    path("settlement/simplified/<int:group_id>/", SimplifiedSettlementView.as_view()),
    path("balance/group/<int:group_id>/", GroupBalanceListView.as_view()),
    path("balance/user/<int:user_id>/", UserBalanceStatsView.as_view()),
]
