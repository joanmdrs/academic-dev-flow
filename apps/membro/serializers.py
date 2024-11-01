from rest_framework import serializers
from .models import Membro

from django.contrib.auth.models import Group

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']  
        
class MembroSerializer(serializers.ModelSerializer):
    nome_grupo = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    password = serializers.SerializerMethodField()

    class Meta:
        model = Membro
        fields = ['id', 'nome', 'data_nascimento', 'telefone', 'email', 'linkedin', 'lattes', 'nome_github', 'email_github', 'usuario_github', 'usuario', 'username', 'password', 'grupo', 'nome_grupo', 'avatar']

    def get_nome_grupo(self, obj):
        return obj.grupo.name 
    
    def get_username(self, obj):
        return obj.usuario.username
    
    def get_password(self, obj):
        return obj.usuario.password