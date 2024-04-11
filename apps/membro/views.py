from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
from .models import Membro, UsuarioGithub
from .serializers import MembroSerializer, UsuarioGithubSerializer
from apps.membro_projeto.models import MembroProjeto
from apps.usuario.models import Usuario
from apps.usuario.serializers import UsuarioSerializer
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import Group
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import AllowAny

   
    
class CadastrarMembroView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            group_name = request.data.get('grupo')
            user_data = request.data.get('usuario', {}) 
            github_data = request.data.get('github', {})
            member_data = request.data.get('membro', {})

            if not user_data:
                raise ValueError("Dados do usuário não fornecidos")

            user_serializer = UsuarioSerializer(data=user_data)
            if not user_serializer.is_valid(raise_exception=True):
                return Response({'error': 'Dados do usuário inválidos'}, status=status.HTTP_400_BAD_REQUEST)

            user_created = Usuario.objects.create_user(
                username=user_serializer.validated_data['username'],
                password=user_serializer.validated_data['password'],
            )
            user_created.is_staff = True
            user_created.is_superuser = False
            user_created.save()

            if not github_data:
                raise ValueError("Dados do GitHub não fornecidos")

            github_serializer = UsuarioGithubSerializer(data=github_data)
            if not github_serializer.is_valid(raise_exception=True):
                return Response({'error': 'Dados do GitHub inválidos'}, status=status.HTTP_400_BAD_REQUEST)

            github_created = github_serializer.save()

            if group_name:
                group = Group.objects.get(name=group_name)
                user_created.groups.add(group)

            member_data['grupo'] = group_name
            member_data['usuario'] = user_created.id
            member_data['github'] = github_created.id

            member_serializer = MembroSerializer(data=member_data)
            if not member_serializer.is_valid(raise_exception=True):
                return Response({'error': 'Dados do membro inválidos'}, status=status.HTTP_400_BAD_REQUEST)

            member_serializer.save()

            return Response(member_serializer.data, status=status.HTTP_201_CREATED)

        except ValueError as ve:
            return Response({'error': str(ve)}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

class BuscarMembroPorGrupoView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            nome = request.query_params.get('nome', None)
            grupo = request.query_params.get('grupo', None)

            if grupo not in ['Discentes', 'Docentes']:
                return Response({"error": "Grupo inválido"}, status=status.HTTP_400_BAD_REQUEST)

            membros = Membro.objects.all()

            if nome:
                membros = membros.filter(nome__icontains=nome)

            if grupo:
                membros = membros.filter(grupo=grupo)

            serializer = MembroSerializer(membros, many=True)

            return Response({'message': 'Membros encontrados com sucesso.', 'results': serializer.data}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarMembrosPorNomeView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            parametro = request.GET.get('name', None)
            
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
        
class BuscarMembroPeloUserView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id_user):
        try:
            membro = Membro.objects.get(usuario_id=id_user)
           
            
            if membro: 
                membro_projeto = MembroProjeto.objects.get(membro_id=membro.id)
                
                if membro_projeto: 
                    autor = {
                        'id_membro': membro.id,
                        'id_membro_projeto': membro_projeto.id,
                        'nome': membro.nome,
                    }
                    
                    return Response(autor, status=status.HTTP_200_OK)
                
                return Response({'error': 'Este membro não está vinculado a nenhum projeto'}, status=status.HTTP_404_NOT_FOUND)

                
            return Response({'error': 'Membro não encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BuscarMembroPorIdView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, id):
        try:
            membro = Membro.objects.get(pk=id)
            serializer = MembroSerializer(membro, many=False)
            
            return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class ExcluirMembroView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, id):
        try:
            member = Membro.objects.get(pk=id)
            user = Usuario.objects.get(pk=member.usuario.id)
            
            if (member is not None and user is not None):
                user.delete()
                member.delete()
                return Response({"detail": "Membro excluído com sucesso"}, status=status.HTTP_204_NO_CONTENT)
            
            else:
                return JsonResponse({'error': 'Recurso não encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
class AtualizarMembroView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request, id):
        try:
            group_name = request.data.get('grupo', None)
            member = Membro.objects.get(pk=id)
            member_data = request.data.get('membro', {})
            member_data['grupo'] = group_name
            member_serializer = MembroSerializer(member, data=member_data)
            
            if member_serializer.is_valid(raise_exception=True):
                member_serializer.save()

                user_data = request.data.get('usuario', {})
                user = Usuario.objects.get(id=member.usuario.id)
                user_serializer = UsuarioSerializer(user, data=user_data)

                if user_serializer.is_valid(raise_exception=True):
                    user_validated = user_serializer.validated_data
                    user.username = user_validated['username']
                    new_password = user_validated.get('password')
                    if new_password:
                        user.set_password(new_password)

                    user.save()
                    

                    if group_name:
                        group = Group.objects.get(name=group_name)
                        user.groups.set([group])
                        
                return Response(member_serializer.data, status=status.HTTP_200_OK)

            else: 
                return JsonResponse({'error': 'Dados inválidos'}, status=400)
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
        