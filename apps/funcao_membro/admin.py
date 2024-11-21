from django.contrib import admin
from .models import CategoriaFuncaoMembro, FuncaoMembro


class CategoriaFuncaoMembroAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'descricao', 'cor')

class FuncaoMembroAdmin(admin.ModelAdmin):
    list_display = ('id', 'exibir_membro', 'exibir_funcao', 'status')
    
    def exibir_membro(self, obj):
        return obj.membro_projeto.membro.nome
    exibir_membro.short_description = 'Membro'
    
    def exibir_funcao(self, obj):
        return obj.categoria_funcao.nome
    exibir_funcao.short_description = 'Funcao'
    
admin.site.register(CategoriaFuncaoMembro, CategoriaFuncaoMembroAdmin)
admin.site.register(FuncaoMembro, FuncaoMembroAdmin)