from rest_framework import serializers


class UserBalanceStatsSerializer(serializers.Serializer):
    total_positive = serializers.DecimalField(
        max_digits=10, decimal_places=2, allow_null=True
    )
    total_negative = serializers.DecimalField(
        max_digits=10, decimal_places=2, allow_null=True
    )
    total_groups = serializers.IntegerField(allow_null=True)
