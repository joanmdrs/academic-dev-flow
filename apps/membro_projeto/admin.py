from django.contrib import admin

from .models import MembroProjeto

class MembroProjetoAdmin(admin.ModelAdmin):
    
    list_display = ('id', 'exibir_projeto', 'exibir_membro',)
    
    def exibir_projeto(self, obj):
        return obj.projeto.nome
    exibir_projeto.short_description = 'Projeto'
        
    def exibir_membro(self, obj):
        return obj.membro.nome
    exibir_membro.short_description = 'Membro'

admin.site.register(MembroProjeto, MembroProjetoAdmin)
