from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Tarefa
from .serializers import TarefaSerializer
from apps.membro_projeto.models import MembroProjeto
from apps.membro.models import Membro
from apps.iteracao.models import Iteracao
from apps.categoria.models import Categoria
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 
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

class AtualizarStatusTarefaView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request):
        try:
            id_tarefa = request.GET.get('id_tarefa', None)
            status_tarefa = request.data.get('status', None)

            if not id_tarefa and not status_tarefa:
                return Response({'error': 'O ID da tarefa e o status não foram fornecidos !'}, status=status.HTTP_400_BAD_REQUEST)
            
            tarefa = Tarefa.objects.get(id=id_tarefa)
            
            if tarefa:
                serializer = TarefaSerializer(tarefa, data={'status': status_tarefa}, partial=True)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)

                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response({'error': 'Tarefa não localizada!'}, status=status.HTTP_404_NOT_FOUND)
                
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
                tarefas = Tarefa.objects.all()
            
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
            
            return Response([], status=status.HTTP_200_OK)
                
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
            ids_tarefas = request.data.get('ids_tarefas', [])

            if not ids_tarefas:
                return Response({'error': 'O IDs das tarefas não foram fornecidos'}, status=status.HTTP_400_BAD_REQUEST)
                
            tarefas = Tarefa.objects.filter(id__in=ids_tarefas)
            
            if tarefas.exists():
                tarefas.delete()
                return Response({"detail": "Tarefas excluídas com sucesso"}, status=status.HTTP_204_NO_CONTENT)
            
            return Response({'error': 'Uma ou mais tarefas não foram encontradas'}, status=status.HTTP_404_NOT_FOUND)

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

class ListarTarefasDosProjetosDoMembroView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            # Obtém o ID do membro da requisição
            id_membro = request.GET.get('id_membro', None)
            
            if not id_membro:
                return Response({'error': 'O ID do membro não foi fornecido!'}, status=status.HTTP_400_BAD_REQUEST)

            # Busca os projetos associados ao membro
            membros_projeto = MembroProjeto.objects.filter(membro=id_membro)
            
            if not membros_projeto.exists():
                # Retorna uma resposta específica indicando que o membro não está vinculado a nenhum projeto
                return Response(
                    {
                        'message': 'O membro não está vinculado a nenhum projeto',
                        'code': 'MEMBRO_SEM_PROJETO'
                    }, 
                    status=status.HTTP_200_OK
                )

            # Extrai os projetos do queryset MembroProjeto
            projetos_ids = membros_projeto.values_list('projeto', flat=True)
            
            # Busca todas as tarefas vinculadas a esses projetos
            tarefas = Tarefa.objects.filter(projeto__in=projetos_ids).distinct().order_by('id')
            
            if not tarefas.exists():
                return Response([], status=status.HTTP_200_OK)

            # Serializa as tarefas
            serializer = TarefaSerializer(tarefas, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except MembroProjeto.DoesNotExist:
            return Response({'error': 'Objeto(s) MembroProjeto não localizado(s)'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class FiltrarTarefasPorMembroEPorProjetoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            id_membro = request.GET.get('id_membro', None)
            id_projeto = request.GET.get('id_projeto', None)
            
            # Valida se pelo menos um dos IDs foi fornecido
            if not id_membro and not id_projeto:
                return Response(
                    {'error': 'O ID do membro e o ID do projeto não foram fornecidos!'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
                
            # Se o id_membro foi fornecido e id_projeto não foi
            if id_membro and not id_projeto:
                membros_projeto = MembroProjeto.objects.filter(membro=id_membro)
                
                if not membros_projeto.exists():
                    return Response(
                        {
                            'message': 'O membro não está vinculado a nenhum projeto',
                            'code': 'MEMBRO_SEM_PROJETO'
                        }, 
                        status=status.HTTP_200_OK
                    )

                # Extrai os IDs dos projetos
                ids_membro_projeto = membros_projeto.values_list('id', flat=True)
                
                # Busca as tarefas associadas aos projetos que o membro faz parte, mas filtrando também por aquele membro
                tarefas = Tarefa.objects.filter(membros__in=ids_membro_projeto).distinct().order_by('id')
                
                if not tarefas.exists():
                    return Response([], status=status.HTTP_200_OK)
                
                # Serializa as tarefas
                serializer = TarefaSerializer(tarefas, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            # Se o id_projeto foi fornecido e id_membro não foi
            if id_projeto and not id_membro:
                tarefas = Tarefa.objects.filter(projeto=id_projeto).distinct().order_by('id')
                
                if not tarefas.exists():
                    return Response([], status=status.HTTP_200_OK)
                
                # Serializa as tarefas
                serializer = TarefaSerializer(tarefas, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            # Se ambos id_membro e id_projeto foram fornecidos
            if id_membro and id_projeto:
                membros_projeto = MembroProjeto.objects.filter(membro=id_membro, projeto=id_projeto)
                
                if not membros_projeto.exists():
                    return Response(
                        {
                            'message': 'O membro não está vinculado ao projeto informado',
                            'code': 'MEMBRO_SEM_PROJETO'
                        }, 
                        status=status.HTTP_200_OK
                    )
                
                # Busca as tarefas do membro dentro do projeto
                tarefas = Tarefa.objects.filter(projeto=id_projeto, membros__in=membros_projeto).distinct().order_by('id')
                
                if not tarefas.exists():
                    return Response([], status=status.HTTP_200_OK)
                
                # Serializa as tarefas
                serializer = TarefaSerializer(tarefas, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
