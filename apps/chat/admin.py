from django.contrib import admin
from .models import Chat, Mensagem

class ChatAdmin(admin.ModelAdmin):
    list_display = ('id','nome', 'projeto', 'data_criacao')
    list_filter = ('projeto', 'data_criacao')
    search_fields = ('nome',)

class MensagemAdmin(admin.ModelAdmin):
    list_display = ('chat', 'conteudo', 'autor', 'enviado_em', 'editado_em')
    list_filter = ('chat', 'autor', 'enviado_em')
    search_fields = ('autor',)
    
admin.site.register(Chat, ChatAdmin)
admin.site.register(Mensagem, MensagemAdmin)

