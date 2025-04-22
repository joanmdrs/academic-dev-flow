from rest_framework import serializers
from .models import Chat, Mensagem
from apps.membro.models import Membro

class ChatSerializer(serializers.ModelSerializer):
    nome_projeto = serializers.SerializerMethodField()
    
    class Meta: 
        model = Chat
        fields = [
            'id',
            'nome',
            'projeto',
            'projeto_nome',
            'data_criacao',
        ]
        read_only_fields = ['id', 'data_criacao', 'projeto_nome']
    
    def get_nome_projeto(self, obj):
        return obj.projeto.nome if obj.projeto else None
    
class MensagemSerializer(serializers.ModelSerializer):
    nome_autor = serializers.SerializerMethodField()
    
    class Meta:
        model = Mensagem
        fields = [
            'id',
            'chat',
            'autor',
            'nome_autor',
            'conteudo',
            'enviado_em',
            'editado_em'
        ]
        read_only_fields = ['id', 'enviado_em', 'editado_em']
        
    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['autor'] = user
        return super().create(validated_data)
        
    def get_nome_autor(self, obj):
        membro = Membro.objects.get(usuario=obj.autor.id)
        return membro.nome if membro else None
        
       

        
    
    
        
    

    