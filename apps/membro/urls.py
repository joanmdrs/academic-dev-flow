from django.urls import path
from .views import *

app_name = 'membro'

urlpatterns = [
    path('cadastrar/', CadastrarMembroView.as_view(), name='cadastrar_membro'),
    path('buscar/', BuscarMembrosPorNomeView.as_view(), name='buscar_membro'),
    path('excluir/<int:id>/', ExcluirMembroView.as_view(), name='excluir_membro'),
    path('atualizar/<int:id>/', AtualizarMembroView.as_view(), name='atualizar_membro'),
    
]