from django.contrib import admin

from .models import Membro
from .models import UsuarioGithub 

class MembroAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'data_nascimento', 'telefone', 'email')
    search_fields = ('nome',)
    
class UsuarioGithubAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'email_github', 'usuario_github')
    search_fields = ('usuario_github',)
    
admin.site.register(Membro, MembroAdmin)
admin.site.register(UsuarioGithub, UsuarioGithubAdmin)
