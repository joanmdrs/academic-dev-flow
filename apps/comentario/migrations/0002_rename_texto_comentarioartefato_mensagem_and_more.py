# Generated by Django 5.0.3 on 2024-11-03 16:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('comentario', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comentarioartefato',
            old_name='texto',
            new_name='mensagem',
        ),
        migrations.RenameField(
            model_name='comentariotarefa',
            old_name='texto',
            new_name='mensagem',
        ),
    ]
