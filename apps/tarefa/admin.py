from django.contrib import admin
from .models import Tarefa, Label

class TarefaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'data_criacao', 'concluida')

    # def exibir_membro(self, obj):
    #     return obj.membro.membro.nome
    # exibir_membro.short_description = 'Atribuído'
    
    # def exibir_projeto(self, obj):
    #     return obj.projeto.nome
    # exibir_projeto.short_description = 'Projeto'
    
class LabelAdmin(admin.ModelAdmin):
    list_display = ('id', 'id_github', 'nome', 'cor')
        
    
admin.site.register(Tarefa, TarefaAdmin)
admin.site.register(Label, LabelAdmin)

