from rest_framework import serializers
from .models import MembroProjeto

class MembroProjetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MembroProjeto
        fields = '__all__'
        