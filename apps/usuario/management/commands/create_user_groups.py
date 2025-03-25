from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group

class Command(BaseCommand):
    help = 'Verifica e cria os grupos de usuários necessários caso não existam'

    def handle(self, *args, **kwargs):
        # Liste aqui os grupos que deseja criar
        required_groups = ['Administradores', 'Docentes', 'Discentes']

        for group_name in required_groups:
            group, created = Group.objects.get_or_create(name=group_name)
            if created:
                self.stdout.write(self.style.SUCCESS(f'Grupo "{group_name}" criado com sucesso.'))
            else:
                self.stdout.write(f'Grupo "{group_name}" já existe.')

        self.stdout.write(self.style.SUCCESS('Verificação e criação de grupos concluída.'))
