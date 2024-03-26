from django.http import JsonResponse
from .github_auth import get_github_client

def list_user_repositories(request):
    github_client = get_github_client()  # Obtenha o cliente PyGithub
    user = github_client.get_user()  # Obtenha o usuário autenticado
    repositories = [repo.name for repo in user.get_repos()]  # Obtenha os nomes dos repositórios

    return JsonResponse({'repositories': repositories})  # Retorne os nomes dos repositórios em formato JSON
