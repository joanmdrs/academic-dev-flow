from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Chat
from .serializers import ChatSerializer
from apps.membro_projeto.models import MembroProjeto
from rest_framework.permissions import IsAuthenticated

class CadastrarChatView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            serializer = ChatSerializer(data=request.data, context={'request': request})
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AtualizarChatView(APIView): 
    permission_classes = [IsAuthenticated]
    def patch(self, request):
        try: 
            id_chat = request.GET.get('id_chat', None)
            
            if not id_chat:
                return Response({'error': 'O ID do chat não foi fornecido'}, status=status.HTTP_400_BAD_REQUEST)
            
            chat = Chat.objects.get(id=id_chat)
            
            if chat:                
                serializer = ChatSerializer(chat, data=request.data, partial=True)
    
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
            
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
            
        except Chat.DoesNotExist:
            return Response({'error': 'Objeto chat não localizado'}, status=status.HTTP_404_NOT_FOUND)
             
        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarChatPeloIDView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            
            id_chat = request.GET.get('id_chat', None)
            if not id_chat:
                return Response({'error': 'O ID do chat não foi fornecido'}, status=status.HTTP_400_BAD_REQUEST)
                
            chat = Chat.objects.get(id=id_chat)
            
            if chat:
                serialiazer = ChatSerializer(chat)
                return Response(serialiazer.data, status=status.HTTP_200_OK)
            
        except Chat.DoesNotExist:
            return Response({'error': 'Objeto chat não localizado'}, status=status.HTTP_404_NOT_FOUND)
                
        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarChatsDosProjetosDoUsuarioView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            
            id_usuario = request.GET.get('id_usuario', None)
            
            if not id_usuario:
                return Response({'error': 'O ID do usuário não foi fornecido!'}, status=status.HTTP_400_BAD_REQUEST)
            
            objs_membro_projeto = MembroProjeto.objects.filter(membro=id_usuario)
            
            if not objs_membro_projeto.exists():
                return Response([], status=status.HTTP_200_OK)
            
            # Extrair os IDs dos projetos
            projetos_ids = objs_membro_projeto.values_list('projeto_id', flat=True)
            
            # Buscar os chats associados aos projetos
            chats = Chat.objects.filter(projeto_id__in=projetos_ids)

            # Serializar os dados
            serializer = ChatSerializer(chats, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
                
        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class FiltrarChatsPorProjetoView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            id_projeto = request.GET.get('id_projeto', None)
            chats = Chat.objects.filter(projeto=id_projeto)
            
            serializer = ChatSerializer(chats, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
        
class ListarChatsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            chats = Chat.objects.all()
            
            serializer = ChatSerializer(chats, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ExcluirChatView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request): 
        try:
            id_chat = request.GET.get('id_chat', [])
            
            if not id_chat:
                return Response({'error': 'Os ID do chat não foi fornecido!'}, status=status.HTTP_400_BAD_REQUEST)

            chat = Chat.objects.get(id=id_chat)
            
            if chat:
                chat.delete()
                return Response({'message': 'Chat excluído com sucesso !'}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({'error': 'Nenhum objeto encontrado para exclusão!'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 