from rest_framework.routers import DefaultRouter
from .views import FluxoEtapaViewSet, TransicaoFluxoViewSet

router = DefaultRouter()
router.register(r'fluxo-etapas', FluxoEtapaViewSet, basename='fluxo-etapas')
router.register(r'transicoes', TransicaoFluxoViewSet, basename='transicoes')

urlpatterns = router.urls