from django.contrib import admin

from .models import Fluxo

class FluxoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'descricao')
    search_fields = ('nome', )

admin.site.register(Fluxo, FluxoAdmin)