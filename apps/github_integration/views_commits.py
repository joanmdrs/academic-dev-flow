from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from github import Github, GithubException
from .github_auth import get_github_client
from github import InputGitAuthor
import json
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

@permission_classes([IsAuthenticated])
def list_commits_by_repository(request):
    try:
        github_token = request.GET.get('github_token')
        repository = request.GET.get('repository')
        
        if not github_token or not repository:
            return JsonResponse({'error': 'Ausência de parâmetros'}, status=status.HTTP_400_BAD_REQUEST)
        
        g = get_github_client(github_token)
        repo = g.get_repo(repository)
        
        commits = list(repo.get_commits())
        
        # Retorna a quantidade total de commits
        total_commits = len(commits)
        
        return JsonResponse({'total_commits': total_commits}, status=status.HTTP_200_OK)
    
    except GithubException as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@permission_classes([IsAuthenticated])
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
    
