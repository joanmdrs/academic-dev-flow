from rest_framework import serializers
from .models import Artefato

class ArtefatoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artefato
        fields = '__all__'