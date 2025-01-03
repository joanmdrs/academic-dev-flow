# Generated by Django 5.0.3 on 2024-10-12 22:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('iteracao', '0001_initial'),
        ('membro_projeto', '0003_membroprojeto_unique_membro_projeto'),
    ]

    operations = [
        migrations.CreateModel(
            name='CategoriaFuncaoMembro',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(default='membro', max_length=100)),
                ('descricao', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='FuncaoMembro',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.BooleanField(default=True)),
                ('data_atribuicao', models.DateTimeField(auto_now_add=True, null=True)),
                ('data_desativacao', models.DateTimeField(blank=True, null=True)),
                ('categoria_funcao', models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='funcao_membro.categoriafuncaomembro')),
                ('iteracao', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='iteracao.iteracao')),
                ('membro_projeto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='membro_projeto.membroprojeto')),
            ],
        ),
        migrations.AddConstraint(
            model_name='funcaomembro',
            constraint=models.UniqueConstraint(fields=('membro_projeto', 'categoria_funcao', 'status'), name='unique_funcao_membro'),
        ),
    ]
