from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
from .models import Membro
from .serializers import MembroSerializer, GroupSerializer
from apps.membro_projeto.models import MembroProjeto
from apps.usuario.models import Usuario
from apps.usuario.serializers import UsuarioSerializer
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import Group
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import AllowAny
from django.contrib.auth.hashers import check_password
import json

class CadastrarMembroView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        try:
            # Extrai os dados do FormData (assumindo que os dados JSON foram enviados como strings)
            user_data = request.data.get('usuario', {})
            member_data = request.data.get('membro', {})

            # Verifica se os dados do usuário foram fornecidos
            if not user_data:
                return Response({'error': 'Dados do usuário não fornecidos'}, status=status.HTTP_400_BAD_REQUEST)

            # Verifica se o nome de usuário já existe
            if Usuario.objects.filter(username=user_data.get('username')).exists():
                return Response({'error': 'O nome de usuário já está sendo utilizado!'}, status=status.HTTP_409_CONFLICT)

            # Serializa os dados do usuário
            user_serializer = UsuarioSerializer(data=user_data)
            if not user_serializer.is_valid():
                return Response({'error': 'Dados do usuário inválidos'}, status=status.HTTP_400_BAD_REQUEST)

            # Cria o usuário
            user_created = Usuario.objects.create_user(
                username=user_serializer.validated_data['username'],
                password=user_serializer.validated_data['password'],
            )
            user_created.is_staff = False
            user_created.is_superuser = False
            user_created.save()

            # Verifica se o grupo foi fornecido e existe
            if 'grupo' in member_data and member_data['grupo']:
                try:
                    group = Group.objects.get(id=member_data['grupo'])
                    user_created.groups.add(group)
                except Group.DoesNotExist:
                    return Response({'error': 'Grupo não encontrado!'}, status=status.HTTP_404_NOT_FOUND)
            # Relaciona o membro com o usuário criado
            member_data['usuario'] = user_created.id
            
            # Serializa e salva o membro
            member_serializer = MembroSerializer(data=member_data)
            if not member_serializer.is_valid():
                user_created.delete()  # Remove o usuário criado em caso de erro na serialização do membro
                return Response({'error': 'Dados do membro inválidos'}, status=status.HTTP_400_BAD_REQUEST)

            member_serializer.save()

            return Response(member_serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            # Se algo der errado, exclui o usuário criado para evitar dados inconsistentes
            if user_created:
                user_created.delete()
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
class BuscarMembroPorIdView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            id_membro = request.GET.get('id_membro', None)
            
            # Verifica se o ID do membro foi fornecido
            if not id_membro:
                return Response({'error': 'ID do membro não fornecido'}, status=status.HTTP_400_BAD_REQUEST)
            
            membro = Membro.objects.get(pk=id_membro)
            
            serializer = MembroSerializer(membro, many=False)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class BuscarMembrosPorNomeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            parametro = request.GET.get('nome', None)
                        
            if parametro is not None: 
                membros = Membro.objects.filter(nome__icontains=parametro)
            else:
                membros = Membro.objects.all()
                
            if not membros: 
                return Response({'message': 'Nenhum membro encontrado.', 'results': []}, status=status.HTTP_200_OK)
            
            serializer = MembroSerializer(membros, many=True)
        
            return Response({'message': 'Membros encontrados com sucesso.', 'results': serializer.data}, status=status.HTTP_200_OK)
                
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class BuscarMembroPorGrupoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            # Obtém os IDs dos grupos como uma string (exemplo: "1,2,3")
            grupos_ids_str = request.GET.get('grupos_ids', '')

            if not grupos_ids_str:
                return Response({'error': 'Parâmetro grupos_ids não fornecido!'}, status=status.HTTP_400_BAD_REQUEST)

            # Converte a string em uma lista de inteiros
            try:
                grupos_ids = [int(id.strip()) for id in grupos_ids_str.split(',') if id.strip().isdigit()]
            except ValueError:
                return Response({'error': 'IDs dos grupos devem ser números inteiros!'}, status=status.HTTP_400_BAD_REQUEST)

            if not grupos_ids:
                return Response({'error': 'Nenhum ID de grupo válido fornecido!'}, status=status.HTTP_400_BAD_REQUEST)

            # Filtra os grupos pelos IDs
            grupos = Group.objects.filter(id__in=grupos_ids)

            if not grupos.exists():
                return Response({'error': 'Nenhum grupo encontrado com os IDs fornecidos!'}, status=status.HTTP_404_NOT_FOUND)

            # Busca membros cujos usuários pertencem a esses grupos
            membros = Membro.objects.filter(usuario__groups__in=grupos).distinct()

            serializer = MembroSerializer(membros, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
class BuscarMembroPorIdUsuarioView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            id_usuario = request.GET.get('id_usuario', None)
            
            # Verifica se o ID do usuário foi fornecido
            if not id_usuario:
                return Response({'error': 'ID do usuário não fornecido'}, status=status.HTTP_400_BAD_REQUEST)

            # Busca o membro pelo ID do usuário
            membro = Membro.objects.get(usuario_id=id_usuario)
            
            serializer = MembroSerializer(membro)
                
            return Response(serializer.data, status=status.HTTP_200_OK)
                    
        except Membro.DoesNotExist:
            return Response({'error': 'Membro não encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Avaliar se tem necessidade desta view
class BuscarUsuarioPorIdMembroProjeto(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id_membro_projeto):
        try:
            membro_projeto = MembroProjeto.objects.get(pk=id_membro_projeto)
            membro = Membro.objects.get(pk=membro_projeto.membro_id)
            usuario_github = UsuarioGithub.objects.get(pk=membro.github_id)
            
            serializer = UsuarioGithubSerializer(usuario_github)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
             
        except MembroProjeto.DoesNotExist:
            return Response({'error': 'MembroProjeto não encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        except Membro.DoesNotExist:
            return Response({'error': 'Membro não encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        except UsuarioGithub.DoesNotExist:
            return Response({'error': 'Usuário Github não encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class ExcluirMembroView(APIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request):
        try:
            ids_membros = request.data.get('ids_membros', [])

            if not ids_membros:
                return Response({'error': 'O IDs das membros não foram fornecidos'}, status=status.HTTP_400_BAD_REQUEST)
                
            membros = Membro.objects.filter(id__in=ids_membros)
            
            if membros.exists():
                # Obtendo os usuários associados aos membros
                ids_usuarios = membros.values_list('usuario_id', flat=True)
                
                # Excluindo os usuários antes dos membros
                Usuario.objects.filter(id__in=ids_usuarios).delete()
                
                # Excluindo os membros
                membros.delete()
                return Response({"detail": "Membros excluídos com sucesso"}, status=status.HTTP_204_NO_CONTENT)
            
            return Response({'error': 'Um ou mais membros não foram encontrados'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
class AtualizarMembroView(APIView):
    permission_classes = [IsAuthenticated]
    
    def patch(self, request):
        try:
            id_membro = request.GET.get('id_membro', None)
            obj_membro = Membro.objects.get(pk=id_membro)

            member_data = request.data.get('membro', {})
            if not member_data:
                raise ValueError("Dados do membro não fornecidos")
            
            member_serializer = MembroSerializer(obj_membro, data=member_data, partial=True)

            if not member_serializer.is_valid():
                return Response({'error': 'Dados do membro inválidos'}, status=status.HTTP_400_BAD_REQUEST)

            member_serializer.save()

            user = Usuario.objects.get(id=obj_membro.usuario_id)
            user_data = request.data.get('usuario', {})
            if not user_data:
                raise ValueError("Dados do usuário não fornecidos")

            user_serializer = UsuarioSerializer(user, data=user_data)

            if not user_serializer.is_valid():
                return Response({'error': 'Dados do usuário inválidos'}, status=status.HTTP_400_BAD_REQUEST)

            user_validated = user_serializer.validated_data
            user.username = user_validated.get('username', user.username)
            new_password = user_validated.get('password')
            
            if new_password != user.password:
                user.set_password(new_password)
                
            user.save()

            if member_data['grupo']:
                group = Group.objects.get(id=member_data['grupo'])
                user.groups.set([group])

            return Response(member_serializer.data, status=status.HTTP_200_OK)

        except ValueError as ve:
            return Response({'error': str(ve)}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarMembrosView(APIView):
    permission_classes = [IsAuthenticated] 
    def get(self, request):
        try: 
            membros = Membro.objects.all()
            
            if membros.exists():        
                serializer = MembroSerializer(membros, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response({'error': 'Membro não encontrados!'}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarMembrosPorListaIdsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            ids_membros = request.GET.getlist('ids[]', [])
            membros = Membro.objects.filter(id__in=ids_membros)
            
            if not membros:
                return Response({'message': 'Nenhum membro encontrado.', 'results': []}, status=status.HTTP_200_OK)
            
            serializer = MembroSerializer(membros, many=True)
            return Response({'message': 'Membros encontrados com sucesso.', 'results': serializer.data}, status=status.HTTP_200_OK)
  
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ListarGruposView(APIView): 
    permission_classes = [AllowAny]
    authentication_classes = []
    
    def get(self, request): 
        try: 
            grupos = Group.objects.all()

            grupo_serializer = GroupSerializer(grupos, many=True)

            return Response(grupo_serializer.data, status=status.HTTP_200_OK)
            
        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)