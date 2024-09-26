from django.urls import path
from .views import *

app_name = 'funcao-membro'

urlpatterns = [
    path('categoria/cadastrar/', CadastrarCategoriaFuncaoMembroView.as_view(), name='cadastrar_categoria_funcao_membro'),
    path('categoria/atualizar/', AtualizarCategoriaFuncaoMembroView.as_view(), name='atualizar_categoria_funcao_membro'),
    path('categoria/buscar-pelo-nome/', BuscarCategoriaFuncaoMembroPeloNomeView.as_view(), name='buscar_categoria_pelo_nome'),
    path('categoria/buscar-pelo-id/', BuscarCategoriaFuncaoMembroPeloIdView.as_view(), name='buscar_categoria_pelo_id')
    
    
]

