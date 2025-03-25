from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Feedback
from .serializers import FeedbackSerializer
from rest_framework.permissions import IsAuthenticated

class CadastrarFeedbackView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            serializer = FeedbackSerializer(data=request.data, context={'request': request})
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AtualizarFeedbackView(APIView): 
    permission_classes = [IsAuthenticated]
    def patch(self, request):
        try: 
            id_feedback = request.GET.get('id_feedback', None)
            
            if not id_feedback:
                return Response({'error': 'O ID do feedback não foi fornecido'}, status=status.HTTP_400_BAD_REQUEST)
            
            feedback = Feedback.objects.get(id=id_feedback)
            
            if feedback:                
                serializer = FeedbackSerializer(feedback, data=request.data, partial=True)
    
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
            
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
            
        except Feedback.DoesNotExist:
            return Response({'error': 'Objeto feedback não localizado'}, status=status.HTTP_404_NOT_FOUND)
             
        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarFeedbackPeloIDView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            
            id_feedback = request.GET.get('id_feedback', None)
            if not id_feedback:
                return Response({'error': 'O ID do feedback não foi fornecido'}, status=status.HTTP_400_BAD_REQUEST)
                
            feedback = Feedback.objects.get(id=id_feedback)
            
            if feedback:
                serialiazer = FeedbackSerializer(feedback)
                return Response(serialiazer.data, status=status.HTTP_200_OK)
            
        except Feedback.DoesNotExist:
            return Response({'error': 'Objeto feedback não localizado'}, status=status.HTTP_404_NOT_FOUND)
                
        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarFeedbacksView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            feedbacks = Feedback.objects.all()
            
            serializer = FeedbackSerializer(feedbacks, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e: 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class FiltrarPorCreatedByView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            feedbacks = Feedback.objects.filter(created_by=request.user)
            
            serializer = FeedbackSerializer(feedbacks, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 

class ExcluirFeedbacksView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request): 
        try:
            ids_feedbacks = request.data.get('ids_feedbacks', [])
            
            if not ids_feedbacks:
                return Response({'error': 'Os IDs dos feedbacks não foram fornecidos!'}, status=status.HTTP_400_BAD_REQUEST)

            feedbacks = Feedback.objects.filter(id__in=ids_feedbacks)
            
            if feedbacks.exists():
                feedbacks.delete()
                return Response({'message': 'Feedbacks excluídas com sucesso !'}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({'error': 'Nenhum objeto encontrado para exclusão!'}, status=status.HTTP_404_NOT_FOUND)

        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
    
