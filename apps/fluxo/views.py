from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from .models import Fluxo
from .serializers import FluxoSerializer


class FluxoViewSet(ModelViewSet):
    queryset = Fluxo.objects.all()
    serializer_class = FluxoSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [SearchFilter]
    search_fields = ['nome']

    def perform_update(self, serializer):
        fluxo = self.get_object()

        if fluxo.created_by != self.request.user:
            raise PermissionDenied("Você não pode editar este fluxo")

        serializer.save()

    def perform_destroy(self, instance):
        if instance.created_by != self.request.user:
            raise PermissionDenied("Você não pode excluir este fluxo")

        instance.delete()