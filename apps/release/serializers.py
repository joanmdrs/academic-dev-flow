from rest_framework import serializers
from .models import Release

class ReleaseSerializer(serializers.ModelSerializer):
    nome_projeto = serializers.SerializerMethodField()
    nome_responsavel = serializers.SerializerMethodField()
    nome_etapa = serializers.SerializerMethodField()
    
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
            'nome_responsavel',
            'etapa',
            'nome_etapa',
        ]
        
    def get_nome_projeto(self, obj):
        return obj.projeto.nome if obj.projeto else None
    
    def get_nome_responsavel(self, obj):
        return obj.responsavel.membro.nome if obj.responsavel else None

    def get_nome_etapa(self, obj):
        return obj.etapa.etapa.nome if obj.etapa else None
