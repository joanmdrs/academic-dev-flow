from rest_framework import serializers
from .models import Etapa

class EtapaSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Projeto
        fields = '__all__'