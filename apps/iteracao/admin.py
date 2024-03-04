from django.contrib import admin
from .models import Iteracao

class IteracaoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'status', 'data_inicio', 'data_fim', 'exibir_projeto', 'exibir_gerente')
    search_fields = ('nome', )
    
    def exibir_projeto(self, obj):
        return obj.projeto.nome
    exibir_projeto.short_description = 'Projeto'
        
    def exibir_gerente(self, obj):
        if obj.gerente:
            return obj.gerente.membro.nome
        return None
    exibir_gerente.short_description = 'Gerente'

admin.site.register(Iteracao, IteracaoAdmin)
