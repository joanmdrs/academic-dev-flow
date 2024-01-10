from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import Etapa
from apps.fluxo.models import Fluxo
from .serializers import EtapaSerializer

class CadastrarEtapaView(APIView):
    def post(self, request):
        data = request.data
        fluxo_id = data.get('fluxo')

        fluxo = Fluxo.objects.get(pk=fluxo_id)  

        etapas_data = data.get('etapas', [])  # Obtém a lista de etapas do payload

        etapas_cadastradas = []  # Lista para armazenar as etapas cadastradas

        for etapa_data in etapas_data:
            etapa_data['fluxo'] = fluxo_id  # Adiciona o ID do fluxo a cada etapa
            serializer = EtapaSerializer(data=etapa_data)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                etapas_cadastradas.append(serializer.data)

        return Response(etapas_cadastradas, status=status.HTTP_201_CREATED)

class BuscarEtapaPorIdFluxoView(APIView):
    def get(self, request):
        parametro = request.GET.get('fluxo_id', None)
        
        if parametro is not None:
            etapas = Etapa.objects.filter(fluxo=parametro)
            
        else:
            etapas = None
            
        serializer = EtapaSerializer(etapas, many=True)
        
        return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
            
