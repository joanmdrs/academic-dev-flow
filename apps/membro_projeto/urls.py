from django.urls import path
from .views import *

app_name = 'membro_projeto'

urlpatterns = [
    path('cadastrar/', CadastrarMembroProjetoView.as_view(), name='cadastrar_membro_projeto' ),
    path('buscar/usuario_github/', BuscarMembroProjetoPeloUsuarioGithubView.as_view(), name='buscar_pelo_usuario_github'),
    path('buscar/membro-e-projeto/', BuscarMembroProjetoPeloIdMembro.as_view(), name='buscar_pelo_id_membro'),
    path('buscar/projetos/<int:idUser>/', BuscarProjetosDoMembroView.as_view(), name='buscar_projetos_do_membro'),
    path('buscar/<int:idProjeto>/', BuscarMembrosPorProjetoView.as_view(), name='buscar_membro_projeto_pelo_id_projeto'),
    path('atualizar/<int:id>/', AtualizarMembroProjetoView.as_view(), name='atualizar_membro_projeto'),
    path('excluir/one/<int:id>/', ExcluirMembroProjetoOneView.as_view(), name='excluir_membro_projeto_individual'),
    path('excluir/many/<int:idProjeto>/', ExcluirMembroProjetoManyView.as_view(), name='excluir_membro_projeto_coletivo'),
    path('buscar/membros/quantidade/<int:id_projeto>/', QuantidadeMembrosPorProjetoView.as_view(), name='buscar_quantidade_membros_por_projeto'),
    path('listar/projeto/<int:id_projeto>/', ListarMembrosPorProjeto.as_view(), name='listar_membros_por_projeto'),
    path('funcoes/cadastrar/', CadastrarFuncaoMembroView.as_view(), name='cadastrar_funcoes_membro_projeto'),
    path('funcoes/listar/', ListarFuncoesMembroView.as_view(), name='lista_funcoes'),
    path('funcoes/cadastrar-funcao-atual/', CadastrarFuncaoAtualView.as_view(), name='cadastrar-funcao-atual')
]

