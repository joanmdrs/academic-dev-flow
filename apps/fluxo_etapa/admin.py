from django.contrib import admin

from .models import FluxoEtapa 

class FluxoEtapaAdmin(admin.ModelAdmin):
    list_display = ('id', 'exibir_fluxo', 'exibir_etapa')
    
    def exibir_fluxo(self, obj):
        return obj.fluxo.nome
    exibir_fluxo.short_description = 'Nome do Fluxo'
    
    def exibir_etapa(self, obj): 
        return obj.etapa.nome
    exibir_etapa.short_description = 'Nome da Etapa'

admin.site.register(FluxoEtapa, FluxoEtapaAdmin)