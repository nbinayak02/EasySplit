from django.urls import path

from apps.authentication.views import (
    LoginView,
    LogoutView,
    RefreshView,
    SignupView,
    VerifyView,
)

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("signup/", SignupView.as_view(), name="signup"),
    path("verify/", VerifyView.as_view(), name="verify"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("refresh/", RefreshView.as_view(), name="refresh"),
]
