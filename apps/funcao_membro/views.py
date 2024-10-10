from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.db.models import ProtectedError
from apps.membro_projeto.models import MembroProjeto
from apps.membro_projeto.serializers import MembroProjetoSerializer
from apps.membro.models import Membro
from apps.projeto.models import Projeto
from .models import CategoriaFuncaoMembro, FuncaoMembro
from .serializers import CategoriaFuncaoMembroSerializer, FuncaoMembroSerializer
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 
from django.core.exceptions import ObjectDoesNotExist

class CadastrarCategoriaFuncaoMembroView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            categoria_funcao_membro = request.data
            
            serializer = CategoriaFuncaoMembroSerializer(data=categoria_funcao_membro)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AtualizarCategoriaFuncaoMembroView(APIView): 
    permission_classes = [IsAuthenticated]
    def patch(self, request): 
        try:
            id_categoria = request.GET.get('id_categoria', None)
            data_categoria = request.data
            
            if not id_categoria: 
                return Response({'error': 'ID da categoria não fornecido'}, status=status.HTTP_400_BAD_REQUEST)
            
            if not data_categoria: 
                return Response({'error': 'Os dados atualizados da categoria não foram fornecidos'}, status=status.HTTP_400_BAD_REQUEST)
            
            obj_categoria = CategoriaFuncaoMembro.objects.get(id=id_categoria)
            
            categoria_serializer = CategoriaFuncaoMembroSerializer(obj_categoria, data=data_categoria, partial=True)
            
            if not categoria_serializer.is_valid(): 
                return Response({'error': 'Dados da categoria são inválidos!'}, status=status.HTTP_400_BAD_REQUEST)
            
            categoria_serializer.save()
            
            return Response(categoria_serializer.data, status=status.HTTP_200_OK)
        
        except CategoriaFuncaoMembro.DoesNotExist:
            return Response({'error': 'Objeto CategoriaFuncaoMembro não encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarCategoriaFuncaoMembroPeloNomeView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request): 
        try:
            nome_categoria = request.GET.get('nome_categoria', None)
            
            if nome_categoria: 
                objs_categoria = CategoriaFuncaoMembro.objects.filter(nome__icontains=nome_categoria)
            else: 
                objs_categoria = CategoriaFuncaoMembro.objects.all()
                
            if not objs_categoria: 
                return Response({'message': 'Nenhum objeto encontrado.', 'results': []}, status=status.HTTP_200_OK)
            
            serializer = CategoriaFuncaoMembroSerializer(objs_categoria, many=True)
        
            return Response({'message': 'Membros encontrados com sucesso.', 'results': serializer.data}, status=status.HTTP_200_OK)
            
        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarCategoriaFuncaoMembroPeloIdView(APIView): 
    permission_classes = [IsAuthenticated]
    def get(self, request): 
        try: 
            id_categoria = request.GET.get('id_categoria', None)
            
            if not id_categoria: 
                return Response({'error': 'O ID da categoria não foi fornecido'}, status=status.HTTP_400_BAD_REQUEST)
            
            obj_categoria = CategoriaFuncaoMembro.objects.get(id=id_categoria)
            
            if obj_categoria: 
                serializer = CategoriaFuncaoMembroSerializer(obj_categoria, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response({'error': 'Objeto não encontrado !'}, status=status.HTTP_404_NOT_FOUND)
            
        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarCategoriaFuncaoMembroView(APIView): 
    permission_classes = [IsAuthenticated] 
    
    def get(self, request): 
        try: 
            objs_categoria = CategoriaFuncaoMembro.objects.all()
            
            serializer = CategoriaFuncaoMembroSerializer(objs_categoria, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ExcluirCategoriaFuncaoMembroView(APIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request):
        try:
            ids_categoria = request.data.get('ids_categoria', [])

            if not ids_categoria:
                return Response({'error': 'Os Ids das categorias não foram fornecidos!'}, status=status.HTTP_400_BAD_REQUEST)

            objs_categoria = CategoriaFuncaoMembro.objects.filter(id__in=ids_categoria)

            if not objs_categoria.exists():
                return Response({'error': 'Nenhum objeto encontrado com os IDs fornecidos'}, status=status.HTTP_404_NOT_FOUND)

            objs_categoria.delete()

            return Response({'message': 'Objetos excluídos com sucesso'}, status=status.HTTP_204_NO_CONTENT)

        except ProtectedError as e:
            return Response(
                {'error': 'Não é possível excluir uma ou mais categorias, pois elas estão associadas a uma ou mais funções de membros existentes.'},
                status=status.HTTP_409_CONFLICT
            )

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class CadastrarFuncaoMembroProjetoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            serializer = FuncaoMembroSerializer(data=request.data)
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except IntegrityError as e:
            if 'unique_funcao_membro' in str(e):
                return Response({'error': 'Este membro já possui essa função atribuída.'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'Erro de integridade no banco de dados.'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarFuncaoMembroProjetoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            id_membro_projeto = request.GET.get('id_membro_projeto', None)
            
            if not id_membro_projeto:
                return Response({'error': 'O ID do MembroProjeto não foi fornecido!'}, status=status.HTTP_400_BAD_REQUEST)
            
            objs_funcao_membro = FuncaoMembro.objects.filter(membro_projeto=id_membro_projeto)
            
            if objs_funcao_membro.exists():
                serializer = FuncaoMembroSerializer(objs_funcao_membro, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(
                {'error': 'Não existem funções vinculadas ao ID do MembroProjeto fornecido !'}, 
                status=status.HTTP_404_NOT_FOUND)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ExcluirFuncaoMembroProjetoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request):
        try:
            id_funcao_membro_projeto = request.GET.get('id_funcao_membro_projeto', None)
            
            if not id_funcao_membro_projeto:
                return Response({'error': 'O ID da FuncaoMembro não foi fornecido'}, status=status.HTTP_400_BAD_REQUEST)
            
            funcao_membro_projeto = FuncaoMembro.objects.get(id=id_funcao_membro_projeto)
            
            if funcao_membro_projeto:
                funcao_membro_projeto.delete()
                return Response({"detail": "Objeto FuncaoMembro excluído com sucesso"}, status=status.HTTP_204_NO_CONTENT)
                
            return Response({'error': 'O objeto FuncaoMembro não foi encontrado!'}, status=status.HTTP_404_NOT_FOUND)
                    
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)