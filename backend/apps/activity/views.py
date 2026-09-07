from django.db.models import Q
from drf_spectacular.utils import extend_schema
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView

from apps.activity.models import Activity
from apps.activity.serializers import UserActivitySerializer
from apps.group.models.group import Groups
from apps.shared.response import APIResponse


class UserActivityView(APIView):
    pagination_class = PageNumberPagination

    @extend_schema(responses=UserActivitySerializer)
    def get(self, request):

        # Find groups where user is joined
        groups = Groups.objects.filter(member_group__user=request.user.id)

        activity = (
            Activity.objects.filter(Q(user_id=request.user.id) | Q(group__in=groups))
            .select_related("group", "user")
            .order_by("-created_at")
        )

        paginator = self.pagination_class()

        result = paginator.paginate_queryset(activity, request)

        serializer = UserActivitySerializer(result, many=True)

        return APIResponse(
            data=serializer.data,
            meta={
                "count": paginator.page.paginator.count,
                "previous": paginator.page.previous_page_number()
                if paginator.page.has_previous()
                else None,
                "next": paginator.page.next_page_number()
                if paginator.page.has_next()
                else None,  # if no next or previous page, it will throw exception instead send null as response
            },
        )
