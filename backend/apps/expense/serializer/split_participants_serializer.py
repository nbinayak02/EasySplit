from rest_framework.serializers import ModelSerializer

from apps.expense.models.split_participants import SplitParticipant


class SplitParticipantsSerializer(ModelSerializer):
    class Meta:
        model = SplitParticipant
        fields = "__all__"
