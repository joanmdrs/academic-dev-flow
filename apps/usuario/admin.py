from django.contrib import admin

from .models import Usuario 

class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'get_groups')
    
    def get_groups(self, obj):
        return ", ".join([group.name for group in obj.groups.all()])
    
    get_groups.short_description = 'Grupos'


admin.site.register(Usuario, UsuarioAdmin)