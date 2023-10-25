from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import Etapa
from .serializers import EtapaSerializer

class CadastrarEtapaView(APIView):
    def post(self, request):
        serializer = EtapaSerializer(Etapa, data=request.data);
        
        if(serializer.is_valid(raise_exception=True)):
            serializer.save()

