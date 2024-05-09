from rest_framework import serializers
from .models import MembroProjeto, FuncaoMembroProjeto, FuncaoMembroProjetoAtual

class MembroProjetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MembroProjeto
        fields = '__all__'
        
class FuncaoMembroProjetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FuncaoMembroProjeto
        fields = '__all__'
        
class FuncaoMembroProjetoAtualSerializer(serializers.ModelSerializer):
    class Meta:
        model = FuncaoMembroProjetoAtual
        fields = '__all__'
        
