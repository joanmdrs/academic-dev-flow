from django.contrib import admin
from .models import Tarefa

class TarefaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'data_criacao', 'concluida', 'exibir_membro')

    def exibir_membro(self, obj):
        return obj.membro.membro.nome
    exibir_membro.short_description = 'Atribuído'
    
admin.site.register(Tarefa, TarefaAdmin)

