from rest_framework import serializers
from .models import Iteracao

class IteracaoSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Iteracao
        fields = '__all__'
        