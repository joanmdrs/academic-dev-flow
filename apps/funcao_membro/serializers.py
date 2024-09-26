from rest_framework import serializers
from .models import FuncaoMembro, CategoriaFuncaoMembro

class FuncaoMembroSerializer(serializers.ModelSerializer):
    class Meta:
        model = FuncaoMembro
        fields = '__all__'
        
class CategoriaFuncaoMembroSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaFuncaoMembro
        fields = '__all__'
        