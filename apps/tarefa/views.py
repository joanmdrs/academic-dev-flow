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
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 
from django.http import Http404
from django.shortcuts import get_object_or_404

class CadastrarTarefaView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request): 
        try:
            serializer = TarefaSerializer(data=request.data)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
        
        
class BuscarTarefaPeloIdView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id):
        try:
            tarefa = Tarefa.objects.get(pk=id)
            serializer = TarefaSerializer(tarefa, many=False)
            return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
        
class FiltrarTarefasPeloNomeEPeloProjeto(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            nome = request.GET.get('nome_tarefa')
            projeto = request.GET.get('id_projeto')
            
            if not nome and not projeto:
                return Response({'error': 'Pelo menos um parâmetro é necessário'}, status=status.HTTP_400_BAD_REQUEST)
            
            if nome and projeto:
                tarefas = Tarefa.objects.filter(nome__icontains=nome, projeto_id=projeto)
            elif nome:
                tarefas = Tarefa.objects.filter(nome__icontains=nome)
            else: 
                tarefas = Tarefa.objects.filter(projeto_id=projeto)
                
            if tarefas.exists():
                
                serializer = TarefaSerializer(tarefas, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(data=[], status=status.HTTP_204_NO_CONTENT)
                
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   
            
class ListarTarefasPorProjetoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id_projeto): 
        try:
            tarefas = Tarefa.objects.filter(projeto_id=id_projeto).order_by('id')
            tarefas_info = []

            for tarefa in tarefas:
                estado_contagem = tarefa.estado_contagem_tempo()
                membros_info = self.get_membros_info(tarefa)
                membros = self.get_membros(tarefa)
                iteracao_nome = self.get_iteracao_nome(tarefa)
                labels_info = self.get_labels_info(tarefa)
                labels = self.get_labels(tarefa)

                tarefa_info = {
                    'id': tarefa.id,
                    'nome': tarefa.nome,
                    'data_inicio': tarefa.data_inicio,
                    'data_termino': tarefa.data_termino,
                    'status': tarefa.status,
                    'descricao': tarefa.descricao,
                    'id_issue': tarefa.id_issue,
                    'number_issue': tarefa.number_issue,
                    'url_issue': tarefa.url_issue,
                    'projeto': tarefa.projeto_id, 
                    'iteracao': tarefa.iteracao_id,
                    'nome_iteracao': iteracao_nome,
                    'membros_info': membros_info,
                    'membros': membros,
                    'labels_info': labels_info,
                    'labels': labels,
                    'estado_contagem_tempo': estado_contagem,
                    'tempo_gasto': tarefa.tempo_gasto
                }
                tarefas_info.append(tarefa_info)
                
            return JsonResponse(tarefas_info, safe=False, json_dumps_params={'ensure_ascii': False})
                
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get_membros_info(self, tarefa):
        membros_info = []
        for membro in tarefa.membros.all():
            membro_info = {
                'id_membro_projeto': membro.id,
                'id_membro': membro.membro.id,
                'nome_membro': membro.membro.nome,
                'grupo_membro': membro.membro.grupo
            }
            membros_info.append(membro_info)
        return membros_info
    
    def get_membros(self, tarefa):
        membros_ids = tarefa.membros.all().values_list('id', flat=True)
        return list(membros_ids)

    def get_labels_info(self, tarefa):
        labels_info = []
        for label in tarefa.labels.all():
            label_info = {
                'id': label.id,
                'nome': label.nome,
            }
            labels_info.append(label_info)
        return labels_info

    def get_labels(self, tarefa):
        labels_ids = tarefa.labels.all().values_list('id', flat=True)
        return list(labels_ids)

    def get_iteracao_nome(self, tarefa):
        if tarefa.iteracao_id is not None:
            iteracao = Iteracao.objects.get(id=tarefa.iteracao_id)
            return iteracao.nome
        else:
            return None

        
class AtualizarTarefaView(APIView):
    permission_classes = [IsAuthenticated]
    
    def patch(self, request, id): 
        try: 
        
            tarefa = Tarefa.objects.get(pk=id)
            serializer = TarefaSerializer(tarefa, data=request.data, partial=True)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
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
        
class ListarTarefasPorIteracaoView(APIView): 
    permission_classes = [IsAuthenticated] 
    def get(self, request, id_iteracao):
        
        try:
            
            tarefas = Tarefa.objects.filter(iteracao_id=id_iteracao).order_by('id')
            
            if tarefas.exists():  
                serializer = TarefaSerializer(tarefas, many=True)
                return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False}, status=status.HTTP_200_OK)
            
            return JsonResponse([], safe=False, status=status.HTTP_200_OK)
        
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
            
            return Response(data=[], status=status.HTTP_204_NO_CONTENT)
        
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

class AtualizarIteracaoTarefasView(APIView):
    permission_classes = [IsAuthenticated]
    
    def patch(self, request):
        try:
            ids_tarefas = request.data.get('ids_tarefas', [])
            id_iteracao = request.data.get('id_iteracao', None)
            
            if not ids_tarefas:
                return Response({'error': 'Nenhum ID de tarefa fornecido'}, status=status.HTTP_400_BAD_REQUEST)
            
            if id_iteracao is None:
                return Response({'error': 'ID de iteração não fornecido'}, status=status.HTTP_400_BAD_REQUEST)
            
            iteracao = Iteracao.objects.get(pk=id_iteracao)
            tarefas = Tarefa.objects.filter(pk__in=ids_tarefas)
            
            for tarefa in tarefas:
                tarefa.iteracao = iteracao
                tarefa.save()
            
            return Response({'success': True}, status=status.HTTP_200_OK)
        
        except Iteracao.DoesNotExist:
            return Response({'error': 'A iteração especificada não existe'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Tarefa.DoesNotExist:
            return Response({'error': 'Uma ou mais tarefas especificadas não existem'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
