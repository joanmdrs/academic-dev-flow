from django.contrib import admin
from .models import Documento

class DocumentoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'data_criacao')

admin.site.register(Documento, DocumentoAdmin)
