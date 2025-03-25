from django.urls import path
from .views import *

app_name = 'feedback'

urlpatterns = [
    path('cadastrar/', CadastrarFeedbackView.as_view(), name='cadastrar_feedback' ),
    path('atualizar/', AtualizarFeedbackView.as_view(), name='atualizar_feedback'),
    path('buscar_pelo_id/', BuscarFeedbackPeloIDView.as_view(), name='buscar_pelo_id'),
    path('listar/', ListarFeedbacksView.as_view(), name='listar_feedbacks'),
    path('filtrar_por_created_by/', FiltrarPorCreatedByView.as_view(), name='filtar_por_created_by'),
    path('excluir/', ExcluirFeedbacksView.as_view(), name='excluir_feedbacks')
]

