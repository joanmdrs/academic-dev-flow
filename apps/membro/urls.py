from django.urls import path
from .views import *

urlpatterns = [
    path('membros/cadastrar/', CadastrarMembroView.as_view(), name='cadastrar_membro'),
    path('membros/buscar/', BuscarMembrosPorNomeView.as_view(), name='buscar_membro'),
    path('membros/<int:id>/excluir/', ExcluirMembroView.as_view(), name='excluir_membro'),
    path('membros/<int:id>/atualizar/', AtualizarMembroView.as_view(), name='atualizar_membro'),
    
]