from django.contrib import admin
from .models import ComentarioTarefa, ComentarioArtefato

@admin.register(ComentarioTarefa)
class ComentarioTarefaAdmin(admin.ModelAdmin):
    list_display = ('id', 'mensagem', 'data_hora', 'autor', 'tarefa')
    search_fields = ('mensagem', 'autor__membro__nome', 'tarefa__nome')
    list_filter = ('data_hora', 'autor', 'tarefa')

@admin.register(ComentarioArtefato)
class ComentarioArtefatoAdmin(admin.ModelAdmin):
    list_display = ('id', 'mensagem', 'data_hora', 'autor', 'artefato')
    search_fields = ('mensaem', 'autor__membro__nome', 'artefato__nome')
    list_filter = ('data_hora', 'autor', 'artefato')
