# Generated by Django 5.0.3 on 2024-10-26 18:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('iteracao', '0001_initial'),
        ('projeto', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='iteracao',
            old_name='numero',
            new_name='ordem',
        ),
        migrations.RenameField(
            model_name='iteracao',
            old_name='lider',
            new_name='responsavel',
        ),
        migrations.RemoveField(
            model_name='iteracao',
            name='fase',
        ),
        migrations.CreateModel(
            name='Release',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=200)),
                ('descricao', models.TextField()),
                ('status', models.CharField(choices=[('criada', 'Criada'), ('planejamento', 'Em planejamento'), ('andamento', 'Em Andamento'), ('concluida', 'Concluída'), ('cancelada', 'Cancelada')], default='criada', max_length=20)),
                ('data_lancamento', models.DateField()),
                ('projeto', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='projeto.projeto')),
            ],
        ),
        migrations.AddField(
            model_name='iteracao',
            name='relase',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='iteracao.release'),
        ),
    ]
