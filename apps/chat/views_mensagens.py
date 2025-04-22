from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Mensagem
from .serializers import MensagemSerializer
from rest_framework.permissions import IsAuthenticated

class CadastrarMensagemView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            serializer = MensagemSerializer(data=request.data, context={'request': request})
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AtualizarMensagemView(APIView): 
    permission_classes = [IsAuthenticated]
    def patch(self, request):
        try: 
            id_mensagem = request.GET.get('id_mensagem', None)
            
            if not id_mensagem:
                return Response({'error': 'O ID da mensagem não foi fornecido'}, status=status.HTTP_400_BAD_REQUEST)
            
            mensagem = Mensagem.objects.get(id=id_mensagem)
            
            if mensagem:                
                serializer = MensagemSerializer(mensagem, data=request.data, partial=True)
    
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
            
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
            
        except Mensagem.DoesNotExist:
            return Response({'error': 'Objeto mensagem não localizado'}, status=status.HTTP_404_NOT_FOUND)
             
        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarMensagemPorIdView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            id_mensagem = request.GET.get('id_mensagem', None)
            
            if not id_mensagem:
                return Response({'error': 'O ID da mensagem não foi fornecido!'}, status=status.HTTP_400_BAD_REQUEST)
            
            mensagem = Mensagem.objects.get(id=id_mensagem)
            
            if mensagem:
                serialiazer = MensagemSerializer(mensagem)
                return Response(serialiazer.data, status=status.HTTP_200_OK)
            
        except Mensagem.DoesNotExist:
            return Response({'error': 'Objeto mensagem não localizado'}, status=status.HTTP_404_NOT_FOUND)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 

class FiltrarMensagensPorChatView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            id_chat = request.GET.get('id_chat', None)
            
            if not id_chat:
                return Response({'error': 'O ID do chat não foi fornecido!'}, status=status.HTTP_400_BAD_REQUEST)
            
            mensagens = Mensagem.objects.filter(chat=id_chat).order_by('enviado_em')
            serializer = MensagemSerializer(mensagens, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
        
class ExcluirMensagemView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request):
        try:
            id_mensagem = request.GET.get('id_mensagem', None)
            
            if not id_mensagem:
                return Response({'error': 'O ID da mensagem não foi fornecido!'}, status=status.HTTP_400_BAD_REQUEST)
            
            mensagem = Mensagem.objects.get(id=id_mensagem)
            
            if mensagem.exists():
                mensagem.delete()
                return Response({'message': 'Mensagem excluída com sucesso !'}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({'error': 'Nenhum objeto encontrado para exclusão!'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 