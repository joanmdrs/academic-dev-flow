# Generated by Django 5.0.3 on 2024-05-10 17:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projeto', '0007_rename_repositorio_projeto_link_repo_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projeto',
            name='status',
            field=models.CharField(choices=[('criado', 'Criadp'), ('andamento', 'Em Andamento'), ('concluido', 'Concluído'), ('cancelado', 'Cancelado')], default='criado'),
        ),
    ]