from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from apps.membro_projeto.models import MembroProjeto
from apps.membro_projeto.serializers import MembroProjetoSerializer
from apps.membro.models import Membro
from apps.projeto.models import Projeto
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 
from django.core.exceptions import ObjectDoesNotExist

