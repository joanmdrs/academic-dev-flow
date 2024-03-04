from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import Etapa
from apps.fluxo.models import Fluxo
from .serializers import EtapaSerializer
from rest_framework.permissions import IsAuthenticated

class CadastrarEtapaView(APIView):
    def post(self, request):
        try:
            serializer = EtapaSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class BuscarEtapaPeloNomeView(APIView):
    def get(self, request):
        try:
            parametro = request.GET.get('nome', None)
            if parametro is not None: 
                etapas = Etapa.objects.filter(nome__icontains=parametro)
            else:
                etapas = Etapa.objects.all()    
                
            if not etapas : 
                return Response({'message': 'Nenhuma etapa encontrada', 'results': []}, status=status.HTTP_200_OK)
            
            serializer = EtapaSerializer(etapas, many=True)
            
            return Response({'message': 'Etapas encontradas com sucesso.', 'results': serializer.data}, status=status.HTTP_200_OK)
                        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarEtapaPeloIdView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, id):
        try:
            etapa = Etapa.objects.get(pk=id)
            serializer = EtapaSerializer(etapa, many=False)
            return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
 
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarEtapasView(APIView):
    def get(self, request):
        try: 
            etapas = Etapa.objects.all()
            serializer = EtapaSerializer(etapas, many=True) 
            return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})  
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
class AtualizarEtapaView(APIView): 
    def patch(self, request, id):
        try: 
            print(id)
            etapa = Etapa.objects.get(pk=id)
            print(etapa)
            serializer = EtapaSerializer(etapa, data=request.data)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
             
        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
class ExcluirEtapaView(APIView):
    def delete(self, request, id): 
        try:
            etapa = Etapa.objects.get(pk=id)
            
            if etapa is not None:
                etapa.delete()
                return Response({'detail': 'Etapa excluída com sucesso!'}, status=status.HTTP_204_NO_CONTENT)
            
            else: 
                return Response({'error': 'Objeto não encontrado!'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 