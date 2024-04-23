# github_integration/urls.py

from django.urls import path
from . import views, views_contents, views_issues

app_name = "github_integration"

urlpatterns = [
    path('list_repositories/', views.list_user_repositories, name='list_repositories'),
    # CRUD de issues
    path('create_issue/', views_issues.create_issue, name='create_issue'),
    path('update_issue/', views_issues.update_issue, name='update_issue'),
    path('list_issues/', views_issues.list_issues, name='list_issues'),
    # CRUD de contents 
    path("create_content/", views_contents.create_content, name="create_content"),
    path('get_content/', views_contents.get_content, name='get_content'),
    path('update_content/', views_contents.update_content, name='update_content'),
    path('delete_content/', views_contents.delete_content, name='delete_content'),
    path('list_contents/', views_contents.list_contents, name='list_contents'),
    path('list_commits_by_user/', views.user_commits_view, name='list_commits'),

]
