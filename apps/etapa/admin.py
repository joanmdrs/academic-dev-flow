from django.contrib import admin

from .models import Etapa

class EtapaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'descricao')
    search_fields = ('nome', )

admin.site.register(Etapa, EtapaAdmin)