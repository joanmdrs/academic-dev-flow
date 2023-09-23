from rest_framework import serializers
from .models import Projeto

class ProjetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projeto
        fields = '__all__'  # Inclui todos os campos do modelo
