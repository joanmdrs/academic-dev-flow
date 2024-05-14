from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.http import require_GET
from github import Github, GithubException
from .github_auth import get_github_client
from github import InputGitAuthor
from datetime import datetime, timedelta

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
@require_GET
def filter_commits_by_period_and_assignee(request):
    try:
        github_token = request.GET.get('github_token')
        repository = request.GET.get('repository')
        username = request.GET.get('username')
        period = request.GET.get('period')
        today = datetime.now()

        if not repository or not period:
            return JsonResponse({'error': 'Os parâmetros de consulta repository e period são obrigatórios'}, status=status.HTTP_400_BAD_REQUEST)

        g = get_github_client(github_token)
        repo = g.get_repo(repository)
        user_commits = []

        if period == 'day':
            day = request.GET.get('day', today.day)
            start_date = today.replace(day=int(day), hour=0, minute=0, second=0, microsecond=0)
            end_date = start_date.replace(hour=23, minute=59, second=59, microsecond=999999)
            
        elif period == 'month':
            year = int(request.GET.get('year', today.year))
            month = int(request.GET.get('month', today.month))
            start_date = today.replace(year=year, month=month, day=1, hour=0, minute=0, second=0, microsecond=0)
            end_date = start_date.replace(day=calendar.monthrange(year, month)[1], hour=23, minute=59, second=59, microsecond=999999)
            
        elif period == 'year':
            year = int(request.GET.get('year', today.year))
            start_date = today.replace(year=year, month=1, day=1, hour=0, minute=0, second=0, microsecond=0)
            end_date = today.replace(year=year, month=12, day=31, hour=23, minute=59, second=59, microsecond=999999)
            
        elif period == 'interval':
            start_date = request.GET.get('start_date')
            end_date = request.GET.get('end_date')
            if not start_date or not end_date:
                return JsonResponse({'error': 'Para o período "interval", os parâmetros start_date e end_date são obrigatórios'}, status=status.HTTP_400_BAD_REQUEST)
            start_date = datetime.strptime(start_date, '%Y-%m-%d')
            end_date = datetime.strptime(end_date, '%Y-%m-%d')
            
        else:
            return JsonResponse({'error': 'O período deve ser "day", "month", "year" ou "interval"'}, status=status.HTTP_400_BAD_REQUEST)

        if username:
            user = g.get_user(username)
            for commit in repo.get_commits(author=user):
                commit_date = commit.commit.author.date.replace(tzinfo=None).replace(hour=0, minute=0, second=0, microsecond=0)

                if period == 'interval':
                    if start_date <= commit_date <= end_date:
                        user_commits.append({
                            'sha': commit.sha,
                            'message': commit.commit.message,
                            'assignee': commit.author.login,
                            'author': commit.commit.author.name,
                            'date': commit_date.isoformat()
                        })
                else:
                    if start_date <= commit_date <= end_date:
                        user_commits.append({
                            'sha': commit.sha,
                            'message': commit.commit.message,
                            'assignee': commit.author.login,
                            'author': commit.commit.author.name,
                            'date': commit_date.isoformat()
                        })
        else:
            for commit in repo.get_commits():
                commit_date = commit.commit.author.date.replace(tzinfo=None).replace(hour=0, minute=0, second=0, microsecond=0)

                if period == 'interval':
                    if start_date <= commit_date <= end_date:
                        user_commits.append({
                            'sha': commit.sha,
                            'message': commit.commit.message,
                            'assignee': commit.author.login,
                            'author': commit.commit.author.name,
                            'date': commit_date.isoformat()
                        })
                else:
                    if start_date <= commit_date <= end_date:
                        user_commits.append({
                            'sha': commit.sha,
                            'message': commit.commit.message,
                            'assignee': commit.author.login,
                            'author': commit.commit.author.name,
                            'date': commit_date.isoformat()
                        })

        return JsonResponse(user_commits, safe=False)

    except GithubException as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  

