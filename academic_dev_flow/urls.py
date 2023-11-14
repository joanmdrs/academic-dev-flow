"""
URL configuration for academic_dev_flow project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from apps.projeto.views import *
from apps.flow.views import *
from apps.etapa.views import *


urlpatterns = [
    path('admin/', admin.site.urls),
    path('projetos/cadastrar/', CadastrarProjetoView.as_view(), name='cadastrar_projeto'),
    path('projetos/buscar/', BuscarProjetosPorNomeView.as_view(), name='buscar_projetos_por_nome'),
    path('projetos/<int:id>/excluir/', ExcluirProjetoView.as_view(), name='excluir_projeto'),
    path('projetos/<int:id>/atualizar/', AtualizarProjetoView.as_view(), name='atualizar_projeto'),
    path('fluxos/cadastrar/', CadastrarFluxoView.as_view(), name='cadastrar_fluxo' ),
    path('fluxos/buscar/', BuscarFluxoView.as_view(), name='buscar_fluxo'),
    path('fluxos/buscar/<int:flow_id>/', BuscarFluxoPeloIdView.as_view(), name='buscar_fluxo_pelo_id'),
    path('etapas/cadastrar/', CadastrarEtapaView.as_view(), name='cadastrar_etapa'),
]



