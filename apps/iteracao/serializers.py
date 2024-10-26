from rest_framework import serializers
from .models import Iteracao
        
class IteracaoSerializer(serializers.ModelSerializer):
    nome_projeto = serializers.SerializerMethodField()
    nome_release = serializers.SerializerMethodField()
    nome_responsavel = serializers.SerializerMethodField()
    nome_etapa = serializers.SerializerMethodField()
    
    class Meta: 
        model = Iteracao
        fields = [
            'id', 
            'nome', 
            'descricao', 
            'ordem', 
            'status', 
            'data_inicio', 
            'data_termino', 
            'projeto', 
            'nome_projeto',
            'release',
            'nome_release',
            'responsavel',
            'nome_responsavel',
            'etapa',
            'nome_etapa',
            
        ]
        
    def get_nome_projeto(self, obj):
        return obj.projeto.nome if obj.projeto else None
        
    def get_nome_release(self, obj):
        return obj.release.nome if obj.release else None
    
    def get_nome_responsavel(self, obj):
        return obj.responsavel.membro.nome if obj.responsavel else None

    def get_nome_etapa(self, obj):
        return obj.etapa.etapa.nome if obj.etapa else None
