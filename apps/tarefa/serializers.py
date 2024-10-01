from rest_framework import serializers
from .models import Tarefa, CategoriaTarefa

class TarefaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarefa
        fields = '__all__'  
        
class CategoriaTarefaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaTarefa
        fields = '__all__'  