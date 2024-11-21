from django.contrib import admin
from .models import Categoria 

class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'descricao', 'cor')

admin.site.register(Categoria, CategoriaAdmin)
