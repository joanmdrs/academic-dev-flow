from django.urls import path
from .views import *

app_name = 'etapa'

urlpatterns = [
    path('cadastrar/', CadastrarEtapaView.as_view(), name='cadastrar_etapa' ),
    path('buscar/<int:etapa_id>/', BuscarEtapaPorIdFluxoView.as_view(), name='buscar_etapa_pelo_id'),
]