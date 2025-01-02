from django.shortcuts import render
from rest_framework.exceptions import ValidationError
from .models import Tag
from .serializers import TagSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

class CadastrarTagView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Verificar se uma tag com o mesmo nome já existe
            nome_tag = request.data.get('nome')
            if Tag.objects.filter(nome=nome_tag).exists():
                return Response(
                    {'error': 'Já existe uma tag com esse nome.', 'code': 'TAG_EXISTENTE'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Se não existir, proceder com a criação
            serializer = TagSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BuscarTagPeloNomeView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            nome_tag = request.GET.get('nome_tag', None)
            
            if nome_tag:
                tags = Tag.objects.filter(nome__icontains=nome_tag)
            else:
                tags = Tag.objects.all()    
                
            if not tags: 
                return Response([], status=status.HTTP_200_OK)
            
            serializer = TagSerializer(tags, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
                        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarTagPeloIdView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            id_tag = request.GET.get('id_tag', None)
            
            if not id_tag: 
                return Response({'error': 'O ID da tag não foi fornecido!'}, status=status.HTTP_400_BAD_REQUEST)
            
            tag = Tag.objects.get(id=id_tag)
            
            if tag:
                serializer = TagSerializer(tag, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response({'error': 'Tag não localizada'}, status=status.HTTP_404_NOT_FOUND)
 
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarTagsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try: 
            tags = Tag.objects.all()
            
            if tags: 
                serializer = TagSerializer(tags, many=True) 
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response([], status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
class AtualizarTagView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        try:
            id_tag = request.GET.get('id_tag', None)

            if not id_tag:
                return Response({'error': 'O ID da tag não foi fornecido!'}, status=status.HTTP_400_BAD_REQUEST)

            nome_tag = request.data.get('nome')

            # Verifica se existe uma tag com o nome fornecido e um ID diferente do ID da tag que está sendo atualizada
            if Tag.objects.filter(nome=nome_tag).exists():
                return Response(
                    {'error': 'Já existe uma tag com esse nome.', 'code': 'TAG_EXISTENTE'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            tag = Tag.objects.get(id=id_tag)
            
            if not tag:
                return Response({'error': 'Tag não localizada'}, status=status.HTTP_404_NOT_FOUND)

            if tag:
                serializer = TagSerializer(tag, data=request.data, partial=True)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)

                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

           

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            
class ExcluirTagsView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request): 
        try:
            ids_tags = request.data.get('ids_tags', None)
            
            if not ids_tags:
                return Response(
                    {'error': 'Os ids das tags a serem excluídas não foram fornecidos !'}, 
                    status=status.HTTP_400_BAD_REQUEST)

            tags = Tag.objects.filter(id__in=ids_tags)
            
            if tags.exists():
                tags.delete()
                return Response({'message': 'Tagas excluídas com sucesso !'}, status=status.HTTP_204_NO_CONTENT)
            
            return Response({'error': 'Nenhum objeto encontrado para exclusão!'}, status=status.HTTP_404_NOT_FOUND)

        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 