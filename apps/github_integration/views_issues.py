from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from github import Github, GithubException
from .github_auth import get_github_client
from github import InputGitAuthor
from apps.tarefa.models import Tarefa 
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
        body = data.get('body', None)
        assignees = data.get('assignees', None)

        if not github_token or not repository or not title:
            return JsonResponse({'error': 'Ausência de parâmetros'}, status=status.HTTP_400_BAD_REQUEST)

        g = get_github_client(github_token)
        repo = g.get_repo(repository)

        if assignees == [None] and body == None:
            create_result = repo.create_issue(title=title)
        elif assignees == [None] and body != None:
            create_result = repo.create_issue(title=title, body=body) 
        else:
            create_result = repo.create_issue(title=title, body=body, assignees=assignees) 

        # Preparar a resposta com os dados da issue criada
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
        # Manipulação de erros de validação do GitHub
        error_message = str(e.data.get('message', str(e)))
        errors = e.data.get('errors', [])

        if 'Validation Failed' in error_message:
            error_details = []
            for error in errors:
                if error['resource'] == 'Issue' and error['field'] == 'assignees' and error['code'] == 'invalid':
                    error_details.append(f"Assignee inválido: {error['value']}")

            return JsonResponse({'error': 'Erro de validação', 'details': error_details}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        return JsonResponse({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def update_issue(request):
    try:
        data = json.loads(request.body)
        
        number_issue = request.GET.get('number_issue', None)
        
        github_token = data.get('github_token')
        repository = data.get('repository')
        title = data.get('title')
        body = data.get('body', None)
        assignees = data.get('assignees', [])
        
        if not github_token or not repository:
            return JsonResponse({'error': 'Ausência de parâmetros'}, status=status.HTTP_400_BAD_REQUEST)
        
        g = get_github_client(github_token)
        repo = g.get_repo(repository)
            
        issue = repo.get_issue(number=int(number_issue))

        if title:
            issue.edit(title=title)

        if body:
            issue.edit(body=body)

        if assignees and assignees != [None]:
            issue.edit(assignees=assignees)
        
        return JsonResponse({'success': 'Issue atualizada com sucesso!'}, status=status.HTTP_200_OK)

    except GithubException as e:
        # Manipulação de erros de validação do GitHub
        error_message = str(e.data.get('message', str(e)))
        errors = e.data.get('errors', [])

        if 'Validation Failed' in error_message:
            error_details = []
            for error in errors:
                if error['resource'] == 'Issue' and error['field'] == 'assignees' and error['code'] == 'invalid':
                    error_details.append(f"Assignee inválido: {error['value']}")

            return JsonResponse({'error': 'Erro de validação', 'details': error_details}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        return JsonResponse({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Tarefa.DoesNotExist:
        return JsonResponse({'error': 'Tarefa não encontrada.'}, status=status.HTTP_404_NOT_FOUND)




def filter_membro_projeto_by_assignee_and_by_projeto(assignee, projeto):
    try:
        membro = Membro.objects.get(github__usuario_github=assignee)
        membro_projeto = MembroProjeto.objects.get(membro=membro.id, projeto=projeto)
        return membro_projeto.id
    except Membro.DoesNotExist:
        return None
    except MembroProjeto.DoesNotExist:
        return None

# def get_label_ids(labels):
#     label_ids = []
#     for label_name in labels:
#         try:
#             # Verificar se o label existe no banco de dados
#             label = Label.objects.get(nome=label_name)
#             label_ids.append(label.id)
#         except Label.DoesNotExist:
#             pass
#     return label_ids

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

