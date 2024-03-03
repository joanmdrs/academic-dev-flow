from django.contrib import admin

from .models import Membro

class MembroAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'cpf', 'data_nascimento', 'sexo', 'telefone', 'email')
    search_fields = ('nome',)
    
admin.site.register(Membro, MembroAdmin)