# Generated by Django 5.0.3 on 2024-03-23 12:16

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('membro_projeto', '0004_remove_membroprojeto_data_fim_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pontuacao',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nota', models.DecimalField(decimal_places=2, max_digits=5)),
                ('data_atribuicao', models.DateTimeField(default=django.utils.timezone.now)),
                ('comentario', models.TextField(blank=True, null=True)),
                ('disponivel', models.BooleanField(default=False)),
                ('autor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='membro_projeto.membroprojeto')),
            ],
        ),
    ]