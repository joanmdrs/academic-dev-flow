from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from github import Github, GithubException
from .github_auth import get_github_client
from django.http import HttpResponse


def list_user_repositories(request):
    github_client = get_github_client()  # Obtenha o cliente PyGithub
    user = github_client.get_user()  # Obtenha o usuário autenticado
    repositories = [repo.name for repo in user.get_repos()]  # Obtenha os nomes dos repositórios

    return JsonResponse({'repositories': repositories})  # Retorne os nomes dos repositórios em formato JSON

def create_issue(request):
    try:
        g = get_github_client()
        repo = g.get_repo("joanmdrs/sigcli")
        repo.create_issue(title="This is a new issue", body="This is the issue body", assignee="joanmdrs")

        return HttpResponse('Issue created successfully', status=201)

    except GithubException as e:
        return HttpResponse(str(e), status=500)
        
    
def list_issues(request):
    try:
        g = get_github_client()
        repo = g.get_repo("joanmdrs/sigcli")
        open_issues = repo.get_issues(state='open')
        
        issues_list = []
        for issue in open_issues:
            issues_list.append({
                'title': issue.title,
                'body': issue.body,
                'created_at': issue.created_at.isoformat(),
                # Adicione outros campos conforme necessário
            })
        
        return JsonResponse(issues_list, safe=False, status=status.HTTP_200_OK)
    
    
    except GithubException as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)