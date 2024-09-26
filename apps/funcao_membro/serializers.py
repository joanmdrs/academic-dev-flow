from rest_framework import serializers
from .models import FuncaoMembroProjeto, CategoriaFuncao

class FuncaoMembroProjetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FuncaoMembroProjeto
        fields = '__all__'
        
class CategoriaFuncaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaFuncao
        fields = '__all__'
        