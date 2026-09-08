from rest_framework.serializers import ModelSerializer

from .models import HealthModel


class HealthSerializer(ModelSerializer):
    class Meta:
        model = HealthModel
        fields = "__all__"
