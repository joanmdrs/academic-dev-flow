from django.contrib import admin
from .models import Comentario

class ComentarioAdmin(admin.ModelAdmin):
    list_display = ('texto', 'data_hora', 'exibir_autor' )
    
    def exibir_autor(self, obj):
        if obj.autor:
            return obj.autor.membro.nome
        return None
    exibir_autor.short_description = 'Autor'
    

admin.site.register(Comentario, ComentarioAdmin)
