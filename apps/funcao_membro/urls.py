from django.urls import path
from .views import *

app_name = 'funcao-membro'

urlpatterns = [
    path('categoria/cadastrar/', CadastrarCategoriaFuncaoMembroView.as_view(), name='cadastrar_categoria_funcao_membro'),
    path('categoria/atualizar/', AtualizarCategoriaFuncaoMembroView.as_view(), name='atualizar_categoria_funcao_membro'),
    
    
]

