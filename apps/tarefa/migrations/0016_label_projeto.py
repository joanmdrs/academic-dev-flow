# Generated by Django 5.0.3 on 2024-04-25 13:26

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projeto', '0007_rename_repositorio_projeto_link_repo_and_more'),
        ('tarefa', '0015_rename_color_label_cor'),
    ]

    operations = [
        migrations.AddField(
            model_name='label',
            name='projeto',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='projeto.projeto'),
        ),
    ]