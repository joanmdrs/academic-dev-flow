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
from django.views.generic import RedirectView

urlpatterns = [
    path('academicflow-api/admin/', admin.site.urls),
    path('academicflow-api/projeto/', include('apps.projeto.urls', namespace='projeto')),
    path('academicflow-api/fluxo/', include('apps.fluxo.urls', namespace='fluxo')),
    path('academicflow-api/etapa/', include('apps.etapa.urls', namespace='etapa')),
    path('academicflow-api/fluxo_etapa/', include('apps.fluxo_etapa.urls', namespace='fluxo_etapa')),
    path('academicflow-api/membro/', include('apps.membro.urls', namespace='membro')),
    path('academicflow-api/membro-projeto/', include('apps.membro_projeto.urls', namespace='membro-projeto')),
    path('academicflow-api/funcao-membro/', include('apps.funcao_membro.urls', namespace='funcao-membro')),
    path('academicflow-api/usuario/', include('apps.usuario.urls', namespace='usuario')),
    path('academicflow-api/artefato/', include('apps.artefato.urls', namespace='artefato')),
    path('academicflow-api/iteracao/', include('apps.iteracao.urls', namespace='iteracao')),
    path('academicflow-api/release/', include('apps.release.urls', namespace='release')),
    path('academicflow-api/tarefa/', include('apps.tarefa.urls', namespace='tarefa')),
    path('academicflow-api/categoria/', include('apps.categoria.urls', namespace='categoria')),
    path('academicflow-api/tags/', include('apps.tags.urls', namespace='tags')),
    path('academicflow-api/comentario/', include('apps.comentario.urls', namespace='comentario')),
    path('academicflow-api/pontuacao/', include('apps.pontuacao.urls', namespace='pontuacao')),
    path('academicflow-api/auth/', include('apps.api.urls', namespace='api')),
    path('academicflow-api/github_integration/', include('apps.github_integration.urls', namespace='github_integration')),
    path('academicflow-api/', RedirectView.as_view(url='/academicflow-api/admin/')),
]



