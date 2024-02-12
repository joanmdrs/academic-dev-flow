from django.urls import path
from .views import *
app_name = 'api'

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    ##path('logout/', LogoutView.as_view(), name='logout'),
]