# Generated by Django 4.2.5 on 2023-12-28 19:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Membro',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=200)),
                ('cpf', models.CharField(max_length=11)),
                ('data_nascimento', models.DateField(verbose_name='Data de nascimento')),
                ('sexo', models.CharField(choices=[('masculino', 'Masculino'), ('feminino', 'Feminino'), ('nao_informado', 'Não Informado')], max_length=20)),
                ('telefone', models.CharField(max_length=11)),
                ('email', models.EmailField(max_length=200)),
            ],
        ),
    ]