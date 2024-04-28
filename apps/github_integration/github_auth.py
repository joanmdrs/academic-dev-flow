from github import Github
from decouple import config

def get_github_client(github_token):
    return Github(github_token)  
