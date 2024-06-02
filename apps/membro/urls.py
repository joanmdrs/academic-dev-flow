from django.urls import path
from .views import *

app_name = 'membro'

urlpatterns = [
    path('cadastrar/', CadastrarMembroView.as_view(), name='cadastrar_membro'),
    path('buscar/nome/', BuscarMembrosPorNomeView.as_view(), name='buscar_membro_pelo_nome'),
    path('buscar/grupo/', BuscarMembroPorGrupoView.as_view(), name='buscar_membro_por_nome_e_grupo'),
    path('buscar/<int:id>/', BuscarMembroPorIdView.as_view(), name='buscar_membro_pelo_id'),
    path('buscar/usuario/<int:id_user>/', BuscarMembroPeloUserView.as_view(), name='buscar_membro_pelo_user'),
    path('excluir/<int:id>/', ExcluirMembroView.as_view(), name='excluir_membro'),
    path('atualizar/<int:id>/', AtualizarMembroView.as_view(), name='atualizar_membro'),
    path('listar/', BuscarMembrosPorListaIdsView.as_view(), name='listar_membros_por_lista_ids'),
    path('buscar-usuario-github/<int:id_membro_projeto>/', BuscarUsuarioPeloIdMembroProjeto.as_view(), name='buscar_usuario_github_pelo_id_membro_projeto')
]