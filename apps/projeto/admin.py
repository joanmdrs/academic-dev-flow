from django.contrib import admin
from .models import Projeto

class ProjetoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'status', 'data_inicio', 'data_termino', 'exibir_nome_do_fluxo')
    list_filter = ('status',)
    search_fields = ('nome',)

    def exibir_nome_do_fluxo(self, obj):
        return obj.fluxo.nome if obj.fluxo else '-'  # Verifica se há um fluxo associado
    exibir_nome_do_fluxo.short_description = 'Nome do Fluxo'

admin.site.register(Projeto, ProjetoAdmin)

