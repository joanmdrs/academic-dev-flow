from rest_framework import serializers
from .models import Membro, UsuarioGithub

class MembroSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Membro
        fields = '__all__'
        

class UsuarioGithubSerializer(serializers.ModelSerializer):
    class Meta: 
        model = UsuarioGithub
        fields = '__all__'