from django.db import models
from django.utils import timezone
from apps.fluxo.models import Fluxo
from apps.etapa.models import Etapa
from django.conf import settings

class FluxoEtapa(models.Model):
    fluxo = models.ForeignKey(Fluxo, on_delete=models.CASCADE)
    etapa = models.ForeignKey(Etapa, on_delete=models.CASCADE)
    ordem_no_fluxo = models.PositiveIntegerField(null=True, blank=True)
    data_adicao = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True,
        related_name='fluxoetapas_criadas'
    )
    
    def __str__(self):
        return f"{self.etapa}"