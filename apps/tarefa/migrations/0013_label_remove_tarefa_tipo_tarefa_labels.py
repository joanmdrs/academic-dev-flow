# Generated by Django 5.0.3 on 2024-04-24 17:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tarefa', '0012_tarefa_id_issue_tarefa_number_issue'),
    ]

    operations = [
        migrations.CreateModel(
            name='Label',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_github', models.CharField()),
                ('nome', models.CharField()),
                ('color', models.CharField()),
            ],
        ),
        migrations.RemoveField(
            model_name='tarefa',
            name='tipo',
        ),
        migrations.AddField(
            model_name='tarefa',
            name='labels',
            field=models.ManyToManyField(to='tarefa.label'),
        ),
    ]