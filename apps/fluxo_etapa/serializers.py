
from rest_framework import serializers
from .models import FluxoEtapa

class FluxoEtapaSerializer(serializers.ModelSerializer):
    class Meta: 
        model = FluxoEtapa
        fields = '__all__'