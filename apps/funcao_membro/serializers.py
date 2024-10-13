from rest_framework import serializers
from .models import FuncaoMembro, CategoriaFuncaoMembro

class FuncaoMembroSerializer(serializers.ModelSerializer):
    
    nome_categoria_funcao = serializers.SerializerMethodField()
    nome_membro = serializers.SerializerMethodField()
    nome_projeto = serializers.SerializerMethodField()
    
    class Meta:
        model = FuncaoMembro
        fields = [
            'id', 
            'membro_projeto',
            'nome_membro', 
            'categoria_funcao', 
            'nome_categoria_funcao',  
            'nome_projeto',
            'iteracao',
            'data_atribuicao',
            'data_desativacao',
            'status']
        
    def get_nome_categoria_funcao(self, obj):
        return obj.categoria_funcao.nome
    
    def get_nome_membro(self, obj):
        return obj.membro_projeto.membro.nome
    
    def get_nome_projeto(self, obj):
        return obj.membro_projeto.projeto.nome
        
class CategoriaFuncaoMembroSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaFuncaoMembro
        fields = '__all__'
        