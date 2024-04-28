from django.contrib import admin
from .models import Iteracao

class IteracaoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'status', 'data_inicio', 'data_fim', 'exibir_projeto', 'exibir_lider', 'exibir_etapa')
    search_fields = ('nome', )
    
    def exibir_projeto(self, obj):
        if (obj.projeto.nome):
            return obj.projeto.nome
    exibir_projeto.short_description = 'Projeto'
        
    def exibir_lider(self, obj):
        if obj.lider:
            return obj.lider.membro.nome
        return None
    exibir_lider.short_description = 'Gerente'
    
    def exibir_etapa(self, obj):
        return obj.fase.etapa.nome
    exibir_etapa.short_description = 'Fase'

admin.site.register(Iteracao, IteracaoAdmin)
