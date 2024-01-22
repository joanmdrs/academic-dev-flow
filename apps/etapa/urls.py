from django.urls import path
from .views import *

app_name = 'etapa'

urlpatterns = [
    path('cadastrar/', CadastrarEtapaView.as_view(), name='cadastrar_etapa' ),
    path('buscar/', BuscarEtapaPorIdFluxoView.as_view(), name='buscar_etapa_pelo_id'),
    path('atualizar/<int:id>/', AtualizarEtapaView.as_view(), name='atualizar_etapa'),
]