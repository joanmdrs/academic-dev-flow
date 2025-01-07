from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from github import Github, GithubException
from .github_auth import get_github_client
from github import InputGitAuthor
from apps.artefato.models import Artefato
import base64
import json

@require_http_methods(["POST"])
def create_content(request):
    try:
    
        data = json.loads(request.body)
        
        github_token = data.get('github_token')
        repository = data.get('repository')
        content = data.get('content')
        commit_message = data.get('commit_message')
        path = data.get('path', "test.txt")
                 
        if not github_token or not repository or not content or not commit_message or not path:
            return JsonResponse({
                'error': 'Ausência de parâmetros'}, 
                status=status.HTTP_400_BAD_REQUEST)
        
        g = get_github_client(github_token)
        repo = g.get_repo(repository)
        
        try:
            existing_file = repo.get_contents(path)
            return JsonResponse({'error': 'Um arquivo com o mesmo caminho já existe. Informe outro caminho.'}, status=status.HTTP_409_CONFLICT)

        except Exception as e:
            create_result = repo.create_file(path, commit_message, content, branch="main")
            sha = create_result['commit'].sha
        
        return JsonResponse({'success': 'Arquivo criado com sucesso!', 'sha': sha}, status=status.HTTP_201_CREATED)
                
    except GithubException as e:
        return JsonResponse({'error': str(e)}, status=500)
    
@require_http_methods(["GET"])
def get_content(request):
    try: 
        
        github_token = request.GET.get('github_token')
        repository = request.GET.get('repository')
        path = request.GET.get('path')
        
        if not repository or not github_token or not path: 
            return JsonResponse({'error': 'Ausência de parâmetros'}, status=status.HTTP_400_BAD_REQUEST)
        
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

@require_http_methods(["PUT"])
def update_content(request):
    try:
    
        data = json.loads(request.body)
        github_token = data.get('github_token')
        content = data.get('content')
        repository = data.get('repository')
        commit_message = data.get('commit_message')
        path = data.get('path')
        
        if not repository or not content or not commit_message or not path:
            return JsonResponse(
                {'error': 'Os parâmetros repository, content, path e commit_message são obrigatórios'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        g = get_github_client(github_token)
    
        repo = g.get_repo(repository)
        
        contents = repo.get_contents(path)
        
        repo.update_file(contents.path, content, commit_message, contents.sha, branch="main")
        
        return JsonResponse({'success': 'Arquivo atualizado com sucesso!', 'sha': sha}, status=status.HTTP_200_OK)
    
    except GithubException as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
@require_http_methods(["DELETE"])
def delete_content(request):
    try:

        github_token = request.GET.get('github_token')
        repository = request.GET.get('repository')
        commit_message = request.GET.get('commit_message')
        path = request.GET.get('path')
        
        if not repository or not path or not commit_message:
            return JsonResponse({'error': 'Os parâmetros repository, path e commit_message são obrigatórios'}, status=status.HTTP_400_BAD_REQUEST)
    
        g = get_github_client(github_token)
        
        repo = g.get_repo(repository)
        
        contents = repo.get_contents(path)
        
        repo.delete_file(contents.path, commit_message, contents.sha, branch="main")
        
        return JsonResponse({'success': 'Arquivo excluído com sucesso'}, status=status.HTTP_204_NO_CONTENT)


    except GithubException as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@require_http_methods(["GET"])
def list_contents(request):
    try:
        github_token = request.GET.get('github_token')
        repository = request.GET.get('repository')
        folder = request.GET.get('folder')
        
        if not repository or not github_token or not folder:
            return JsonResponse(
                {'error': 'Os parâmetros repository, github_token e folder são obrigatórios', 'status': status.HTTP_400_BAD_REQUEST}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        g = get_github_client(github_token)
        repo = g.get_repo(repository)
        
        try:
            contents = repo.get_contents(folder)
        except GithubException as e:
            if e.status == 404:
                return JsonResponse(
                    {'error': 'Conteúdo não encontrado no repositório ou no caminho especificado.', 'status': status.HTTP_404_NOT_FOUND}, 
                    status=status.HTTP_404_NOT_FOUND
                )
            else:
                return JsonResponse({'error': str(e), 'status': status.HTTP_500_INTERNAL_SERVER_ERROR}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        documentos = []
        while contents:
            file_content = contents.pop(0)
            if file_content.type == "dir":
                contents.extend(repo.get_contents(file_content.path))
            else:
                documentos.append({
                    'sha': file_content.sha,
                    'name': file_content.name,
                    'url': file_content.html_url,
                    'path': file_content.path,
                    'content': file_content.content,
                    'download_url': file_content.download_url,
                    'type': file_content.type
                })
        
        documentos_list = []   
        for documento in documentos:
            artefato = Artefato.objects.filter(id_content=documento['sha']).exists()
            documento['exists'] = artefato
            documentos_list.append(documento)
               
        return JsonResponse(documentos_list, safe=False, status=status.HTTP_200_OK)
                
    except GithubException as e:
        return JsonResponse({'error': str(e), 'status': status.HTTP_500_INTERNAL_SERVER_ERROR}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
