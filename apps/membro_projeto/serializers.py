from rest_framework import serializers
from .models import MembroProjeto, FuncaoMembroProjeto, CategoriaFuncao

class MembroProjetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MembroProjeto
        fields = '__all__'
        
class FuncaoMembroProjetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FuncaoMembroProjeto
        fields = '__all__'
        
class CategoriaFuncaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaFuncao
        fields = '__all__'
        
