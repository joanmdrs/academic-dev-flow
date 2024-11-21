
from rest_framework import serializers
from .models import FluxoEtapa

class FluxoEtapaSerializer(serializers.ModelSerializer):
    
    nome_fluxo = serializers.SerializerMethodField()
    nome_etapa = serializers.SerializerMethodField()
    descricao_etapa = serializers.SerializerMethodField()
    
    
    class Meta:
        model = FluxoEtapa
        fields = [
            'id',
            'fluxo',
            'nome_fluxo',
            'etapa',
            'nome_etapa',
            'descricao_etapa',
            'ordem_no_fluxo',
            'data_adicao',
            'created_by' 
        ]
        read_only_fields = ['created_by']

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['created_by'] = user
        return super().create(validated_data)
    
        
    def get_nome_fluxo(self, obj):
        if obj.fluxo:
            return obj.fluxo.nome
        return None  
    
    def get_nome_etapa(self, obj): 
        if obj.etapa:
            return obj.etapa.nome
        return None
    
    def get_descricao_etapa(self, obj):
        return obj.etapa.descricao if obj.etapa.descricao else None
