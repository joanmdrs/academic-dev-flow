# Generated by Django 4.2.5 on 2024-03-05 10:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('membro_projeto', '0002_alter_membroprojeto_funcao'),
    ]

    operations = [
        migrations.CreateModel(
            name='HistoricoMembroProjeto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('funcao', models.CharField(choices=[('gerente', 'Gerente de Projeto'), ('desenvolvedor', 'Desenvolvedor de Software'), ('desenvolvedor_frontend', 'Desenvolvedor Front-End'), ('desenvolvedor_backend', 'Desenvolvedor Back-End'), ('desenvolvedor_fullstack', 'Desenvolvedor Full-Stack'), ('analista', 'Analista de Sistemas'), ('testador', 'Engenheiro de Testes'), ('design', 'Designer de UI/UX'), ('arquiteto', 'Arquiteto de Software'), ('scrum_master', 'Scrum Master'), ('product_owner', 'Product Owner'), ('dba', 'Administrador de Banco de Dados'), ('devops', 'Engenheiro DevOps'), ('analista_seguranca', 'Analista de Segurança'), ('analista_requisitos', 'Analista de Requisitos'), ('integrador', 'Integrador de Sistemas')], max_length=40)),
                ('data_modificacao', models.DateTimeField(auto_now_add=True)),
                ('membro_projeto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='membro_projeto.membroprojeto')),
            ],
        ),
    ]