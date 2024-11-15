from rest_framework import serializers
from .models import FuncaoMembro, CategoriaFuncaoMembro

class FuncaoMembroSerializer(serializers.ModelSerializer):
    
    nome_categoria_funcao = serializers.SerializerMethodField()
    nome_membro = serializers.SerializerMethodField()
    nome_grupo = serializers.SerializerMethodField()
    nome_projeto = serializers.SerializerMethodField()
    nome_iteracao = serializers.SerializerMethodField()
    
    class Meta:
        model = FuncaoMembro
        fields = [
            'id', 
            'membro_projeto',
            'nome_membro', 
            'nome_grupo',
            'categoria_funcao', 
            'nome_categoria_funcao', 
            'nome_projeto',
            'iteracao',
            'nome_iteracao',
            'data_atribuicao',
            'data_desativacao',
            'status',
        ]
        
        
    def get_nome_categoria_funcao(self, obj):
        return obj.categoria_funcao.nome
    
    def get_nome_membro(self, obj):
        return obj.membro_projeto.membro.nome
    
    def get_nome_grupo(self, obj):
        return obj.membro_projeto.membro.grupo.name
    
    def get_nome_projeto(self, obj):
        return obj.membro_projeto.projeto.nome
    
    def get_nome_iteracao(self, obj):
        return obj.iteracao.nome if obj.iteracao else None
        
class CategoriaFuncaoMembroSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaFuncaoMembro
        fields = '__all__'
        