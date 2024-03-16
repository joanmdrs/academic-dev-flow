from django.contrib import admin
from .models import Documento

class DocumentoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'status', 'caminho', 'data_criacao')

admin.site.register(Documento, DocumentoAdmin)
