from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from . models import *
from . serializers import *
from rest_framework.response import Response

class ProjetoView(APIView):
    def get(self, request):
        projetos = Projeto.objects.all()
        serializer = ProjetoSerializer(projetos, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = ProjetoSerializer(data=request.data)
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

