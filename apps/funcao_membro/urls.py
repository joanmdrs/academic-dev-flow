from django.urls import path
from .views import *

app_name = 'funcao-membro'

urlpatterns = [
    path('categoria/cadastrar/', CadastrarCategoriaFuncaoMembroView.as_view(), name='cadastrar_categoria_funcao_membro'),
    
]

