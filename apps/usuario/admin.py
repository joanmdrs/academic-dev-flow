from django.contrib import admin

from .models import Usuario 

class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('id', 'username')


admin.site.register(Usuario, UsuarioAdmin)