from rest_framework import serializers
from .models import FuncaoMembro, CategoriaFuncaoMembro

class FuncaoMembroSerializer(serializers.ModelSerializer):
    
    nome_categoria_funcao = serializers.SerializerMethodField()
    
    class Meta:
        model = FuncaoMembro
        fields = ['id', 'membro_projeto', 'categoria_funcao', 'nome_categoria_funcao', 'status']
        
    def get_nome_categoria_funcao(self, obj):
        return obj.categoria_funcao.nome
        
class CategoriaFuncaoMembroSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaFuncaoMembro
        fields = '__all__'
        