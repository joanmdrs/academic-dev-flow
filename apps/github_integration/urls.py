# github_integration/urls.py

from django.urls import path
from . import views

app_name = "github_integration"

urlpatterns = [
    path('list_repositories/', views.list_user_repositories, name='list_repositories'),
]
