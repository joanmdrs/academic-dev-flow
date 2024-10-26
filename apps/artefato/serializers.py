from rest_framework import serializers
from .models import Artefato
from apps.membro_projeto.models import MembroProjeto

class MembroSerializer(serializers.ModelSerializer):
    nome_membro = serializers.CharField(source='membro.nome')  # Acessa o nome do Membro
    grupo_membro = serializers.CharField(source='membro.grupo.name')  # Acessa o grupo do Membro (se existir)

    class Meta:
        model = MembroProjeto
        fields = ['id', 'nome_membro', 'grupo_membro'] 

class ArtefatoSerializer(serializers.ModelSerializer):
    nome_iteracao = serializers.SerializerMethodField()
    nome_projeto = serializers.SerializerMethodField()
    membros_info = serializers.SerializerMethodField()
    nomes_membros = serializers.SerializerMethodField()
    ids_membros = serializers.SerializerMethodField()
    
    class Meta:
        model = Artefato
        fields = [
            'id',
            'nome',
            'status',
            'descricao',
            'data_criacao',
            'data_termino',
            'projeto',
            'nome_projeto',
            'iteracao',
            'nome_iteracao',
            'url',
            'id_content',
            'path_content',
            'pontuacao',
            'membros',
            'membros_info',
            'ids_membros',
            'nomes_membros',
        ]
        
    def get_nome_projeto(self, obj):
        return obj.projeto.nome if obj.projeto else None

    def get_nome_iteracao(self, obj):
        return obj.iteracao.nome if obj.iteracao else None

    def get_membros_info(self, obj):
        membros = obj.membros.all()
        return MembroSerializer(membros, many=True).data
    
    def get_ids_membros(self, obj):
        membros = obj.membros.all()
        ids_membros = [membro.membro.id for membro in membros]
        return ids_membros
    
    def get_nomes_membros(self, obj):
        membros = obj.membros.all()
        nomes_membros = [membro.membro.nome for membro in membros]
        return nomes_membros
        