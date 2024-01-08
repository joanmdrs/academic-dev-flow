from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
from .models import Artefato
from .serializers import ArtefatoSerializer

class CadastrarArtefatoView(APIView):
    def post(self, request):
        try: 
            serializer = ArtefatoSerializer(data=request.data)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)            

class BuscarArtefatoPorNomeView(APIView):
    def get(self, request):
        try:
            parametro = request.GET.get('name', None)
            
            if parametro is not None: 
                artefatos = Artefato.objects.filter(nome__icontains=parametro)
            else:
                artefatos = Artefato.objects.all()    
                
            serializer = ArtefatoSerializer(artefatos, many=True) 
            
            return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})   
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AtualizarArtefatoView(APIView):
    def patch(self, request, id):
        try: 
            
            artefato = Artefato.objects.get(pk=id)
            serializer = ArtefatoSerializer(artefato, data=request.data)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
             
        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
    
class ExcluirArtefatoView(APIView):
    def delete(selg, request, id): 
        try: 
            artefato = Artefato.objects.get(pk=id)
            
            if artefato is not None: 
                artefato.delete()
                return Response({'detail': 'Artefato excluído com sucesso!'}, status=status.HTTP_204_NO_CONTENT)
            
            else: 
                return Response({'error': 'Objeto não encontrado!'}, status=status.HTTP_404_NOT_FOUND)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)        