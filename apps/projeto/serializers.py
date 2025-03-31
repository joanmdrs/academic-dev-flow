from rest_framework import serializers
from .models import Projeto

class ProjetoSerializer(serializers.ModelSerializer):
    
    nome_fluxo = serializers.SerializerMethodField()
    
    class Meta:
        model = Projeto
        fields = [
            'id',
            'nome', 
            'descricao', 
            'status', 
            'data_inicio', 
            'data_termino', 
            'nome_repo', 
            'link_repo', 
            'link_site', 
            'token', 
            'coordenador',
            'fluxo',
            'nome_fluxo']
        
    def get_nome_fluxo(self, obj):
        if obj.fluxo:
            return obj.fluxo.nome
        return None  
    
    def get_nome_coordenador(self, obj):
        if obj.coordenador:
            return obj.coordenador.nome
        return None

  
        
        