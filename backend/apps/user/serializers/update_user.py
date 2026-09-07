from rest_framework.serializers import ModelSerializer

from apps.user.models import User


class UpdateUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "first_name", "last_name", "email")
        read_only_fields = ["id"]
