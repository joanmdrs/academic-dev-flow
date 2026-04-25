from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FluxoViewSet

router = DefaultRouter()
router.register(r'fluxo', FluxoViewSet, basename='fluxo')

urlpatterns = [
    path('', include(router.urls)),
]