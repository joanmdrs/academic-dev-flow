from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
from .models import Tarefa
from .serializers import TarefaSerializer
from apps.membro_projeto.models import MembroProjeto
from apps.membro.models import Membro
from apps.fluxo.models import Fluxo
from apps.iteracao.models import Iteracao
from apps.categoria.models import Categoria
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 
from django.http import Http404
from django.shortcuts import get_object_or_404

class CadastrarTarefaView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            data_tarefa = request.data
            projeto_id = data_tarefa['projeto']
            iteracao_id = data_tarefa['iteracao']
            membros_projeto = data_tarefa['membros']

            # Verifica se a iteração pertence ao projeto
            iteracao = Iteracao.objects.get(id=iteracao_id)
            if iteracao.projeto.id != projeto_id:
                return Response(
                    {'error': 'A iteração não está vinculada ao projeto informado.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Verifica se todos os membros estão vinculados ao projeto
            for id_membro_projeto in membros_projeto:
                membro_projeto = MembroProjeto.objects.get(id=id_membro_projeto)
                if membro_projeto.projeto.id != projeto_id:
                    return Response(
                        {'error': f'O membro {membro_projeto.id} não está vinculado ao projeto informado.'},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            # Serializa e valida a tarefa
            serializer = TarefaSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Iteracao.DoesNotExist:
            return Response({'error': 'Iteração não encontrada.'}, status=status.HTTP_404_NOT_FOUND)
        except MembroProjeto.DoesNotExist:
            return Response({'error': 'Membro do projeto não encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AtualizarTarefaView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request): 
        try: 
            id_tarefa = request.GET.get('id_tarefa', None)
            data_tarefa = request.data
                        
            # Verifica se o ID da tarefa foi fornecido
            if not id_tarefa: 
                return Response({'error': 'O ID da tarefa não foi fornecido'}, status=status.HTTP_400_BAD_REQUEST)
            
            tarefa = Tarefa.objects.get(id=id_tarefa)
            
            if tarefa: 
                projeto_id = data_tarefa['projeto']
                iteracao_id = data_tarefa['iteracao']
                membros_projeto = data_tarefa['membros']

                # Verifica se a iteração pertence ao projeto
                iteracao = Iteracao.objects.get(id=iteracao_id)
                if iteracao.projeto.id != projeto_id:
                    return Response(
                        {'error': 'A iteração não está vinculada ao projeto informado.'},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                # Verifica se todos os membros estão vinculados ao projeto
                for id_membro_projeto in membros_projeto:
                    membro_projeto = MembroProjeto.objects.get(id=id_membro_projeto)
                    if membro_projeto.projeto.id != projeto_id:
                        return Response(
                            {'error': f'O membro {membro_projeto.id} não está vinculado ao projeto informado.'},
                            status=status.HTTP_400_BAD_REQUEST
                        )
                
                serializer = TarefaSerializer(tarefa, data=request.data, partial=True)
            
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
            
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            return Response({'error': 'Tarefa não encontrada'}, status=status.HTTP_404_NOT_FOUND)
        
        except Tarefa.DoesNotExist:
            return Response({'error': 'Tarefa não encontrada'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 

class AtualizarIteracaoTarefasView(APIView):
    permission_classes = [IsAuthenticated]
    
    def patch(self, request):
        ids_tarefas = request.data.get('ids_tarefas', [])
        id_iteracao = request.data.get('id_iteracao')
        
        if not ids_tarefas:
            return Response({'error': 'Nenhum ID de tarefa fornecido'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not id_iteracao:
            return Response({'error': 'ID de iteração não fornecido'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Buscar iteração ou retornar 404
            iteracao = get_object_or_404(Iteracao, id=id_iteracao)
            
            # Filtrar as tarefas com base nos IDs fornecidos
            tarefas = Tarefa.objects.filter(id__in=ids_tarefas)
            
            if not tarefas.exists():
                return Response({'error': 'Nenhuma tarefa encontrada com os IDs fornecidos'}, status=status.HTTP_404_NOT_FOUND)
            
            # Atualizar a iteração das tarefas de uma vez só
            tarefas.update(iteracao=iteracao)
            
            # Serializar e retornar as tarefas atualizadas
            serializer = TarefaSerializer(tarefas, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except IntegrityError as e:
            return Response({'error': 'Erro de integridade de dados'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarTarefaPeloIdView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            id_tarefa = request.GET.get('id_tarefa', None)
            
            if not id_tarefa:
                return Response({'error': 'O ID da tarefa não foi fornecido'}, status=status.HTTP_400_BAD_REQUEST)
            
            tarefa = Tarefa.objects.get(id=id_tarefa)
            
            if tarefa:
                serializer = TarefaSerializer(tarefa, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response({'error': 'Tarefa não encontrada'}, status=status.HTTP_404_NOT_FOUND)
        
        except Tarefa.DoesNotExist:
            return Response({'error': 'Tarefa não encontrada'}, status=status.HTTP_404_NOT_FOUND)
                    
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
        
class BuscarTarefasPeloNomeEPeloProjeto(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            nome_tarefa = request.GET.get('nome_tarefa')
            id_projeto = request.GET.get('id_projeto')
            
            if not nome_tarefa and not id_projeto:
                return Response(
                    {'error': 'Os parâmetros nome da tarefa e ID do projeto não foram fornecidos, é necessário pelo menos um parâmetro'}, status=status.HTTP_400_BAD_REQUEST)
            
            if nome_tarefa and id_projeto:
                tarefas = Tarefa.objects.filter(nome__icontains=nome_tarefa, projeto_id=id_projeto)
            elif nome_tarefa:
                tarefas = Tarefa.objects.filter(nome__icontains=nome_tarefa)
            else: 
                tarefas = Tarefa.objects.filter(projeto_id=id_projeto)
                
            if tarefas.exists():
                
                serializer = TarefaSerializer(tarefas, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(data=[], status=status.HTTP_204_NO_CONTENT)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   
        
class ListarTarefasView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            
            tarefas = Tarefa.objects.all()
            
            if tarefas.exists():
                serializer = TarefaSerializer(tarefas, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response([], status=status.HTTP_204_NO_CONTENT)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
class ListarTarefasPorProjetoView(APIView):
    permission_classes = [IsAuthenticated] 
    def get(self, request): 
        try:
            id_projeto = request.GET.get('id_projeto', None)
            
            if not id_projeto:
                return Response({'error': 'O ID do projeto não foi fornecido.'}, status=status.HTTP_400_BAD_REQUEST)
            
            tarefas = Tarefa.objects.filter(projeto_id=id_projeto).order_by('id')
            
            if tarefas.exists():
                
                serializer = TarefaSerializer(tarefas, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response({'error': 'Tarefas não encontradas'}, status=status.HTTP_404_NOT_FOUND)
                
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarTarefasPorIteracaoView(APIView): 
    permission_classes = [IsAuthenticated] 
    def get(self, request):
        try:
            id_iteracao = request.GET.get('id_iteracao', None)
            
            if not id_iteracao:
                return Response({'error': 'O ID da iteração não foi fornecido'}, status=status.HTTP_400_BAD_REQUEST)
                      
            tarefas = Tarefa.objects.filter(iteracao_id=id_iteracao).order_by('id')
            
            if tarefas.exists():  
                serializer = TarefaSerializer(tarefas, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response([], status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ExcluirTarefaView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        try:
            ids_tasks = request.GET.getlist('ids[]', [])

            if ids_tasks is not None:
                tarefas = Tarefa.objects.filter(id__in=ids_tasks)
                
                if tarefas.exists():
                    tarefas.delete()
                    return Response({"detail": "Tarefas excluídas com sucesso"}, status=status.HTTP_204_NO_CONTENT)
                
                return Response({'error': 'Nenhuma tarefa encontrada com os IDs fornecidos'}, status=status.HTTP_404_NOT_FOUND)

            return Response({'error': 'IDs das tarefas a serem excluídas não fornecidos'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ConcluirTarefasView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request):
        try:
            
            ids_tasks = request.data.get('ids', [])
            
            if not ids_tasks:
                return Response({'error': 'IDs das tarefas a serem concluídas não forão fornecidos'}, status=status.HTTP_400_BAD_REQUEST)

            tarefas = Tarefa.objects.filter(id__in=ids_tasks)
            
            for tarefa in tarefas:
                tarefa.concluida = True  
                tarefa.save()

            return Response({'success': 'Tarefas resolvidas com sucesso'}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
class ReabrirTarefasView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request):
        try:
            
            ids_tasks = request.data.get('ids', [])
            
            if not ids_tasks:
                return Response({'error': 'IDs das tarefas a serem reabertas não forão fornecidos'}, status=status.HTTP_400_BAD_REQUEST)

            tarefas = Tarefa.objects.filter(id__in=ids_tasks)
            
            for tarefa in tarefas:
                tarefa.concluida = False 
                tarefa.save()

            return Response({'success': 'Tarefas reabertas com sucesso'}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class VerificarIssueExisteView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            id_issue = request.GET.get('id_issue', None)
            tarefa = get_object_or_404(Tarefa, id_issue=id_issue)
            serializer = TarefaSerializer(tarefa)
            return Response({'tarefa': serializer.data, 'exists': True}, status=status.HTTP_200_OK)
        
        except Http404:
            return Response({'exists': False}, status=status.HTTP_200_OK)
                                        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
        

class SicronizarIssuesView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request): 
        try:
            serializer = TarefaSerializer(data=request.data, many=True)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 

class IniciarContagemTempoView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            membro_projeto = MembroProjeto.objects.get(pk=request.data['membro_projeto_id'])
            tarefa = Tarefa.objects.get(pk=request.data['tarefa_id'])
            
            tarefa.iniciar_contagem_tempo(membro_projeto=membro_projeto)
            
            return JsonResponse({'success': True})
        except Tarefa.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Tarefa não encontrada'})

class PararContagemTempoView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            membro_projeto = MembroProjeto.objects.get(pk=request.data['membro_projeto_id'])
            tarefa = Tarefa.objects.get(pk=request.data['tarefa_id'])
            
            tarefa.parar_contagem_tempo(membro_projeto=membro_projeto)
            
            return JsonResponse({'success': True})
        except Tarefa.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Tarefa não encontrada'})
