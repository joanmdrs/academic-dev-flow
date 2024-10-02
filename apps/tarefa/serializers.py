from rest_framework import serializers
from .models import Tarefa, CategoriaTarefa, IntervaloTempo
from apps.membro_projeto.models import MembroProjeto
from apps.membro.models import Membro

class IntervaloTempoSerializer(serializers.ModelSerializer):
    class Meta:
        model = IntervaloTempo
        fields = '__all__'

class CategoriaTarefaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaTarefa
        fields = '__all__'  

class MembroSerializer(serializers.ModelSerializer):
    nome_membro = serializers.CharField(source='membro.nome')  # Acessa o nome do Membro
    grupo_membro = serializers.CharField(source='membro.grupo.name')  # Acessa o grupo do Membro (se existir)

    class Meta:
        model = MembroProjeto
        fields = ['id', 'nome_membro', 'grupo_membro'] 
        

class TarefaSerializer(serializers.ModelSerializer):
    nome_iteracao = serializers.SerializerMethodField()
    nome_categoria = serializers.SerializerMethodField()
    nome_projeto = serializers.SerializerMethodField()
    estado_contagem_tempo = serializers.SerializerMethodField()
    membros_info = serializers.SerializerMethodField()

    class Meta:
        model = Tarefa
        fields = [
            'id', 
            'nome', 
            'descricao', 
            'data_criacao', 
            'data_inicio', 
            'data_termino', 
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
            'estado_contagem_tempo',
            'membros_info',  # Campo adicionado para informações dos membros
        ]

    def get_nome_projeto(self, obj):
        return obj.projeto.nome if obj.projeto else None

    def get_nome_iteracao(self, obj):
        return obj.iteracao.nome if obj.iteracao else None

    def get_nome_categoria(self, obj):
        return obj.categoria.nome if obj.categoria else None

    def get_estado_contagem_tempo(self, obj):
        return obj.estado_contagem_tempo()

    def get_membros_info(self, obj):
        membros = obj.membros.all()
        return MembroSerializer(membros, many=True).data
