from rest_framework import serializers
from .models import ComentarioTarefa, ComentarioArtefato

class ComentarioTarefaSerializer(serializers.ModelSerializer):
    nome_autor = serializers.SerializerMethodField()
    avatar_autor = serializers.SerializerMethodField()
    
    class Meta:
        model = ComentarioTarefa
        fields = [
            'id',
            'mensagem',
            'tarefa',
            'data_hora',
            'autor',
            'nome_autor',
            'avatar_autor',
            'comentario_pai'
        ]
        
    def get_nome_autor(self, obj):
        return obj.autor.membro.nome if obj.autor else None

    def get_avatar_autor(self, obj):
        return obj.autor.membro.avatar if obj.autor else None
    
class ComentarioArtefatoSerializer(serializers.ModelSerializer):
    nome_autor = serializers.SerializerMethodField()
    avatar_autor = serializers.SerializerMethodField()

    class Meta:
        model = ComentarioArtefato
        fields = [
            'id',
            'mensagem',
            'artefato',
            'data_hora',
            'autor',
            'nome_autor',
            'avatar_autor',
            'comentario_pai'
        ]
        
    def get_nome_autor(self, obj):
        return obj.autor.membro.nome if obj.autor else None
    
    def get_avatar_autor(self, obj):
        return obj.autor.membro.avatar if obj.autor else None
