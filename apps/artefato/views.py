from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
from .models import Artefato
from apps.membro_projeto.models import MembroProjeto
from apps.membro.models import Membro
from .serializers import ArtefatoSerializer
from apps.iteracao.models import Iteracao
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
        
class AtualizarArtefatoView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request):
        try: 
            id_artefato = request.GET.get('id_artefato', None)
            
            if not id_artefato:
                return Response({'error': 'O ID do artefato não foi fornecido!'}, status=status.HTTP_400_BAD_REQUEST)
        
            artefato = Artefato.objects.get(id=id_artefato)
            
            serializer = ArtefatoSerializer(artefato, data=request.data, partial=True)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
        
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    

        except Artefato.DoesNotExist():
            return Response({'error': 'Artefato não encontrado!'}, status=status.HTTP_404_NOT_FOUND)
             
        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class AtualizarIteracaoArtefatosView(APIView):
    permission_classes = [IsAuthenticated]
    
    def patch(self, request):
        try:
            ids_artefatos = request.data.get('ids_artefatos', [])
            id_iteracao = request.data.get('id_iteracao', None)
            
            if not ids_artefatos:
                return Response({'error': 'Nenhum ID de artefato fornecido'}, status=status.HTTP_400_BAD_REQUEST)
            
            if id_iteracao is None:
                return Response({'error': 'O ID de iteração não fornecido'}, status=status.HTTP_400_BAD_REQUEST)
            
            iteracao = Iteracao.objects.get(id=id_iteracao)
            artefatos = Artefato.objects.filter(id__in=ids_artefatos)
            
            artefatos.update(iteracao=iteracao)
            
            serializer = ArtefatoSerializer(artefatos, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except IntegrityError as e:
            return Response({'error': 'Erro de integridade de dados'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Iteracao.DoesNotExist:
            return Response({'error': 'A iteração especificada não existe'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Artefato.DoesNotExist:
            return Response({'error': 'Um ou mais artefatos especificadas não existem'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarArtefatoPorNomeView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            nome_artefato = request.GET.get('nome_artefato', None)
                        
            if nome_artefato is not None: 
                artefatos = Artefato.objects.filter(nome__icontains=nome_artefato)
            else:
                artefatos = Artefato.objects.all()    

            if artefatos.exists():
                serializer = ArtefatoSerializer(artefatos, many=True) 
                return Response(serializer.data, status=status.HTTP_200_OK)   
            
            return Response(data=[], status=status.HTTP_204_NO_CONTENT)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarArtefatoPeloIdView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request): 
        try:
            id_artefato = request.GET.get('id_artefato', None)
            
            if not id_artefato:
                return Response({'error': 'O ID do artefato não foi fornecido!'}, status=status.HTTP_400_BAD_REQUEST)
            
            artefato = Artefato.objects.get(id=id_artefato)
            
            serializer = ArtefatoSerializer(artefato, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except Artefato.DoesNotExist:
            return Response({'error': 'Artefato não encontrado !'}, status=status.HTTP_404_NOT_FOUND)
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

class ListarArtefatosPorProjeto(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            id_projeto = request.GET.get('id_projeto', None)
            
            if not id_projeto:
                return Response({'error': 'O ID do projeto não foi fornecido'}, status=status.HTTP_400_BAD_REQUEST)
            
            artefatos = Artefato.objects.filter(projeto_id=id_projeto).order_by('id')
                
            if artefatos.exists():
                serializer = ArtefatoSerializer(artefatos, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(data=[], status=status.HTTP_204_NO_CONTENT)
        
        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
class ListarArtefatosPorIteracao(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            id_iteracao = request.GET.get('id_iteracao', None)
            
            if not id_iteracao: 
                return Response({'error': 'O ID da iteração não foi fornecido!'}, status=status.HTTP_400_BAD_REQUEST)
            
            artefatos = Artefato.objects.filter(iteracao_id=id_iteracao)
                
            if artefatos.exists():
                serializer = ArtefatoSerializer(artefatos, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(data=[], status=status.HTTP_204_NO_CONTENT)
        
        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarArtefatosPeloNomeEPeloProjeto(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            nome_artefato = request.GET.get('nome_artefato')
            id_projeto = request.GET.get('id_projeto')
            
            if nome_artefato and id_projeto:
                artefatos = Artefato.objects.filter(nome__icontains=nome_artefato, projeto_id=id_projeto)
            elif nome_artefato:
                artefatos = Artefato.objects.filter(nome__icontains=nome_artefato)
            elif id_projeto: 
                artefatos = Artefato.objects.filter(projeto_id=id_projeto)
            else:
                artefatos = Artefato.objects.all()
                
            if artefatos.exists():
                serializer = ArtefatoSerializer(artefatos, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response([], status=status.HTTP_204_NO_CONTENT)
        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ExcluirArtefatoView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request): 
        try: 
            ids_artefatos = request.data.get('ids_artefatos', [])
            
            if not ids_artefatos:
                return Response(
                    {'error': 'Os Ids dos artefatos não foram fornecidos !'}, status=status.HTTP_400_BAD_REQUEST)
                
            artefatos = Artefato.objects.filter(id__in=ids_artefatos)
            
            if artefatos.exists():
                artefatos.delete()
                return Response({"detail": "Artefatos excluídos com sucesso"}, status=status.HTTP_204_NO_CONTENT)
            
            return Response({'error': 'Um ou mais artefatos não foram encontrados'}, status=status.HTTP_404_NOT_FOUND)
        
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
                return Response([], status=status.HTTP_204_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class SicronizarContentsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try: 
            
            serializer = ArtefatoSerializer(data=request.data, many=True)
            
            if not serializer.is_valid(raise_exception=True):
                return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
                 
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarArtefatosDoMembroView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            
            id_membro = request.GET.get('id_membro', None)
            
            if not id_membro:
                return Response({'error': 'O ID do membro não foi fornecido!'}, status=status.HTTP_400_BAD_REQUEST)

            # Busca os projetos associados ao membro
            membros_projeto = MembroProjeto.objects.filter(membro=id_membro)
            
            if not membros_projeto.exists():
                # Retorna uma resposta específica indicando que o membro não foi vinculado a nenhum projeto
                return Response(
                    {
                        'message': 'O membro não está vinculado a nenhum projeto',
                        'code': 'MEMBRO_SEM_PROJETO'
                    }, 
                    status=status.HTTP_200_OK
                )

            # Busca todas os artefatos vinculados a esses projetos
            artefatos = Artefato.objects.filter(membros__in=membros_projeto).distinct().order_by('id')
            
            if not artefatos.exists():
                return Response([], status=status.HTTP_200_OK)
            
            # Serializa os artefatos
            serializer = ArtefatoSerializer(artefatos, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except MembroProjeto.DoesNotExist:
            return Response({'error': 'Objeto(s) MembroProjeto não localizado(s)'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
