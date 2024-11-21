from rest_framework import serializers
from .models import Release

class ReleaseSerializer(serializers.ModelSerializer):
    nome_projeto = serializers.SerializerMethodField()
    nome_responsavel = serializers.SerializerMethodField()
    
    class Meta:
        model = Release
        fields = [
            'id', 
            'nome', 
            'descricao', 
            'status', 
            'data_lancamento',
            'projeto', 
            'nome_projeto',
            'responsavel',
            'nome_responsavel'
        ]
        
    def get_nome_projeto(self, obj):
        return obj.projeto.nome if obj.projeto else None
    
    def get_nome_responsavel(self, obj):
        return obj.responsavel.membro.nome if obj.responsavel else None

