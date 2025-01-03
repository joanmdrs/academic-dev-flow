from django.urls import path
from .views import *

app_name = 'membro'

urlpatterns = [
    path('cadastrar/', CadastrarMembroView.as_view(), name='cadastrar_membro'),
    path('atualizar/', AtualizarMembroView.as_view(), name='atualizar_membro'),
    path('buscar-por-nome/', BuscarMembrosPorNomeView.as_view(), name='buscar_membro_por_nome'),
    path('buscar-por-id/', BuscarMembroPorIdView.as_view(), name='buscar_membro_por_id'),
    path('buscar-por-id-usuario/', BuscarMembroPorIdUsuarioView.as_view(), name='buscar_membro_por_usuario'),
    path('listar/', ListarMembrosView.as_view(), name='listar_membros'),
    path('listar-grupos/', ListarGruposView.as_view(), name='listar_grupos_de_usuario'),
    path('excluir/', ExcluirMembroView.as_view(), name='excluir_membro'),
    # path('buscar-usuario-github/<int:id_membro_projeto>/', BuscarUsuarioPorIdMembroProjeto.as_view(), name='buscar_usuario_github_pelo_id_membro_projeto'),

]