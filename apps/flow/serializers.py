from rest_framework import serializers
from .models import Flow

class FlowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flow
        fields = '__all__'