from django.contrib import admin
from .models import Tarefa, Label, IntervaloTempo

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
    
class IntervaloTempoAdmin(admin.ModelAdmin):
    list_display = ('id', 'exibir_tarefa', 'exibir_membro', 'data_hora')
    
    def exibir_tarefa(self, obj):
        return obj.tarefa.nome
    exibir_tarefa.short_description = 'Tarefa'
    
    def exibir_membro(self, obj):
        return obj.membro_projeto.membro.nome
    exibir_membro.short_description = 'Membro'
        
    
admin.site.register(Tarefa, TarefaAdmin)
admin.site.register(Label, LabelAdmin)
admin.site.register(IntervaloTempo, IntervaloTempoAdmin)

