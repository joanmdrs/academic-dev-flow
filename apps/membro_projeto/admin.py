from django.contrib import admin

from .models import MembroProjeto, FuncaoMembroProjeto, FuncaoMembroProjetoAtual


class MembroProjetoAdmin(admin.ModelAdmin):
    
    list_display = ('id', 'exibir_projeto', 'exibir_membro',)
    
    def exibir_projeto(self, obj):
        return obj.projeto.nome
    exibir_projeto.short_description = 'Projeto'
        
    def exibir_membro(self, obj):
        return obj.membro.nome
    exibir_membro.short_description = 'Membro'
    
class FuncaoMembroProjetoAmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'descricao')

class FuncaoMembroProjetoAtualAdmin(admin.ModelAdmin):
    
    list_display = ('id', 'exibir_membro', 'exibir_funcao', 'data_inicio', 'data_termino')
    
    def exibir_membro(self, obj):
        return obj.membro_projeto.membro.nome
    exibir_membro.short_description = 'Membro'
    
    def exibir_funcao(self, obj):
        return obj.funcao_membro.nome
    exibir_funcao.short_description = 'Funcao'

admin.site.register(MembroProjeto, MembroProjetoAdmin)
admin.site.register(FuncaoMembroProjeto, FuncaoMembroProjetoAmin)
admin.site.register(FuncaoMembroProjetoAtual, FuncaoMembroProjetoAtualAdmin)
