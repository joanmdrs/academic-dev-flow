# github_integration/urls.py

from django.urls import path
from . import views

app_name = "github_integration"

urlpatterns = [
    path('list_repositories/', views.list_user_repositories, name='list_repositories'),
    path('list_issues/', views.list_issues, name='list_issues'),
    path('create_issue/', views.create_issue, name='create_issue'),
    path('list_contents/', views.list_contents, name='list_contents'),
    path("create_content/", views.create_content, name="create_content"),
    path('update_content/', views.update_content, name='update_content'),
    path('delete_content/', views.delete_content, name='delete_content'),
    path('list_commits_by_user/', views.user_commits_view, name='list_commits')
]
