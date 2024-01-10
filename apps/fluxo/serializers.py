from rest_framework import serializers
from .models import Fluxo

class FluxoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fluxo
        fields = '__all__'