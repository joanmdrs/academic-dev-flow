from django.contrib.auth.models import AbstractUser, Group
from django.db import models

class Usuario(AbstractUser):
    data_criacao = models.DateTimeField(auto_now_add=True)
    grupos = models.ManyToManyField(Group, related_name='usuarios', blank=True)

    def __str__(self):
        return self.username
