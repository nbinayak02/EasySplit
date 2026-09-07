from django.urls import path

from apps.user.views import (
    ChangePasswordView,
    UpdateUserProfileView,
    UserDetailsView,
    UserListView,
)

urlpatterns = [
    path("", UserDetailsView.as_view()),
    path("profile-image/", UpdateUserProfileView.as_view()),
    path("change-password/", ChangePasswordView.as_view()),
    path(
        "group/<int:group_id>/",
        UserListView.as_view(),
    ),
]
