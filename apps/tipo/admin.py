from django.contrib import admin
from .models import Tipo 

class TipoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'descricao', 'cor')

admin.site.register(Tipo, TipoAdmin)
