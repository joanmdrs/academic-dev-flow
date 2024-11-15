from rest_framework import serializers
from .models import Etapa

class EtapaSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Etapa
        fields = '__all__'
        read_only_fields = ['created_by']

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['created_by'] = user
        return super().create(validated_data)
        