from rest_framework import serializers
from .models import Iteracao
        
class IteracaoSerializer(serializers.ModelSerializer):
    nome_projeto = serializers.SerializerMethodField()
    nome_release = serializers.SerializerMethodField()
    nome_responsavel = serializers.SerializerMethodField()
    dados_etapas = serializers.SerializerMethodField()
    
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
            'etapas',
            'dados_etapas'
            
        ]
        
    def get_nome_projeto(self, obj):
        return obj.projeto.nome if obj.projeto else None
        
    def get_nome_release(self, obj):
        return obj.release.nome if obj.release else None
    
    def get_nome_responsavel(self, obj):
        return obj.responsavel.membro.nome if obj.responsavel else None

    def get_dados_etapas(self, obj):
        if obj.etapas.exists():
            etapas = obj.etapas.all()  
            return [
                {
                    "id": etapa.etapa.id, 
                    "nome": etapa.etapa.nome, 
                    "descricao": etapa.etapa.descricao  
                }
                for etapa in etapas if etapa.etapa 
            ]
        return []

        
