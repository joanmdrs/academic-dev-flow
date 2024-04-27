from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from github import Github, GithubException
from .github_auth import get_github_client
from github import InputGitAuthor
import base64
import json

def create_issue(request):
    
    try:
        data = json.loads(request.body)
        
        github_token = data.get('github_token')
        repository = data.get('repository')
        title = data.get('title')
        body = data.get('body')
        labels = data.get('labels') 
        assignee = data.get('assignee')
        
        if not github_token or not repository or not title:
            return JsonResponse({'error': 'Ausência de parâmetros'}, status=status.HTTP_400_BAD_REQUEST)
        
        g = get_github_client(github_token)
        repo = g.get_repo(repository)
        
        create_result = repo.create_issue(title=title, body=body, labels=labels, assignee=assignee)
        
        response_data = {
            'success': 'Issue criada com sucesso!',
            'issue_id': create_result.id,
            'issue_number': create_result.number,
            'issue_url': create_result.html_url,
            'title': create_result.title,
            'body': create_result.body,
            'assignee': create_result.assignee.login if create_result.assignee else None
        }
        
        return JsonResponse(response_data, status=status.HTTP_201_CREATED)        
        
    except GithubException as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
def update_issue(request, issue_number):
    try:
        data = json.loads(request.body)
        
        github_token = data.get('github_token')
        repository = data.get('repository')
        title = data.get('title')
        body = data.get('body')
        labels = data.get('labels')
        assignee = data.get('assignee')
        
        if not github_token or not repository or not issue_number:
            return JsonResponse({'error': 'Ausência de parâmetros'}, status=status.HTTP_400_BAD_REQUEST)
        
        g = get_github_client(github_token)
        repo = g.get_repo(repository)
        
        issue = repo.get_issue(number=issue_number)
        
        if title:
            issue.edit(title=title)
        
        if body:
            issue.edit(body=body)
        
        if labels:
            issue.edit(labels=labels)
        
        if assignee:
            issue.edit(assignee=assignee)
        
        return JsonResponse({'success': 'Issue atualizada com sucesso!'}, status=status.HTTP_200_OK)        
        
    except GithubException as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def list_issues(request):
    try:
        github_token = request.GET.get('github_token')
        repository = request.GET.get('repository')
        
        if not github_token or not repository:
            return JsonResponse({'error': 'Ausência de parâmetros'}, status=status.HTTP_400_BAD_REQUEST)
        
        g = get_github_client(github_token)
        repo = g.get_repo(repository)
        
        issues_list = []
        issues = repo.get_issues()
        
        for issue in issues:
            issue_data = {
                'id': issue.id,
                'number': issue.number,
                'title': issue.title,
                'body': issue.body,
                'state': issue.state,
                'labels': [label.name for label in issue.labels],
                'assignee': issue.assignee.login if issue.assignee else None
            }
            issues_list.append(issue_data)
        
        return JsonResponse(issues_list, safe=False, status=status.HTTP_200_OK)
    
    
    except GithubException as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    
    
    
def get_repository_labels(request):
    try:
        
        github_token = request.GET.get('github_token')
        repository = request.GET.get('repository')
        
        if not github_token or not repository:
            return JsonResponse({'error': 'Ausência de parâmetros'}, status=status.HTTP_400_BAD_REQUEST)
        
        g = get_github_client(github_token)
        repo = g.get_repo(repository)
        
        labels = repo.get_labels()
        for label in labels:
            print(label)
        
        labels_list = [{'name': label.name} for label in labels]
        
        return JsonResponse(labels_list, safe=False, status=status.HTTP_200_OK)
        
    except GithubException as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    

