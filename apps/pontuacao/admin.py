from django.contrib import admin
from .models import Pontuacao

class PontuacaoAdmin(admin.ModelAdmin):
    list_display = ('nota', 'data_atribuicao', 'comentario')

admin.site.register(Pontuacao, PontuacaoAdmin)
