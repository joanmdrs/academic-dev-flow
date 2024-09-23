from rest_framework import serializers
from .models import Membro

from django.contrib.auth.models import Group

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']  
        
        
class MembroSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Membro
        fields = '__all__'
        