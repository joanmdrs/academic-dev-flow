# github_integration/urls.py

from django.urls import path
from . import views

app_name = "github_integration"

urlpatterns = [
    path('list_repositories/', views.list_user_repositories, name='list_repositories'),
    path('list_issues/', views.list_issues, name='list_issues'),
    path('create_issue/', views.create_issue, name='create_issue')
]
