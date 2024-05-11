# github_integration/urls.py

from django.urls import path
from . import views_contents, views_issues, views_commits

app_name = "github_integration"

urlpatterns = [
    # CRUD de issues
    path('issues/create_issue/', views_issues.create_issue, name='create_issue'),
    path('issues/update_issue/<int:issue_number>/', views_issues.update_issue, name='update_issue'),
    path('issues/list_issues/', views_issues.list_issues, name='list_issues'),
    path('issues/get_labels/', views_issues.get_repository_labels, name='list_labels'),
    # CRUD de contents 
    path("create_content/", views_contents.create_content, name="create_content"),
    path('get_content/', views_contents.get_content, name='get_content'),
    path('update_content/', views_contents.update_content, name='update_content'),
    path('delete_content/', views_contents.delete_content, name='delete_content'),
    path('contents/list_contents/', views_contents.list_contents, name='list_contents'),
    # commits 
    path('commits/list_commits_by_repository/', views_commits.list_commits_by_repository, name='list_commits_by_repository')

]
