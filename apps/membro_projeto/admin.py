from django.contrib import admin

from .models import MembroProjeto, HistoricoMembroProjeto

class MembroProjetoAdmin(admin.ModelAdmin):
    
    list_display = ('id', 'exibir_projeto', 'exibir_membro', 'funcao',)
    
    def exibir_projeto(self, obj):
        return obj.projeto.nome
    exibir_projeto.short_description = 'Projeto'
        
    def exibir_membro(self, obj):
        return obj.membro.nome
    exibir_membro.short_description = 'Membro'

class HistoricoMembroProjetoAdmin(admin.ModelAdmin):
    
    list_display = ('id', 'exibir_membro', 'funcao', 'data_modificacao')
    
    def exibir_membro(self, obj):
        if obj.membro_projeto:
            return obj.membro_projeto.membro.nome
        return None
    exibir_membro.short_description = 'Membro'

admin.site.register(MembroProjeto, MembroProjetoAdmin)
admin.site.register(HistoricoMembroProjeto, HistoricoMembroProjetoAdmin)
