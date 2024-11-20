from django.contrib import admin
from .models import Tag

class TagAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'descricao', 'cor')
    
admin.site.register(Tag, TagAdmin)



