from rest_framework import serializers
from .models import Iteracao, Release

class ReleaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Release
        fields = '__all__'
        
class IteracaoSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Iteracao
        fields = '__all__'
        
        
        