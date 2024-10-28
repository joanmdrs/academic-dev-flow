from django.contrib import admin
from .models import Release

class ReleaseAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'status', 'data_lancamento', 'exibir_projeto', 'exibir_responsavel', 'exibir_etapa')
    search_fields = ('nome', )
    
    def exibir_projeto(self, obj):
        if (obj.projeto.nome):
            return obj.projeto.nome
        return None
    exibir_projeto.short_description = 'Projeto'
    
    def exibir_responsavel(self, obj):
        if obj.responsavel:
            return obj.responsavel.membro.nome
        return None
    exibir_responsavel.short_description = 'Responsável'
    
    def exibir_etapa(self, obj):
        if obj.etapa:
            return obj.etapa.etapa.nome
        return None
    exibir_etapa.short_description = 'Etapa'

admin.site.register(Release, ReleaseAdmin)
