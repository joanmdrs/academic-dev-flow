from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
from .models import Artefato
from .serializers import ArtefatoSerializer
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 

class CadastrarArtefatoView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try: 
            serializer = ArtefatoSerializer(data=request.data)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)            

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class BuscarArtefatoPorNomeView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            parametro = request.GET.get('nome', None)
            
            if parametro is not None: 
                artefatos = Artefato.objects.filter(nome__icontains=parametro)
            else:
                artefatos = Artefato.objects.all()    

            if artefatos.exists():
                serializer = ArtefatoSerializer(artefatos, many=True) 
                return Response(serializer.data, status=status.HTTP_200_OK)   
            
            return Response(data=[], status=status.HTTP_204_NO_CONTENT)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class FiltrarArtefatoPeloNomeEProjeto(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            nome = request.GET.get('nome_artefato')
            projeto = request.GET.get('id_projeto')
            
            if not nome and not projeto:
                return Response({'error': 'Pelo menos um parâmetro é necessário'}, status=status.HTTP_400_BAD_REQUEST)
            
            if nome and projeto:
                artefatos = Artefato.objects.filter(nome__icontains=nome, projeto_id=projeto)
            elif nome:
                artefatos = Artefato.objects.filter(nome__icontains=nome)
            else: 
                artefatos = Artefato.objects.filter(projeto_id=projeto)
                
            if artefatos.exists():
                
                serializer = ArtefatoSerializer(artefatos, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(data=[], status=status.HTTP_204_NO_CONTENT)
        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AtualizarArtefatoView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request, id):
        try: 
            
            artefato = Artefato.objects.get(pk=id)
            serializer = ArtefatoSerializer(artefato, data=request.data)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
        
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    

             
        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
class ExcluirArtefatoView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, id): 
        try: 
            artefato = Artefato.objects.get(pk=id)
            
            if artefato is not None: 
                artefato.delete()
                return Response({'detail': 'Artefato excluído com sucesso!'}, status=status.HTTP_204_NO_CONTENT)
            
            return Response({'error': 'Objeto não encontrado!'}, status=status.HTTP_404_NOT_FOUND)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)        
        
class ListarArtefatosView(APIView): 
    
    permission_classes = [IsAuthenticated]
    def get(self, request): 
        try: 
            artefatos = Artefato.objects.all()
            
            if artefatos.exists():
                serializer = ArtefatoSerializer(artefatos, many=True) 
                return Response(serializer.data, status=status.HTTP_200_OK)   
            
            return Response(data=[], status=status.HTTP_204_NO_CONTENT)

        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class VerificarExistenciaArtefatoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            sha_file = request.GET.get('sha_file', None)
            
            if sha_file is None:
                return Response({'error': 'O identificador do arquivo não foi informado.'}, status=status.HTTP_400_BAD_REQUEST)
            
            artefato = Artefato.objects.filter(id_file=sha_file).first()
            
            if artefato:
                serializer = ArtefatoSerializer(artefato)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'O arquivo não foi encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class SicronizarArtefatosView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try: 
            
            serializer = ArtefatoSerializer(data=request.data, many=True)
            
            if not serializer.is_valid(raise_exception=True):
                return Response(artefatos_serializer.data, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
                 
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
