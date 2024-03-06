from django.contrib import admin
from .models import Tarefa

class TarefaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'data_criacao', 'concluida', 'exibir_projeto', 'exibir_membro')

    def exibir_membro(self, obj):
        return obj.membro.membro.nome
    exibir_membro.short_description = 'Atribuído'
    
    def exibir_projeto(self, obj):
        return obj.projeto.nome
    exibir_projeto.short_description = 'Projeto'
        
    
admin.site.register(Tarefa, TarefaAdmin)

