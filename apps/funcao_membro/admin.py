from django.contrib import admin
from .models import CategoriaFuncao, FuncaoMembroProjeto


class CategoriaFuncaoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'descricao')

class FuncaoMembroProjetoAdmin(admin.ModelAdmin):
    
    list_display = ('id', 'exibir_membro', 'exibir_funcao', 'data_inicio', 'data_termino')
    
    def exibir_membro(self, obj):
        return obj.membro_projeto.membro.nome
    exibir_membro.short_description = 'Membro'
    
    def exibir_funcao(self, obj):
        return obj.categoria_funcao.nome
    exibir_funcao.short_description = 'Funcao'
    
admin.site.register(CategoriaFuncao, CategoriaFuncaoAdmin)
admin.site.register(FuncaoMembroProjeto, FuncaoMembroProjetoAdmin)