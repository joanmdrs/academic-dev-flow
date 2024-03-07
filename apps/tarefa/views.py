from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
from .models import Tarefa
from .serializers import TarefaSerializer
from apps.membro_projeto.models import MembroProjeto
from apps.membro.models import Membro
from apps.fluxo.models import Fluxo
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 


class CadastrarTarefaView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request): 
        try:
            serializer = TarefaSerializer(data=request.data)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(serializer.erros, status=status.HTTP_400_BAD_REQUEST)
        
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
            
class ListarTarefasPorProjetoView(APIView):
    
    permission_classes = [IsAuthenticated]
    def get(self, request, id_projeto): 
        try:
            
            tarefas = Tarefa.objects.filter(projeto_id=id_projeto)  # Buscamos as tarefas do projeto
            tarefas_info = []

            for tarefa in tarefas:
                # Obtemos os dados dos objetos do relacionamento entre membro e projeto
                membros_projeto = MembroProjeto.objects.filter(projeto_id=id_projeto, id__in=tarefa.membros.all())
                
                membros_info = []
                
                for membro_projeto in membros_projeto:
                    membros_info.append({
                        'id_membro_projeto': membro_projeto.id,
                        'id_membro': membro_projeto.membro.id,
                        'nome_membro': membro_projeto.membro.nome,
                        'grupo_membro': membro_projeto.membro.grupo
                    })

                tarefas_info.append({
                    'id': tarefa.id,
                    'nome': tarefa.nome,
                    'data_criacao': tarefa.data_criacao,
                    'prazo': tarefa.prazo,
                    'descricao': tarefa.descricao,
                    'concluida': tarefa.concluida,
                    'projeto': tarefa.projeto_id,
                    'iteracao': tarefa.interacao_id,
                    'membros': membros_info,
                })
            return JsonResponse(tarefas_info, safe=False, json_dumps_params={'ensure_ascii': False})
        
                
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# class ListarTarefasPorProjetoView(APIView): 
#     permission_classes = [IsAuthenticated]
    
#     def get(self, request, id_projeto): 
#         try:
#             tarefas = Tarefa.objects.filter(projeto_id=id_projeto)
#             serializer = TarefaSerializer(tarefas, many=True)
#             return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
        
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
        
        
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
    
    def delete(self, request, id): 
        try: 
            tarefa = Tarefa.objects.get(pk=id)
            if tarefa is not None: 
                tarefa.delete()
                return Response({"detail": "Tarefa excluída com sucesso"}, status=status.HTTP_204_NO_CONTENT)
            else:
                return JsonResponse({'error': 'Recurso não encontrado'}, status=status.HTTP_404_NOT_FOUND)  
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
        

        
        
    
    