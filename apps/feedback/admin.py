from django.contrib import admin

from .models import Feedback

class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('id', 'titulo', 'descricao', 'tipo', 'status','created_at', 'created_by')

admin.site.register(Feedback, FeedbackAdmin)