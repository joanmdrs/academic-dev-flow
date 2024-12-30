from django.contrib import admin

from .models import Membro

class MembroAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'data_nascimento', 'telefone', 'email', 'exibir_grupo')
    search_fields = ('nome',)
    
    def exibir_grupo(self, obj): 
        return obj.grupo.name
    exibir_grupo.short_description = 'Grupo'
    
admin.site.register(Membro, MembroAdmin)
