from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
from .models import Iteracao
from django.shortcuts import get_object_or_404
from apps.fluxo.models import Fluxo
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 
from apps.membro_projeto.models import MembroProjeto