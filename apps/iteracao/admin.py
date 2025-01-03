from django.contrib import admin
from .models import Iteracao

class IteracaoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'status', 'data_inicio', 'data_termino', 'exibir_projeto', 'exibir_responsavel')
    search_fields = ('nome', )
    
    def exibir_projeto(self, obj):
        if (obj.projeto.nome):
            return obj.projeto.nome
        return None
    exibir_projeto.short_description = 'Projeto'
        
    def exibir_responsavel(self, obj):
        if obj.responsavel:
            return obj.responsavel.membro.nome
        return None
    exibir_responsavel.short_description = 'Responsável'


admin.site.register(Iteracao, IteracaoAdmin)
