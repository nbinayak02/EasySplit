from rest_framework.serializers import ModelSerializer

from apps.activity.models import Activity


class ActivitySerializer(ModelSerializer):
    class Meta:
        model = Activity
        fields = ("user", "group", "module", "action", "details")
        read_only_fields = ["created_at"]
