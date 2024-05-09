from rest_framework import serializers
from .models import ComentarioTarefa, ComentarioArtefato

class ComentarioTarefaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComentarioTarefa
        fields = '__all__'

class ComentarioArtefatoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComentarioArtefato
        fields = '__all__'
