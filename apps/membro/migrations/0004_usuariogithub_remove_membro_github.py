# Generated by Django 5.0.3 on 2024-04-11 15:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('membro', '0003_remove_membro_cpf_remove_membro_sexo_membro_github_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='UsuarioGithub',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=200)),
                ('email_github', models.EmailField(max_length=254)),
                ('usuario_github', models.CharField()),
            ],
        ),
        migrations.RemoveField(
            model_name='membro',
            name='github',
        ),
    ]