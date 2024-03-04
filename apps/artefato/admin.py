from django.contrib import admin

from .models import Artefato

class ArtefatoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'descricao')
    search_fields = ('nome',)
    
admin.site.register(Artefato, ArtefatoAdmin)