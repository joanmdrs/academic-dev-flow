from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import MembroProjeto
from .serializers import MembroProjetoSerializer
from apps.membro.models import Membro
from apps.projeto.models import Projeto
from django.db.models import Count
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 
from django.db.models import Count
from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError

class CadastrarMembroProjetoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            ids_membros = request.data.get('membros', [])
            id_projeto = request.data.get('projeto', None)
            
            if not id_projeto or not ids_membros:
                return Response({'error': 'O ID do projeto e os IDs dos membros são necessários.'}, status=status.HTTP_400_BAD_REQUEST)

            novos_membros = []

            for id_membro in ids_membros:
                if not MembroProjeto.objects.filter(projeto_id=id_projeto, membro_id=id_membro).exists():
                    novos_membros.append(MembroProjeto(projeto_id=id_projeto, membro_id=id_membro))

            if novos_membros:
                membros_criados = MembroProjeto.objects.bulk_create(novos_membros)
                serializer = MembroProjetoSerializer(membros_criados, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(
                {'message': 'Os membros selecionados já estão vinculados ao projeto.'}, status=status.HTTP_204_NO_CONTENT)

        except IntegrityError as e:
            return Response({'error': 'Erro de integridade: ' + str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
class AtualizarMembroProjetoView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request): 
        try: 
            
            id_membro_projeto = request.GET.get('id_membro_projeto', None)
            membroProjeto = MembroProjeto.objects.get(id=id_membro_projeto) 
            
            serializer = MembroProjetoSerializer(membroProjeto, data=request.data)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
    
        except Exception as e: 
             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
         
class ExcluirMembroProjetoView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request):
        try:
            ids_membro_projeto = request.data.get('ids_membro_projeto', None)
            
            if not ids_membro_projeto: 
                return Response(
                    {'error': 'Os IDs dos membros_projeto não foram fornecidos!'}, status=status.HTTP_400_BAD_REQUEST)
                
            objs_membro_projeto = MembroProjeto.objects.filter(id__in=ids_membro_projeto)
            
            if objs_membro_projeto.exists():
                objs_membro_projeto.delete()
                return Response({"detail": "Objetos Membro Projeto excluídos com sucesso"}, status=status.HTTP_204_NO_CONTENT)
            
            return Response({'error': 'Um ou mais objetos não foram encontrados'}, status=status.HTTP_404_NOT_FOUND)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  
        
class BuscarMembroProjetoPeloIdMembroEPeloIdProjeto(APIView):
    permission_classes =[IsAuthenticated]
    def get(self, request):
        try:
            id_membro = request.GET.get('id_membro', None)
            id_projeto = request.GET.get('id_projeto', None)
            
            if id_membro is None or id_projeto is None:
                return Response({'error': 'Os parâmetros referentes ao id do membro e do projeto são obrigatórios'}, status=status.HTTP_400_BAD_REQUEST)

            membro_projeto = MembroProjeto.objects.get(projeto=id_projeto, membro=id_membro)
            
            serializer = MembroProjetoSerializer(membro_projeto, many=False)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except MembroProjeto.DoesNotExist:
            return JsonResponse({'error': 'Membro não encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarProjetosDoMembroView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            id_membro = request.GET.get('id_membro', None)

            if id_membro is None: 
                return Response({'error': 'Parâmetro id_membro não fornecido!'}, status=status.HTTP_400_BAD_REQUEST)
            
            objs_membro_projeto = MembroProjeto.objects.filter(membro=id_membro)
            
            if objs_membro_projeto.exists():
                serializer = MembroProjetoSerializer(objs_membro_projeto, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
                
            return Response([], status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarMembrosPorProjetoView(APIView): 
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try: 
            id_projeto = request.GET.get('id_projeto', None)
            
            if id_projeto is None: 
                return Response({'error': 'Parâmetro id_projeto não fornecido!'}, status=status.HTTP_400_BAD_REQUEST)
            
            items_membro_projeto = MembroProjeto.objects.filter(projeto=id_projeto)
            
            if items_membro_projeto is not None:
                serializer = MembroProjetoSerializer(items_membro_projeto, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(data=[], status=status.HTTP_204_NO_CONTENT)

        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarMembroProjetoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            objs_membros_projetos = MembroProjeto.objects.all()
            
            if objs_membros_projetos.exists():
                serializer = MembroProjetoSerializer(objs_membros_projetos, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
                
            return Response([], status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# class BuscarMembroProjetoPeloUsuarioGithubView(APIView):
#     permission_classes = [IsAuthenticated]
    
#     def get(self, request):
#         try:
#             usuario_github = request.GET.get('usuario_github')
#             id_projeto = request.GET.get('id_projeto')
            
#             membro = get_object_or_404(Membro, github__usuario_github=usuario_github)
            
#             membro_projeto = MembroProjeto.objects.filter(membro=membro.id, projeto=id_projeto).first()

#             membro_data = {
#                 'id_membro_projeto': membro_projeto.id,
#                 'nome_membro_projeto': membro.nome
#             }

#             return JsonResponse(membro_data, status=200)
        
#         except Membro.DoesNotExist:
#             return JsonResponse({'error': 'Membro não encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
#         except MembroProjeto.DoesNotExist:
#             return JsonResponse({'error': 'Membro não encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# class CadastrarFuncaoMembroView(APIView):
#     permission_classes = [IsAuthenticated]
    
#     def post(self, request):
#         try:
#             funcoes = request.data.get('funcoes', [])
#             serializer = FuncaoMembroProjetoSerializer(data=funcoes, many=True)
#             if serializer.is_valid(raise_exception=True):
#                 serializer.save()
#                 return Response(serializer.data, status=status.HTTP_200_OK)
            
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   
            
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# class CadastrarFuncaoAtualView(APIView):
#     permission_classes = [IsAuthenticated]
    
#     def post(self, request):
#         try:
#             membro_projeto_id = request.data.get('membro_projeto')
#             funcao_ativa = FuncaoMembroProjetoAtual.objects.filter(membro_projeto_id=membro_projeto_id, ativo=True).first()
            
#             if funcao_ativa:
#                 funcao_ativa.ativo = False
#                 funcao_ativa.save()
            
#             serializer = FuncaoMembroProjetoAtualSerializer(data=request.data)
#             if serializer.is_valid(raise_exception=True):
#                 serializer.save()
#                 return Response(serializer.data, status=status.HTTP_200_OK)
            
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  
        
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# class ListarFuncoesMembroView(APIView):
#     permission_classes = [IsAuthenticated]
    
#     def get(self, request):
#         try:
            
#             funcoes = FuncaoMembroProjeto.objects.all()
            
#             if funcoes.exists():
#                 serializer = FuncaoMembroProjetoSerializer(funcoes, many=True) 
#                 return Response(serializer.data, status=status.HTTP_200_OK)   
            
#             return Response(data=[], status=status.HTTP_204_NO_CONTENT)
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        