from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from github import Github, GithubException
from .github_auth import get_github_client
from github import InputGitAuthor

from django.http import HttpResponse
import json

def list_user_repositories(request):
    try:
        github_token = request.GET.get('github_token') 

        if github_token:
            github_client = get_github_client(github_token)
            user = github_client.get_user()  
            repositories = [repo.name for repo in user.get_repos()]  
            return JsonResponse({'repositories': repositories})
        
        return JsonResponse({'error': 'Token não fornecido'}, status=status.HTTP_400_BAD_REQUEST)
    except GithubException as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
def user_commits_view(request):
    try:
        repository = request.GET.get('repository')
        username = request.GET.get('username')

        if not repository or not username:
            return JsonResponse({'error': 'Os parâmetros de consulta repository e username são obrigatórios'}, status=400)

        g = get_github_client()

        repo = g.get_repo(repository)

        user = g.get_user(username)

        user_commits = []
        for commit in repo.get_commits(author=user):
            user_commits.append({
                'sha': commit.sha,
                'message': commit.commit.message,
                'author': commit.commit.author.name,
                'date': commit.commit.author.date.isoformat()
            })

        return JsonResponse(user_commits, safe=False)

    except GithubException as e:
        return JsonResponse({'error': str(e)}, status=500)
    
