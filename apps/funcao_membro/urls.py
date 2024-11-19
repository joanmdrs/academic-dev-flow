from django.urls import path
from .views import *

app_name = 'funcao-membro'

urlpatterns = [
    
    path('cadastrar/', CadastrarFuncaoMembroProjetoView.as_view(), name='cadastrar_funcao_membro'),
    path('atualizar/', AtualizarFuncaoMembroProjetoView.as_view(), name='atualizar_funcao_membro'),
    path('listar/', ListarFuncaoMembroView.as_view(), name='listar_funcao_membro'),
    path('listar-funcoes-do-membro/', ListarFuncaoMembroProjetoPeloIDView.as_view(), name='listar_funcoes_do_membro'),
    path('listar-funcoes-dos-membros-do-projeto/', ListarFuncaoMembroProjetoPorProjetoView.as_view(), name='listar_funcoes_dos_membros_do_projeto'),
    path('filtrar/', FiltrarFuncaoMembroProjetoView.as_view(), name='filtrar_funcoes_membro'),
    path('excluir/', ExcluirFuncaoMembroProjetoView.as_view(), name='excluir_funcao_membro'),
    path('buscar-funcao-atual-do-membro/', BuscarFuncaoMembroProjetoAtualView.as_view(), name='buscar_funcao_atual_do_membro'),
        
    path('categoria/cadastrar/', CadastrarCategoriaFuncaoMembroView.as_view(), name='cadastrar_categoria_funcao_membro'),
    path('categoria/atualizar/', AtualizarCategoriaFuncaoMembroView.as_view(), name='atualizar_categoria_funcao_membro'),
    path('categoria/buscar-pelo-nome/', BuscarCategoriaFuncaoMembroPeloNomeView.as_view(), name='buscar_categoria_pelo_nome'),
    path('categoria/buscar-pelo-id/', BuscarCategoriaFuncaoMembroPeloIdView.as_view(), name='buscar_categoria_pelo_id'),
    path('categoria/listar/', ListarCategoriaFuncaoMembroView.as_view(), name='listar_categoria_funcao_membro'),
    path('categoria/excluir/', ExcluirCategoriaFuncaoMembroView.as_view(), name='excluir_categoria_funcao_membro')
    
]

