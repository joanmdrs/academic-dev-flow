# Generated by Django 5.0.3 on 2024-09-25 12:50

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('fluxo_etapa', '0001_initial'),
        ('membro_projeto', '0001_initial'),
        ('projeto', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Iteracao',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=200)),
                ('numero', models.IntegerField()),
                ('descricao', models.TextField(blank=True, null=True)),
                ('status', models.CharField(choices=[('criada', 'Criada'), ('planejamento', 'Em planejamento'), ('andamento', 'Em Andamento'), ('concluida', 'Concluída'), ('cancelada', 'Cancelada')], default='criada', max_length=20)),
                ('data_inicio', models.DateField()),
                ('data_termino', models.DateField()),
                ('fase', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='fluxo_etapa.fluxoetapa')),
                ('lider', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='membro_projeto.membroprojeto')),
                ('projeto', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='iteracoes', to='projeto.projeto')),
            ],
        ),
    ]
