from django.contrib import admin
from .models import Iteracao

class IteracaoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'status', 'data_inicio', 'data_termino', 'exibir_projeto', 'exibir_responsavel', 'exibir_etapa')
    search_fields = ('nome', )
    
    def exibir_projeto(self, obj):
        if (obj.projeto.nome):
            return obj.projeto.nome
    exibir_projeto.short_description = 'Projeto'
        
    def exibir_responsavel(self, obj):
        if obj.responsavel:
            return obj.responsavel.membro.nome
        return None
    exibir_responsavel.short_description = 'Responsável'
    
    def exibir_etapa(self, obj):
        return obj.etapa.etapa.nome
    exibir_etapa.short_description = 'Etapa'

admin.site.register(Iteracao, IteracaoAdmin)
