from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

# from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("health/", include("apps.health.urls")),
    path("auth/", include("apps.authentication.urls")),
    path("user/", include("apps.user.urls")),
    path("expense/", include("apps.expense.urls")),
    path("group/", include("apps.group.urls")),
    path("finance/", include("apps.finance.urls")),
    path("activity/", include("apps.activity.urls")),
    # path("swagger/", SpectacularSwaggerView.as_view(), name="swagger"),
    # path(
    #     "schema/",
    #     SpectacularAPIView.as_view(),
    #     name="schema",
    # ),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
