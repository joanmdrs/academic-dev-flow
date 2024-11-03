from rest_framework import serializers
from .models import Artefato
from apps.membro.models import Membro
from apps.membro.serializers import MembroSerializer
from apps.membro_projeto.models import MembroProjeto

class ArtefatoSerializer(serializers.ModelSerializer):
    nome_iteracao = serializers.SerializerMethodField()
    nome_projeto = serializers.SerializerMethodField()
    membros_info = serializers.SerializerMethodField()
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
        ]
        
    def get_nome_projeto(self, obj):
        return obj.projeto.nome if obj.projeto else None

    def get_nome_iteracao(self, obj):
        return obj.iteracao.nome if obj.iteracao else None

    def get_membros_info(self, obj):
        membros_projeto = obj.membros.all()
        ids_membros = [membro.membro.id for membro in membros_projeto]
        membros = Membro.objects.filter(id__in=ids_membros)
        serializer = MembroSerializer(membros, many=True)
        return serializer.data
    
    def get_ids_membros(self, obj):
        membros = obj.membros.all()
        ids_membros = [membro.membro.id for membro in membros]
        return ids_membros
        