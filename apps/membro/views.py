from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
from .models import Membro
from .serializers import MembroSerializer
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


class CadastrarMembroView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            group_name = request.data.get('grupo')
            user_data = request.data.get('usuario', {}) 
            member_data = request.data.get('membro', {})
            
            # Verifica se o username já existe
            if Usuario.objects.filter(username=user_data.get('username')).exists():
                return Response({'error': 'O nome de usuário já está sendo utilizado!'}, status=status.HTTP_409_CONFLICT)

            if not user_data:
                raise ValueError("Dados do usuário não fornecidos")

            # Serializa os dados do usuário
            user_serializer = UsuarioSerializer(data=user_data)
            if not user_serializer.is_valid():
                return Response({'error': 'Dados do usuário inválidos'}, status=status.HTTP_400_BAD_REQUEST)

            # Cria o usuário
            user_created = Usuario.objects.create_user(
                username=user_serializer.validated_data['username'],
                password=user_serializer.validated_data['password'],
            )
            user_created.is_staff = True
            user_created.is_superuser = False
            user_created.save()

            # Adiciona o usuário ao grupo, se o grupo for fornecido
            group = None
            if group_name:
                group = Group.objects.filter(name=group_name).first()
                if not group:
                    return Response({'error': 'Grupo não encontrado!'}, status=status.HTTP_404_NOT_FOUND)
                user_created.groups.add(group)

            # Adiciona os dados necessários ao membro
            member_data['usuario'] = user_created.id  # Relaciona o membro com o usuário criado
            
            if group:
                member_data['grupo'] = group.id  # Relaciona o membro ao grupo através do ID do grupo

            # Serializa e salva o membro
            member_serializer = MembroSerializer(data=member_data)
            if not member_serializer.is_valid():
                user_created.delete()  # Remove o usuário criado em caso de erro na serialização do membro
                return Response({'error': 'Dados do membro inválidos'}, status=status.HTTP_400_BAD_REQUEST)

            member_serializer.save()

            return Response(member_serializer.data, status=status.HTTP_201_CREATED)

        except ValueError as ve:
            if user_created:
                user_created.delete()  # Remove o usuário criado em caso de erro
            return Response({'error': str(ve)}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            if user_created:
                user_created.delete()  # Remove o usuário criado em caso de erro
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
            nome = request.query_params.get('nome', None)
            group_member = request.query_params.get('grupo', None)  # Corrigido para usar 'grupo'

            if not group_member:
                return Response({'error': 'Parâmetro grupo não fornecido!'}, status=status.HTTP_400_BAD_REQUEST)

            # Busca o grupo pelo nome
            group_name = Group.objects.filter(name=group_member).first()
            
            if not group_name:
                return Response({'error': 'Grupo não encontrado!'}, status=status.HTTP_404_NOT_FOUND)

            # Busca todos os membros
            membros = Membro.objects.all()

            # Filtra por nome, se fornecido
            if nome:
                membros = membros.filter(nome__icontains=nome)

            # Filtra pelo grupo
            membros = membros.filter(grupo=group_name)

            # Serializa os resultados
            serializer = MembroSerializer(membros, many=True)

            return Response({'message': 'Membros encontrados com sucesso.', 'results': serializer.data}, status=status.HTTP_200_OK)
        
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
            
            if membro:
                # Obtém o nome do grupo
                group_name = membro.grupo.name if membro.grupo else None
                
                # Serializa o membro
                serializer = MembroSerializer(membro)
                
                # Adiciona o nome do grupo à resposta
                data = serializer.data
                data['nome_grupo'] = group_name
                
                return Response(data, status=status.HTTP_200_OK)
            
            return Response({'error': 'Membro não encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
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
            id_membro = request.GET.get('id_membro', None)
            
            # Verifica se o ID do membro foi fornecido
            if not id_membro:
                return Response({'error': 'ID do membro não fornecido'}, status=status.HTTP_400_BAD_REQUEST)
            
            obj_membro = Membro.objects.get(pk=id_membro)
            obj_usuario = Usuario.objects.get(pk=obj_membro.usuario.id)
            
            if (obj_membro is not None and obj_usuario is not None):
                obj_usuario.delete()
                obj_membro.delete()
                return Response({"detail": "Membro excluído com sucesso"}, status=status.HTTP_204_NO_CONTENT)
            
            else:
                return JsonResponse({'error': 'Recurso não encontrado'}, status=status.HTTP_404_NOT_FOUND)
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
            
            serializer = MembroSerializer(membros, many=True)
            return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})   
        
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
        