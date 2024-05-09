from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from github import Github, GithubException
from .github_auth import get_github_client
from github import InputGitAuthor
from apps.tarefa.models import Tarefa 
from apps.tarefa.models import Label
from apps.membro.models import Membro
from apps.membro_projeto.models import MembroProjeto
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
        assignees = data.get('assignees')
        
        if not github_token or not repository or not title:
            return JsonResponse({'error': 'Ausência de parâmetros'}, status=status.HTTP_400_BAD_REQUEST)
        
        g = get_github_client(github_token)
        repo = g.get_repo(repository)
        
        create_result = repo.create_issue(title=title, body=body, labels=labels, assignees=assignees)
        
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
        assignees = data.get('assignees')
        
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
        
        if assignees:
            issue.edit(assignees=assignees)
        
        return JsonResponse({'success': 'Issue atualizada com sucesso!'}, status=status.HTTP_200_OK)        
        
    except GithubException as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def filter_membro_projeto_by_assignee_and_by_projeto(assignee, projeto):
    try:
        membro = Membro.objects.get(github__usuario_github=assignee)
        membro_projeto = MembroProjeto.objects.get(membro=membro.id, projeto=projeto)
        return membro_projeto.id
    except Membro.DoesNotExist:
        return None

def get_label_ids(labels):
    label_ids = []
    for label_name in labels:
        try:
            # Verificar se o label existe no banco de dados
            label = Label.objects.get(nome=label_name)
            label_ids.append(label.id)
        except Label.DoesNotExist:
            pass
    return label_ids

def list_issues(request):
    try:
        github_token = request.GET.get('github_token')
        repository = request.GET.get('repository')
        state = request.GET.get('state')
        projeto = request.GET.get('projeto')
        
        if not github_token or not repository:
            return JsonResponse({'error': 'Ausência de parâmetros'}, status=status.HTTP_400_BAD_REQUEST)
        
        g = get_github_client(github_token)
        repo = g.get_repo(repository)
        
        issues_list = []
        
        if not state:
            issues = repo.get_issues(state='all')
        elif state:
            issues = repo.get_issues(state=state)
        
        for issue in issues:
            issue_data = {
                'id': issue.id,
                'number': issue.number,
                'title': issue.title,
                'body': issue.body,
                'url': issue.html_url,
                'state': issue.state,
                'labels': [label.name for label in issue.labels],
                'assignees': [assignee.login for assignee in issue.assignees] if issue.assignees else []
            }
            
            tarefa_vinculada = Tarefa.objects.filter(id_issue=issue.id).exists()
            issue_data['exists'] = tarefa_vinculada
            
            membros_ids = []
            for assignee in issue_data['assignees']:
                membro = filter_membro_projeto_by_assignee_and_by_projeto(assignee, projeto)
                if membro:
                    membros_ids.append(membro)
            issue_data['membros_ids'] = membros_ids
            
            # Obter os IDs dos labels existentes no banco de dados
            issue_data['label_ids'] = get_label_ids(issue_data['labels'])
            
            issues_list.append(issue_data)
        
        return JsonResponse(issues_list, safe=False, status=status.HTTP_200_OK)
    
    except GithubException as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
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

