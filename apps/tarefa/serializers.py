from rest_framework import serializers
from .models import Tarefa, CategoriaTarefa, IntervaloTempo
from apps.membro_projeto.models import MembroProjeto
from apps.membro.models import Membro
from apps.membro.serializers import MembroSerializer

class IntervaloTempoSerializer(serializers.ModelSerializer):
    class Meta:
        model = IntervaloTempo
        fields = '__all__'

class CategoriaTarefaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaTarefa
        fields = '__all__'  
        

class TarefaSerializer(serializers.ModelSerializer):
    nome_iteracao = serializers.SerializerMethodField()
    nome_categoria = serializers.SerializerMethodField()
    cor_categoria = serializers.SerializerMethodField()
    nome_projeto = serializers.SerializerMethodField()
    estado_contagem_tempo = serializers.SerializerMethodField()
    membros_info = serializers.SerializerMethodField()
    nomes_membros = serializers.SerializerMethodField()
    ids_membros = serializers.SerializerMethodField()
    dados_tags = serializers.SerializerMethodField()
    
    class Meta:
        model = Tarefa
        fields = [
            'id', 
            'nome', 
            'descricao', 
            'data_criacao', 
            'data_inicio', 
            'data_termino',
            'data_conclusao', 
            'status', 
            'tempo_gasto', 
            'id_issue',
            'number_issue',
            'url_issue',
            'membros',
            'projeto',
            'nome_projeto',
            'iteracao',
            'nome_iteracao',
            'categoria',
            'nome_categoria',
            'cor_categoria',
            'estado_contagem_tempo',
            'membros_info',
            'ids_membros',
            'nomes_membros',
            'tags',
            'dados_tags'
        ]

    def get_nome_projeto(self, obj):
        return obj.projeto.nome if obj.projeto else None

    def get_nome_iteracao(self, obj):
        return obj.iteracao.nome if obj.iteracao else None

    def get_nome_categoria(self, obj):
        return obj.categoria.nome if obj.categoria else None
    
    def get_cor_categoria(self, obj):
        return obj.categoria.cor if obj.categoria else None

    def get_estado_contagem_tempo(self, obj):
        return obj.estado_contagem_tempo()

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
    
    def get_nomes_membros(self, obj):
        membros = obj.membros.all()
        nomes_membros = [membro.membro.nome for membro in membros]
        return nomes_membros

    def get_dados_tags(self, obj):
        if obj.tags.exists():
            tags = obj.tags.all()  
            return [
                {
                    "id": tag.id, 
                    "nome": tag.nome, 
                    "cor": tag.cor  
                }
                for tag in tags 
            ]
        return []
