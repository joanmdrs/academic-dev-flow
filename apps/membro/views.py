from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
# from .models import Projeto
# from .serializers import ProjetoSerializer
from django.shortcuts import get_object_or_404

class CadastrarMembroView(APIView):
    

