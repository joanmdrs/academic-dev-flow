from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseNotAllowed, JsonResponse
from .models import Membro
from .serializers import MembroSerializer
from apps.usuario.models import Usuario
from apps.usuario.serializers import UsuarioSerializer
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import Group
from rest_framework.permissions import IsAuthenticated
from apps.api.permissions import IsAdminUserOrReadOnly 
from django.contrib.auth.hashers import make_password



class BaseMembroView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUserOrReadOnly]

    def handle_exception(self, exc):
        return Response({'error': str(exc)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
class CadastrarMembroView(BaseMembroView):
    def post(self, request):
        try:
            group_name = request.data.get('grupo', None) # Obtém o grupo
            user_data = request.data.get('usuario', {}) # Obtém os dados do usuário
            user_serializer = UsuarioSerializer(data=user_data)
            
            if user_serializer.is_valid(raise_exception=True):
                user_validated = user_serializer.validated_data
                user_created = Usuario.objects.create_user(
                    username=user_validated['username'],
                    password=user_validated['password'],
                )

                user_created.is_staff = True
                user_created.is_superuser = False
                user_created.save()
                
                if group_name:
                    group = Group.objects.get(name=group_name)
                    user_created.groups.add(group)

                member_data = request.data.get('membro', {})
                member_data['grupo'] = group_name
                member_data['usuario'] = user_created.id
                member_serializer = MembroSerializer(data=member_data)

                if member_serializer.is_valid(raise_exception=True):
                    member_serializer.save()
                    
                    return Response(member_serializer.data, status=status.HTTP_201_CREATED)
                
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'error': 'Erro ao cadastrar membro'}, status=status.HTTP_400_BAD_REQUEST)


class BuscarMembroPorGrupoView(BaseMembroView):
    def get(self, request):
        try:
            nome = request.query_params.get('nome', None)
            grupo = request.query_params.get('grupo', None)

            if grupo not in ['Alunos', 'Professores']:
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
        
class BuscarMembrosPorNomeView(BaseMembroView):
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

class BuscarMembroPorIdView(BaseMembroView):
    def get(self, request, id):
        try:
            membro = Membro.objects.get(pk=id)
            serializer = MembroSerializer(membro, many=False)
            
            return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class ExcluirMembroView(BaseMembroView):
    def delete(self, request, id):
        try:
            member = Membro.objects.get(pk=id)
            user = Usuario.objects.get(pk=member.usuario.id)
            
            if (member is not None and user is not None):
                user.delete()
                member.delete()
                return Response({"detail": "Membro excluído com sucesso"}, status=status.HTTP_204_NO_CONTENT);
            
            else:
                return JsonResponse({'error': 'Recurso não encontrado'}, status=404);
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
class AtualizarMembroView(BaseMembroView):
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

class ListarMembrosView(BaseMembroView): 
    def get(self, request):
        try: 
            membros = Membro.objects.all()
            
            serializer = MembroSerializer(membros, many=True)
            return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})   
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)