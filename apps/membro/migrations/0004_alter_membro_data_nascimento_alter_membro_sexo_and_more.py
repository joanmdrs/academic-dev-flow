# Generated by Django 5.0.3 on 2025-01-09 13:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('membro', '0003_membro_sexo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='membro',
            name='data_nascimento',
            field=models.DateField(blank=True, null=True, verbose_name='Data de nascimento'),
        ),
        migrations.AlterField(
            model_name='membro',
            name='sexo',
            field=models.CharField(choices=[('M', 'Masculino'), ('F', 'Feminino'), ('O', 'Outro')], default='O', max_length=1),
        ),
        migrations.AlterField(
            model_name='membro',
            name='telefone',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
