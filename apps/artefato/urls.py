from django.urls import path
from .views import *

app_name = 'artefato'

urlpatterns = [
    path('cadastrar/', CadastrarArtefatoView.as_view(), name='cadastrar_artefato'),
    path('atualizar/', AtualizarArtefatoView.as_view(), name='atualizar_artefato'),
    path('atualizar-iteracao/', AtualizarIteracaoArtefatosView.as_view(), name='atualizar_iteracao'),
    path('buscar-por-nome/', BuscarArtefatoPorNomeView.as_view(), name='buscar_artefato_por_nome'),
    path('buscar-por-id/', BuscarArtefatoPeloIdView.as_view(), name='buscar_artefato_por_id'),
    path('buscar-por-nome-e-por-projeto/', BuscarArtefatosPeloNomeEPeloProjeto.as_view(), name='buscar_artefato_por_nome_e_por_projeto'),
    path('listar/', ListarArtefatosView.as_view(), name="listar_artefatos"),
    path('listar-por-projeto/', ListarArtefatosPorProjeto.as_view(), name='listar_artefatos_por_projeto'),
    path('listar-por-iteracao/', ListarArtefatosPorIteracao.as_view(), name='listar_artefatos_por_iteracao'),
    path('listar-artefatos-dos-projetos-do-membro/', ListarArtefatosDosProjetosDoMembroView.as_view(), name='listar_artefatos_dos_projetos_do_membro'),
    path('filtrar-por-projeto-e-por-membro/', FiltrarArtefatosPorMembroEPorProjetoView.as_view(), name='filtrar_artefatos_por_projeto_e_por_membro'),
    path('excluir/', ExcluirArtefatoView.as_view(), name='excluir_artefato'),
    
    path('verificar-existencia/', VerificarExistenciaArtefatoView.as_view(), name='verificar-se-artefato-já-existe'),
    path('sicronizar-contents/', SicronizarContentsView.as_view(), name="sicronizar-contents"),
]