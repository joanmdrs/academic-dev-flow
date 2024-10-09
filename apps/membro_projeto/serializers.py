from rest_framework import serializers
from django.db.models import Count
from .models import MembroProjeto

class MembroProjetoSerializer(serializers.ModelSerializer):
    nome_grupo = serializers.SerializerMethodField()
    nome_membro = serializers.SerializerMethodField()
    nome_projeto = serializers.SerializerMethodField()
    status_projeto = serializers.SerializerMethodField()
    data_inicio_projeto = serializers.SerializerMethodField()
    data_termino_projeto = serializers.SerializerMethodField()
    quantidade_membros = serializers.SerializerMethodField()  
    usuario_github = serializers.SerializerMethodField()
    id_fluxo = serializers.SerializerMethodField()
    nome_fluxo = serializers.SerializerMethodField()
    
    class Meta:
        model = MembroProjeto
        fields = ['id', 
                  'projeto', 
                  'membro', 
                  'nome_membro', 
                  'nome_projeto', 
                  'nome_grupo', 
                  'usuario_github', 
                  'status_projeto',
                  'data_inicio_projeto',
                  'data_termino_projeto',
                  'quantidade_membros',
                  'id_fluxo',
                  'nome_fluxo',
                ] 
        
    def get_nome_grupo(self, obj):
        return obj.membro.grupo.name 

    def get_nome_membro(self, obj):
        return obj.membro.nome

    def get_nome_projeto(self, obj): 
        return obj.projeto.nome

    def get_status_projeto(self, obj):
        return obj.projeto.status

    def get_data_inicio_projeto(self, obj):
        return obj.projeto.data_inicio 

    def get_data_termino_projeto(self, obj):
        return obj.projeto.data_termino

    def get_usuario_github(self, obj): 
        return obj.membro.usuario_github
    
    def get_id_fluxo(self, obj):
        # Acessa o id do fluxo
        return obj.projeto.fluxo.id if obj.projeto.fluxo else None  # Verifica se fluxo existe

    def get_nome_fluxo(self, obj):
        # Acessa o nome do fluxo
        return obj.projeto.fluxo.nome if obj.projeto.fluxo else None  # Verifica se fluxo existe

    def get_quantidade_membros(self, obj):
        quantidade_membros = MembroProjeto.objects.filter(projeto=obj.projeto).aggregate(quantidade_membros=Count('id'))
        return quantidade_membros['quantidade_membros']
