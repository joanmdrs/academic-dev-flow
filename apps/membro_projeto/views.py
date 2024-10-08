from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import MembroProjeto, FuncaoMembroProjetoAtual, FuncaoMembroProjeto
from .serializers import MembroProjetoSerializer, FuncaoMembroProjetoSerializer, FuncaoMembroProjetoAtualSerializer
from apps.membro.models import Membro
from apps.projeto.models import Projeto
from django.db.models import Count
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 
from django.db.models import Count
from django.core.exceptions import ObjectDoesNotExist

class CadastrarMembroProjetoView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            membros_data = request.data.get('membros', [])
            serializer = MembroProjetoSerializer(data=membros_data, many=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarMembroProjetoPeloUsuarioGithubView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            usuario_github = request.GET.get('usuario_github')
            id_projeto = request.GET.get('id_projeto')
            
            membro = get_object_or_404(Membro, github__usuario_github=usuario_github)
            
            membro_projeto = MembroProjeto.objects.filter(membro=membro.id, projeto=id_projeto).first()

            membro_data = {
                'id_membro_projeto': membro_projeto.id,
                'nome_membro_projeto': membro.nome
            }

            return JsonResponse(membro_data, status=200)
        
        except Membro.DoesNotExist:
            return JsonResponse({'error': 'Membro não encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
        except MembroProjeto.DoesNotExist:
            return JsonResponse({'error': 'Membro não encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarMembroProjetoPeloIdMembro(APIView):
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

    def getQuantidadeMembros(self, id_projeto):
        quantidade_membros = MembroProjeto.objects.filter(projeto__id=id_projeto).aggregate(quantidade_membros=Count('id'))
        return quantidade_membros['quantidade_membros']

    def get(self, request, idUser):
        try:
            membro = Membro.objects.get(usuario__id=idUser)
            items = MembroProjeto.objects.filter(membro=membro)
            projetos_info = []

            for item in items:
                projeto = item.projeto
                fluxo = projeto.fluxo
                quant_membros = self.getQuantidadeMembros(projeto.id)

                projeto_info = {
                    'id': projeto.id,
                    'nome': projeto.nome,
                    'status': projeto.status,
                    'data_inicio': projeto.data_inicio,
                    'data_fim': projeto.data_fim,
                    'qtd_membros': quant_membros,
                    'fluxo_id': fluxo.id,
                    'fluxo_nome': fluxo.nome 
                }

                projetos_info.append(projeto_info)

            if projetos_info:
                return Response(projetos_info, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Nenhum projeto encontrado para este membro."}, status=status.HTTP_404_NOT_FOUND)

        except Membro.DoesNotExist:
            return Response({'error': 'O membro não foi encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        except Projeto.DoesNotExist:
            return Response({'error': 'O projeto não foi encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
class BuscarMembrosPorProjetoView(APIView): 
    permission_classes = [IsAuthenticated]
    
    def get(self, request, idProjeto):
        try: 
            objetos = MembroProjeto.objects.filter(projeto=idProjeto)
            
            if objetos is not None:
                serializer = MembroProjetoSerializer(objetos, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(data=[], status=status.HTTP_204_NO_CONTENT)

        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AtualizarMembroProjetoView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request, id): 
        try: 
            
            membroProjeto = MembroProjeto.objects.get(id=id) 
            
            serializer = MembroProjetoSerializer(membroProjeto, data=request.data)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
    
        except Exception as e: 
             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            

class ExcluirMembroProjetoOneView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, id):
        try:
            membroProjeto = MembroProjeto.objects.get(pk=id)
            
            if membroProjeto is not None: 
                membroProjeto.delete()
                return Response(
                    {'detail': 'Relacionamento entre membro e projeto excluído com sucesso!'}, 
                    status=status.HTTP_204_NO_CONTENT)
            
            else: 
                return Response({'error': 'Objeto não encontrado!'}, status=status.HTTP_404_NOT_FOUND)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  
        
class ExcluirMembroProjetoManyView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, idProjeto):
        try:
            # Obtenha a lista de IDs a partir dos parâmetros da solicitação
            ids_membros = request.data.get('ids_membros', [])

            if not ids_membros:
                return Response({'error': 'A lista de IDs de membros está vazia!'}, status=status.HTTP_400_BAD_REQUEST)

            objetos = MembroProjeto.objects.filter(projeto=idProjeto, membro__in=ids_membros)

            if objetos.exists():
                objetos.delete()
                return Response({'message': 'Objetos excluídos com sucesso!'}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({'error': 'Nenhum objeto encontrado para exclusão!'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class QuantidadeMembrosPorProjetoView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, id_projeto):
        try:
            # Utilizando a função aggregate para contar a quantidade de membros por projeto
            quantidade_membros = MembroProjeto.objects.filter(projeto__id=id_projeto).aggregate(quantidade_membros=Count('id'))

            # Verificando se o projeto existe
            if quantidade_membros is not None:
                return Response({'id_projeto': id_projeto, 'quantidade_membros': quantidade_membros['quantidade_membros']}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Projeto não encontrado!'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarMembrosPorProjeto(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id_projeto):
        try:
            membros_projeto = MembroProjeto.objects.filter(projeto_id=id_projeto)
            membros_info = []
            
            for membro_projeto in membros_projeto:
                membro = membro_projeto.membro
                usuario_github = membro.github.usuario_github
                
                try:
                    funcao = FuncaoMembroProjetoAtual.objects.get(membro_projeto=membro_projeto.id, ativo=True)
                    id_funcao_atual = funcao.id
                    id_funcao = funcao.funcao_membro.id
                    nome_funcao = funcao.funcao_membro.nome
                    data_inicio = funcao.data_inicio
                    data_termino = funcao.data_termino
                    ativo = funcao.ativo
                except FuncaoMembroProjetoAtual.DoesNotExist:
                    id_funcao_atual = None
                    id_funcao = None
                    nome_funcao = None
                    data_inicio = None
                    data_termino = None
                    ativo = None
                
                membros_info.append({
                    'id_membro_projeto': membro_projeto.id,
                    'id_projeto': membro_projeto.projeto.id,
                    'id_membro': membro.id,
                    'nome_membro': membro.nome,
                    'grupo_membro': membro.grupo,
                    'usuario_github': usuario_github,
                    'id_funcao_atual': id_funcao_atual,
                    'id_funcao': id_funcao,
                    'nome_funcao': nome_funcao,
                    'data_inicio': data_inicio,
                    'data_termino': data_termino,
                    'ativo': ativo
                })
            
            if not membros_info:
                return Response(data=[], status=status.HTTP_200_OK)
            
            return Response(data=membros_info, status=status.HTTP_200_OK)
  
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class CadastrarFuncaoMembroView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            funcoes = request.data.get('funcoes', [])
            serializer = FuncaoMembroProjetoSerializer(data=funcoes, many=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class CadastrarFuncaoAtualView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            membro_projeto_id = request.data.get('membro_projeto')
            funcao_ativa = FuncaoMembroProjetoAtual.objects.filter(membro_projeto_id=membro_projeto_id, ativo=True).first()
            
            if funcao_ativa:
                funcao_ativa.ativo = False
                funcao_ativa.save()
            
            serializer = FuncaoMembroProjetoAtualSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarFuncoesMembroView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            
            funcoes = FuncaoMembroProjeto.objects.all()
            
            if funcoes.exists():
                serializer = FuncaoMembroProjetoSerializer(funcoes, many=True) 
                return Response(serializer.data, status=status.HTTP_200_OK)   
            
            return Response(data=[], status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        