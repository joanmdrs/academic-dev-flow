from rest_framework import serializers
from .models import Membro

from django.contrib.auth.models import Group

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']  
        
        
class MembroSerializer(serializers.ModelSerializer):
    nome_grupo = serializers.SerializerMethodField()

    class Meta:
        model = Membro
        fields = ['id', 'nome', 'data_nascimento', 'telefone', 'email', 'linkedin', 'lattes', 'nome_github', 'email_github', 'usuario_github', 'usuario', 'grupo', 'nome_grupo']

    def get_nome_grupo(self, obj):
        return obj.grupo.name  # Retorna o nome do grupo relacionado