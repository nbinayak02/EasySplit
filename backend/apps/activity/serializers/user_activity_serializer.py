from rest_framework.serializers import ModelSerializer

from apps.activity.models import Activity
from apps.group.serializers import GroupSerializer
from apps.user.serializers import UserSerializer


class UserActivitySerializer(ModelSerializer):
    user = UserSerializer()
    group = GroupSerializer()
    class Meta:
        model = Activity
        fields = ("user", "group", "module", "action", "details", "created_at", "id")
