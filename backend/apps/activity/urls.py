from django.urls import path

from apps.activity.views import UserActivityView

urlpatterns = [path("user/", UserActivityView.as_view())]
