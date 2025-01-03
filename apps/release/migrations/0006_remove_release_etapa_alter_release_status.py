# Generated by Django 5.0.3 on 2024-11-20 18:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('release', '0005_alter_release_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='release',
            name='etapa',
        ),
        migrations.AlterField(
            model_name='release',
            name='status',
            field=models.CharField(choices=[('pendente', 'Pendente'), ('andamento', 'Em Andamento'), ('concluida', 'Concluída'), ('cancelada', 'Cancelada')], default='pendentes', max_length=20),
        ),
    ]
