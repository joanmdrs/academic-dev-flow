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
    
def create_issue(request):
    try:
        github_token = request.GET.get('github_token') 
        repositorio = request.GET.get('repositorio')
        titulo_issue = request.GET.get('titulo')
        descricao_issue = request.GET.get('descricao')
        autor = request.GET.get('autor')
        
        if github_token:
            
            g = get_github_client(github_token)
            repo = g.get_repo(repositorio)
            repo.create_issue(title={titulo_issue}, body={descricao_issue}, assignee={autor})

            return JsonResponse('Issue criada com sucesso!', status=status.HTTP_201_CREATED)

    except GithubException as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    
def list_issues(request):
    try:
        g = get_github_client()
        repository = request.GET.get('repository')
        repo = g.get_repo(repository)
        open_issues = repo.get_issues(state='open')
        
        issues_list = []
        for issue in open_issues:
            issues_list.append({
                'title': issue.title,
                'body': issue.body,
                'created_at': issue.created_at.isoformat(),
            })
        
        return JsonResponse(issues_list, safe=False, status=status.HTTP_200_OK)
    
    
    except GithubException as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
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
    
def list_contents(request):
    try:
        repository = request.GET.get('repository')
        
        if not repository:
            return JsonResponse({'error': 'Os parâmetros repository e username são obrigatórios'}, status=400)
        
        g = get_github_client()
        
        repo = g.get_repo(repository)
        
        documentos = []

        contents = repo.get_contents("docs")
        
        while contents:
            file_content = contents.pop(0)
            if file_content.type == "dir":
                contents.extend(repo.get_contents(file_content.path))
            else:
                documentos.append({
                    'name': file_content.name,
                    'path': file_content.path,
                    'content': file_content.content,
                    'download_url': file_content.download_url,
                    'type': file_content.type
                })
                
        return JsonResponse(documentos, safe=False)
                
    except GithubException as e:
        return JsonResponse({'error': str(e)}, status=500)
    
def get_content(request):
    try: 
        
        github_token = request.GET.get('github_token')
        repository = request.GET.get('repository')
        path = request.GET.get('path')
        
        if not repository or not github_token:
            return JsonResponse({'error': 'O parâmetro token e repository são obrigatórios'}, status=status.HTTP_400_BAD_REQUEST)
        
        g = get_github_client(github_token)
        repo = g.get_repo(repository)    
        
        try:
            content = repo.get_contents(path)
            
            if content:
                return JsonResponse({'content': content.decoded_content.decode()}, status=status.HTTP_200_OK)

        except GithubException as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
    
    
    except GithubException as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
def create_content(request):
    try:
    
        data = json.loads(request.body)
        
        github_token = data.get('github_token')
        repository = data.get('repository')
        content = data.get('content')
        commit_message = data.get('commit_message')
        path = data.get('path', "test.txt")
        author_name = data.get('author_name')
        author_email = data.get('author_email')
        
        g = get_github_client(github_token)
         
        if not repository or not content or not commit_message:
            return JsonResponse({'error': 'Os parâmetros repository, content e commit_message são obrigatórios'}, status=400)
        
        repo = g.get_repo(repository)
        
        author = InputGitAuthor(author_name, author_email)
        
        # Verifica se o arquivo já existe
        try:
            existing_file = repo.get_contents(path)
            sha = existing_file.sha
            # Se o arquivo existe, atualize o conteúdo
            return JsonResponse({'error': 'Um arquivo com o mesmo caminho já existe. Escolha outro caminho.'}, status=status.HTTP_409_CONFLICT)

        except Exception as e:
            # Se o arquivo não existe, crie um novo
            create_result = repo.create_file(path, commit_message, content, branch="main", committer=author)
            # Obtém o SHA do commit para o arquivo criado
            sha = create_result['commit'].sha
        
        return JsonResponse({'success': 'Arquivo criado ou atualizado com sucesso!', 'sha': sha}, status=status.HTTP_201_CREATED)
                
    except GithubException as e:
        return JsonResponse({'error': str(e)}, status=500)

    
def update_content(request):
    try:
    
        data = json.loads(request.body)
        
        content = data.get('content')
        repository = data.get('repository')
        commit_message = data.get('commit_message')
        path = data.get('path')
        
        if not repository or not content or not commit_message or not path:
            return JsonResponse(
                {'error': 'Os parâmetros repository, content, path e commit_message são obrigatórios'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        g = get_github_client()
    
        repo = g.get_repo(repository)
        
        contents = repo.get_contents(path)
        
        repo.update_file(contents.path, content, commit_message, contents.sha, branch="main")
        
        return JsonResponse({'success': 'Arquivo atualizado com sucesso'}, status=status.HTTP_200_OK)
    
    except GithubException as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
def delete_content(request):
    try:

        repository = request.GET.get('repository')
        commit_message = request.GET.get('commit_message')
        path = request.GET.get('path')
        
        if not repository or not path or not commit_message:
            return JsonResponse({'error': 'Os parâmetros repository, path e commit_message são obrigatórios'}, status=400)
    
        g = get_github_client()
        
        repo = g.get_repo(repository)
        
        contents = repo.get_contents(path)
        
        repo.delete_file(contents.path, commit_message, contents.sha, branch="main")
        
        return JsonResponse({'success': 'Arquivo excluído com sucesso'}, status=status.HTTP_204_NO_CONTENT)


    except GithubException as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
