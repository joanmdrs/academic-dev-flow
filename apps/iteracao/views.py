from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
from .models import Iteracao
from django.shortcuts import get_object_or_404
from .models import Iteracao
from .serializers import IteracaoSerializer
from apps.projeto.models import Projeto
from apps.fluxo_etapa.models import FluxoEtapa
from apps.etapa.models import Etapa
from apps.membro_projeto.models import MembroProjeto
from apps.membro_projeto.models import FuncaoMembroProjetoAtual, FuncaoMembroProjeto
from apps.membro_projeto.serializers import FuncaoMembroProjetoAtualSerializer
from apps.membro.models import Membro
from rest_framework.permissions import IsAuthenticated
    
class CadastrarIteracaoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Validar entrada
            id_lider = request.data.get('lider')
            if id_lider is None:
                return Response({'error': 'ID do líder não fornecido'}, status=status.HTTP_400_BAD_REQUEST)

            # Criar função de membro do projeto
            membro_projeto = MembroProjeto.objects.get(id=id_lider)
            self.desativar_funcao_atual(membro_projeto)

            funcao_lider = FuncaoMembroProjeto.objects.get(nome='Líder de Projeto')
            dados_funcao_atual = {
                'membro_projeto': membro_projeto.id,
                'funcao_membro': funcao_lider.id,
                'data_inicio': request.data.get('data_inicio'),
                'data_termino': request.data.get('data_termino')
            }
            serializer_funcao = FuncaoMembroProjetoAtualSerializer(data=dados_funcao_atual)
            serializer_funcao.is_valid(raise_exception=True)
            serializer_funcao.save()

            # Serializar e salvar iteração
            serializer_iteracao = IteracaoSerializer(data=request.data)
            serializer_iteracao.is_valid(raise_exception=True)
            serializer_iteracao.save()
            
            return Response(serializer_iteracao.data, status=status.HTTP_200_OK)
        
        except MembroProjeto.DoesNotExist:
            return Response({'error': 'Membro do projeto não encontrado'}, status=status.HTTP_400_BAD_REQUEST)
        
        except FuncaoMembroProjeto.DoesNotExist:
            return Response({'error': 'Função do membro do projeto não encontrada'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def desativar_funcao_atual(self, membro_projeto):
        funcao_ativa = FuncaoMembroProjetoAtual.objects.filter(membro_projeto_id=membro_projeto.id, ativo=True).first()
        if funcao_ativa:
            funcao_ativa.ativo = False
            funcao_ativa.save()

class ListarIteracoesPorProjetoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id_projeto):
        try:
            iteracoes = Iteracao.objects.filter(projeto=id_projeto)
            iteracoes_info = []
            
            if iteracoes:
                for iteracao in iteracoes:
                    try:
                        lider = MembroProjeto.objects.get(id=iteracao.lider_id)
                        membro = Membro.objects.get(id=lider.membro_id)
                        fase = FluxoEtapa.objects.get(id=iteracao.fase_id)
                        etapa = Etapa.objects.get(id=fase.etapa_id)
                        
                        iteracoes_info.append({
                            'id': iteracao.id,
                            'nome': iteracao.nome,
                            'descricao': iteracao.descricao,
                            'numero': iteracao.numero,
                            'data_inicio': iteracao.data_inicio,
                            'data_termino': iteracao.data_termino,
                            'status': iteracao.status,
                            'projeto': iteracao.projeto_id,
                            'lider': lider.id,
                            'id_membro': membro.id,
                            'nome_membro': membro.nome,
                            'fase': fase.id,
                            'id_etapa': etapa.id,
                            'nome_etapa': etapa.nome,
                        })
                    except (MembroProjeto.DoesNotExist, Membro.DoesNotExist, FluxoEtapa.DoesNotExist, Etapa.DoesNotExist) as e:
                        # Tratamento de exceção para objetos não encontrados
                        # Você pode definir um valor padrão ou retornar uma resposta indicando o erro
                        iteracoes_info.append({
                            'id': iteracao.id,
                            'nome': iteracao.nome,
                            'descricao': iteracao.descricao,
                            'numero': iteracao.numero,
                            'data_inicio': iteracao.data_inicio,
                            'data_termino': iteracao.data_termino,
                            'status': iteracao.status,
                            'projeto': iteracao.projeto_id,
                            'lider': None,
                            'id_membro': None,
                            'nome_membro': None,
                            'fase': None,
                            'id_etapa': None,
                            'nome_etapa': None,
                            'error': str(e)  # Adiciona uma chave 'error' com a mensagem de erro
                        })
                    
                return Response(data=iteracoes_info, status=status.HTTP_200_OK)
            
            return Response(data=[], status=status.HTTP_204_NO_CONTENT)
                    
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
class AtualizarIteracaoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def patch(self, request, id): 
        try:
            iteracao = Iteracao.objects.get(pk=id)
            
            lider = request.data.get('lider')
            
            if lider != iteracao.lider.id:
                # Se o líder da iteração foi alterado, desativar a função atual do líder
                membro_projeto = MembroProjeto.objects.get(id=lider)
                self.desativar_funcao_atual(membro_projeto)

                # Criar nova função para o novo líder
                funcao_lider = FuncaoMembroProjeto.objects.get(nome='Líder de Projeto')
                dados_funcao_atual = {
                    'membro_projeto': membro_projeto.id,
                    'funcao_membro': funcao_lider.id,
                    'data_inicio': request.data.get('data_inicio'),
                    'data_termino': request.data.get('data_termino')
                }
                serializer_funcao = FuncaoMembroProjetoAtualSerializer(data=dados_funcao_atual)
                serializer_funcao.is_valid(raise_exception=True)
                serializer_funcao.save()
                
            # Atualizar a iteração
            serializer = IteracaoSerializer(iteracao, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Iteracao.DoesNotExist:
            return Response({'error': 'Iteração não encontrada'}, status=status.HTTP_404_NOT_FOUND)
        
        except MembroProjeto.DoesNotExist:
            return Response({'error': 'Membro do projeto não encontrado'}, status=status.HTTP_400_BAD_REQUEST)
        
        except FuncaoMembroProjeto.DoesNotExist:
            return Response({'error': 'Função do membro do projeto não encontrada'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def desativar_funcao_atual(self, membro_projeto):
        # Desativar a função atual do membro do projeto
        funcao_ativa = FuncaoMembroProjetoAtual.objects.filter(membro_projeto_id=membro_projeto.id, ativo=True).first()
        if funcao_ativa:
            funcao_ativa.ativo = False
            funcao_ativa.save()

class ExcluirIteracaoView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        try:
            ids_iteracoes = request.GET.getlist('ids[]', [])

            if not ids_iteracoes:
                return Response({'error': 'IDs das iterações a serem excluídas não fornecidos'}, status=status.HTTP_400_BAD_REQUEST)

            iteracoes = Iteracao.objects.filter(id__in=ids_iteracoes)

            if not iteracoes.exists():
                return JsonResponse({'error': 'Nenhuma iteração encontrada com os IDs fornecidos'}, status=status.HTTP_404_NOT_FOUND)

            iteracoes.delete()

            return Response({"detail": "Iterações excluídas com sucesso"}, status=status.HTTP_204_NO_CONTENT)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class BuscarIteracaoPeloId(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id):
        try:
            iteracao = Iteracao.objects.get(pk=id)
            
            if iteracao:
                serializer = IteracaoSerializer(iteracao, many=False)
                return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarIteracoesView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            
            iteracoes = Iteracao.objects.all()
            
            if iteracoes.exists():
                serializer = IteracaoSerializer(iteracoes, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(data=[], status=status.HTTP_204_NO_CONTENT)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class FiltrarIteracoesPeloNomeEPeloProjeto(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            nome = request.GET.get('nome_iteracao')
            projeto = request.GET.get('id_projeto')
            
            if not nome and not projeto:
                return Response({'error': 'Pelo menos um parâmetro é necessário'}, status=status.HTTP_400_BAD_REQUEST)
            
            if nome and projeto:
                iteracoes = Iteracao.objects.filter(nome__icontains=nome, projeto_id=projeto)
            elif nome:
                iteracoes = Iteracao.objects.filter(nome__icontains=nome)
            else: 
                iteracoes = Iteracao.objects.filter(projeto_id=projeto)
                
            if iteracoes.exists():
                
                serializer = IteracaoSerializer(iteracoes, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(data=[], status=status.HTTP_204_NO_CONTENT)
                
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  