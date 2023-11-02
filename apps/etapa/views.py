from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import Etapa
from .serializers import EtapaSerializer

class CadastrarEtapaView(APIView):
    def post(self, request):
        data = request.data
        flow_id = data.get('flow_id')  
        flow = Flow.objects.get(pk=flow_id)  

        etapa_data = {
            'nome': data['nome'],
            'descricao': data['descricao'],
            'data_inicio': data['data_inicio'],
            'data_fim': data['data_fim'],
            'status': data['status'],
            'flow': flow  
        }

        serializer = EtapaSerializer(data=etapa_data)
        if(serializer.is_valid(raise_exception=True)):
            serializer.save()
           
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

