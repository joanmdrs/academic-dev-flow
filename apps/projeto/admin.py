from django.contrib import admin
from .models import Projeto

class ProjetoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'status', 'data_inicio', 'data_fim')
    list_filter = ('status',)
    search_fields = ('nome',)

admin.site.register(Projeto, ProjetoAdmin)
