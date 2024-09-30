from rest_framework import serializers
from .models import MembroProjeto

class MembroProjetoSerializer(serializers.ModelSerializer):
    nome_grupo = serializers.SerializerMethodField()
    nome_membro = serializers.SerializerMethodField()
    usuario_github = serializers.SerializerMethodField()
    
    class Meta:
        model = MembroProjeto
        fields = ['id', 'projeto', 'membro', 'nome_membro', 'nome_grupo', 'usuario_github']
        
    def get_nome_grupo(self, obj):
        return obj.membro.grupo.name 
    
    def get_nome_membro (self, obj):
        return obj.membro.nome
    
    def get_usuario_github(self, obj): 
        return obj.membro.usuario_github
        