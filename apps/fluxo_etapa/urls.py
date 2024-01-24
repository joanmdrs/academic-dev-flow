from django.urls import path
from .views import *

app_name = 'fluxo_etapa'

urlpatterns = [
    path('cadastrar/', CadastrarFluxoEtapaView.as_view(), name='cadastrar_vinculo_fluxo_etapa' ),
    path('excluir/<int:id>/', ExcluirFluxoEtapaView.as_view(), name='excluir_vinculo_fluxo_etapa')
    
]

