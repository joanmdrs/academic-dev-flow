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
def user_commits_view_by_user(request):
    try:
        repository = request.GET.get('repository')
        username = request.GET.get('username')
        period = request.GET.get('period')  # Pode ser 'day', 'week' ou 'month'

        if not repository or not username or not period:
            return JsonResponse({'error': 'Os parâmetros de consulta repository, username e period são obrigatórios'}, status=status.HTTP_400_BAD_REQUEST)

        g = get_github_client()

        repo = g.get_repo(repository)

        user = g.get_user(username)

        user_commits = []
        today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)

        if period == 'day':
            start_date = today
        elif period == 'week':
            start_date = today - timedelta(days=today.weekday())
        elif period == 'month':
            start_date = today.replace(day=1)
        else:
            return JsonResponse({'error': 'O período deve ser "day", "week" ou "month"'}, status=status.HTTP_400_BAD_REQUEST)

        for commit in repo.get_commits(author=user):
            commit_date = commit.commit.author.date.replace(hour=0, minute=0, second=0, microsecond=0)
            if start_date <= commit_date:
                user_commits.append({
                    'sha': commit.sha,
                    'message': commit.commit.message,
                    'author': commit.commit.author.name,
                    'date': commit_date.isoformat()
                })

        return JsonResponse(user_commits, safe=False)

    except GithubException as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
