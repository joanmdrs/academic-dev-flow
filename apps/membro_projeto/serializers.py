from rest_framework import serializers
from django.db.models import Count
from .models import MembroProjeto
from apps.tarefa.models import Tarefa
from apps.artefato.models import Artefato
from apps.projeto.models import Projeto
from apps.projeto.serializers import ProjetoSerializer
from apps.funcao_membro.models import FuncaoMembro
from apps.funcao_membro.serializers import FuncaoMembroSerializer
from apps.membro.models import Membro
from apps.membro.serializers import MembroSerializer

class MembroProjetoSerializer(serializers.ModelSerializer):
    grupo = serializers.SerializerMethodField()
    nome_grupo = serializers.SerializerMethodField()
    nome_membro = serializers.SerializerMethodField()
    nome_projeto = serializers.SerializerMethodField()
    descricao_projeto = serializers.SerializerMethodField()
    status_projeto = serializers.SerializerMethodField()
    data_inicio_projeto = serializers.SerializerMethodField()
    data_termino_projeto = serializers.SerializerMethodField()
    quantidade_membros = serializers.SerializerMethodField()  
    usuario_github = serializers.SerializerMethodField()
    id_fluxo = serializers.SerializerMethodField()
    nome_fluxo = serializers.SerializerMethodField()
    quantidade_tarefas = serializers.SerializerMethodField()
    quantidade_artefatos = serializers.SerializerMethodField()
    funcoes_membro = serializers.SerializerMethodField()
    equipe = serializers.SerializerMethodField()
    dados_projeto = serializers.SerializerMethodField()
    coordenador = serializers.SerializerMethodField()
    nome_coordenador = serializers.SerializerMethodField()
    
    class Meta:
        model = MembroProjeto
        fields = ['id', 
                  'projeto', 
                  'membro', 
                  'nome_membro', 
                  'nome_projeto', 
                  'descricao_projeto',
                  'grupo',
                  'nome_grupo', 
                  'coordenador',
                  'nome_coordenador',
                  'usuario_github', 
                  'status_projeto',
                  'data_inicio_projeto',
                  'data_termino_projeto',
                  'quantidade_membros',
                  'quantidade_artefatos',
                  'quantidade_tarefas',
                  'id_fluxo',
                  'nome_fluxo',
                  'funcoes_membro',
                  'equipe',
                  'dados_projeto'
                ] 
        
    def get_coordenador(self, obj):
        if obj.projeto.coordenador:
            return obj.projeto.coordenador.id
        return None
    
    def get_nome_coordenador(self, obj):
        if obj.projeto.coordenador:
            return obj.projeto.coordenador.nome
        return None
        
    def get_grupo(self, obj):
        if obj.membro.usuario and obj.membro.usuario.groups.exists():
            return obj.membro.usuario.groups.first().id
        return None
    
    def get_nome_grupo(self, obj):
        if obj.membro.usuario and obj.membro.usuario.groups.exists():
            return obj.membro.usuario.groups.first().name
        return "Sem grupo"

    def get_nome_membro(self, obj):
        return obj.membro.nome

    def get_nome_projeto(self, obj): 
        return obj.projeto.nome

    def get_descricao_projeto(self, obj):
        return obj.projeto.descricao
    
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
    
    def get_quantidade_tarefas(self, obj):
        quantidade_tarefas = Tarefa.objects.filter(projeto=obj.projeto).count()
        return quantidade_tarefas
    
    def get_quantidade_artefatos(self, obj):
        quantidade_artefatos = Artefato.objects.filter(projeto=obj.projeto).count()
        return quantidade_artefatos
    
    def get_funcoes_membro(self, obj):
        funcoes_membro = FuncaoMembro.objects.filter(membro_projeto=obj.id).order_by("id")
        serializer = FuncaoMembroSerializer(funcoes_membro, many=True)
        return serializer.data
    
    def get_equipe(self, obj):
        membros_projeto_ids = MembroProjeto.objects.filter(projeto=obj.projeto).values_list('membro', flat=True)
        
        membros = Membro.objects.filter(id__in=membros_projeto_ids)
        
        serializer = MembroSerializer(membros, many=True)
        return serializer.data
    
    def get_dados_projeto(self, obj):
        projeto = Projeto.objects.get(id=obj.projeto_id)
        serializer = ProjetoSerializer(projeto, many=False)
        return serializer.data
    