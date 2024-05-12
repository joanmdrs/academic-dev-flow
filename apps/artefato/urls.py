from django.urls import path
from .views import *

app_name = 'artefato'

urlpatterns = [
    path('cadastrar/', CadastrarArtefatoView.as_view(), name='cadastrar_artefato'),
    path('buscar/', BuscarArtefatoPorNomeView.as_view(), name='buscar_artefato_pelo_nome'),
    path('buscar/<int:id>/', BuscarArtefatoPeloIdView.as_view(), name='buscar_artefato_pelo_id'),
    path('atualizar/<int:id>/', AtualizarArtefatoView.as_view(), name='atualizar_artefato'),
    path('excluir/<int:id>/', ExcluirArtefatoView.as_view(), name='excluir_artefato'),
    path('listar/', ListarArtefatosView.as_view(), name="listar_artefatos"),
    path('listar/projeto/<int:id_projeto>/', ListarArtefatosPorProjeto.as_view(), name='listar_artefatos_por_projeto'),
    path('listar/iteracao/<int:id_iteracao>/', ListarArtefatosPorIteracao.as_view(), name='listar_artefatos_por_iteracao'),
    path('filtrar/nome-projeto/', FiltrarArtefatoPeloNomeEProjeto.as_view(), name='filtrar_artefato_pelo_nome_e_pelo_projeto'),
    path('verificar-existencia/', VerificarExistenciaArtefatoView.as_view(), name='verificar-se-artefato-já-existe'),
    path('sicronizar-contents/', SicronizarContentsView.as_view(), name="sicronizar-contents")
]