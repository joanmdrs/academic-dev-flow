from django.urls import path
from .views import *

app_name = 'artefato'

urlpatterns = [
    path('cadastrar/', CadastrarArtefatoView.as_view(), name='cadastrar_artefato'),
    path('buscar/', BuscarArtefatoView.as_view(), name='buscar_artefato'),
    path('atualizar/<int:id>/', AtualizarArtefatoView.as_view(), name='atualizar_artefato'),
    path('excluir/<int:id>/', ExcluirArtefatoView.as_view(), name='excluir_artefato')

    
]