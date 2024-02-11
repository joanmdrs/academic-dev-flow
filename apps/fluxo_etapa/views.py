# from django.shortcuts import render
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from django.http import JsonResponse
# from .models import FluxoEtapa
# from .serializers import FluxoEtapaSerializer

# class CadastrarFluxoEtapaView(APIView):
#     def post(self, request):
#         try:
#             etapas_data = request.data.get('etapas', [])
#             serializer = FluxoEtapaSerializer(data=etapas_data, many=True)
#             if serializer.is_valid(raise_exception=True):
#                 serializer.save()
#                 return Response(serializer.data, status=status.HTTP_200_OK)
            
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# class BuscarFluxoEtapaPeloIdFluxoView(APIView): 
#     def get(self, request, idFluxo):
#         try: 
#             objetos = FluxoEtapa.objects.filter(fluxo=idFluxo)
            
#             if objetos is not None:
#                 serializer = FluxoEtapaSerializer(objetos, many=True)
#                 return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})

#             return Response({'error': 'Objeto não encontrado!'}, status=status.HTTP_404_NOT_FOUND)

#         except Exception as e: 
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# class AtualizarEtapaFluxoView(APIView):
#     def patch(self, request, id): 
#         try: 
            
#             fluxoEtapa = FluxoEtapa.objects.get(id=id) 
            
#             serializer = FluxoEtapaSerializer(fluxoEtapa, data=request.data)
            
#             if serializer.is_valid(raise_exception=True):
#                 serializer.save()
#                 return Response(serializer.data, status=status.HTTP_200_OK)
            
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
    
#         except Exception as e: 
#              return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            

# class ExcluirEtapaFluxoOneView(APIView):
#     def delete(self, request, id):
#         try:
#             fluxoEtapa = FluxoEtapa.objects.get(pk=id)
            
#             if fluxoEtapa is not None: 
#                 fluxoEtapa.delete()
#                 return Response(
#                     {'detail': 'Relacionamento entre fluxo e etapa excluído com sucesso!'}, 
#                     status=status.HTTP_204_NO_CONTENT)
            
#             else: 
#                 return Response({'error': 'Objeto não encontrado!'}, status=status.HTTP_404_NOT_FOUND)
            
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  
        
# class ExcluirEtapaFluxoManyView(APIView):
#     def delete(self, request, idFluxo):
#         try:
#             ids_etapas = request.data.get('ids_etapas', [])

#             if not ids_etapas:
#                 return Response({'error': 'A lista de IDs de etapas está vazia!'}, status=status.HTTP_400_BAD_REQUEST)

#             objetos = FluxoEtapa.objects.filter(fluxo=idFluxo, etapa__in=ids_etapas)

#             if objetos.exists():
#                 objetos.delete()
#                 return Response({'message': 'Objetos excluídos com sucesso!'}, status=status.HTTP_204_NO_CONTENT)
#             else:
#                 return Response({'error': 'Nenhum objeto encontrado para exclusão!'}, status=status.HTTP_404_NOT_FOUND)

#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)