from django.contrib import admin

from .models import FluxoEtapa 
from .models import TransicaoFluxo

class FluxoEtapaAdmin(admin.ModelAdmin):
    list_display = ('id', 'exibir_fluxo', 'exibir_etapa')
    
    def exibir_fluxo(self, obj):
        return obj.fluxo.nome
    exibir_fluxo.short_description = 'Nome do Fluxo'
    
    def exibir_etapa(self, obj): 
        return obj.etapa.nome
    exibir_etapa.short_description = 'Nome da Etapa'

admin.site.register(FluxoEtapa, FluxoEtapaAdmin)

class TransicaoFluxoAdmin(admin.ModelAdmin):
    list_display = ('id', 'exibir_fluxo', 'exibir_origem', 'exibir_destino', 'label')
    
    def exibir_fluxo(self, obj):
        return obj.fluxo.nome
    exibir_fluxo.short_description = 'Nome do Fluxo'
    
    def exibir_origem(self, obj):
        return obj.origem.etapa.nome
    exibir_origem.short_description = 'Etapa de Origem'
    
    def exibir_destino(self, obj):
        return obj.destino.etapa.nome
    exibir_destino.short_description = 'Etapa de Destino'

admin.site.register(TransicaoFluxo, TransicaoFluxoAdmin)