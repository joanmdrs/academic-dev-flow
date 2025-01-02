from django.test import TestCase
from apps.projeto.models import Projeto
from apps.fluxo_etapa.models import FluxoEtapa
from apps.membro.models import Membro
from apps.membro_projeto.models import MembroProjeto
from apps.release.models import Release

class ReleaseModelTest(TestCase):

    def setUp(self):
        # Configuração inicial: Criação de objetos relacionados
        self.projeto = Projeto.objects.create(
            nome="Projeto Teste", data_inicio="2025-01-02", data_termino="2025-01-30")
        
        self.membro = Membro.objects.create(nome='Membro de teste', email="membro.teste@email.com")
        
        self.responsavel = MembroProjeto.objects.create(membro=self.membro, projeto=self.projeto)

    def test_criar_release_com_sucesso(self):
        # Testa a criação de uma release válida
        release = Release.objects.create(
            nome="Release 1",
            descricao="Descrição da release 1",
            status="andamento",
            data_lancamento="2025-01-15",
            projeto=self.projeto,
            responsavel=self.responsavel
        )
        self.assertEqual(release.nome, "Release 1")
        self.assertEqual(release.descricao, "Descrição da release 1")
        self.assertEqual(release.status, "andamento")
        self.assertEqual(release.data_lancamento, "2025-01-15")
        self.assertEqual(release.projeto, self.projeto)
        self.assertEqual(release.responsavel, self.responsavel)

    def test_status_padrao_e_pendente(self):
        # Testa se o status padrão é "pendente"
        release = Release.objects.create(
            nome="Release 2",
            data_lancamento="2025-01-20",
            projeto=self.projeto
        )
        self.assertEqual(release.status, "pendente")

    def test_atualizar_release(self):
        # Testa a atualização de uma release existente
        release = Release.objects.create(
            nome="Release 3",
            data_lancamento="2025-01-25",
            projeto=self.projeto
        )
        release.nome = "Release Atualizada"
        release.status = "concluida"
        release.save()

        release_atualizada = Release.objects.get(id=release.id)
        self.assertEqual(release_atualizada.nome, "Release Atualizada")
        self.assertEqual(release_atualizada.status, "concluida")

    def test_release_sem_projeto(self):
        # Testa a criação de uma release sem um projeto associado
        release = Release.objects.create(
            nome="Release Sem Projeto",
            data_lancamento="2025-02-01"
        )
        self.assertIsNone(release.projeto)

    def test_release_sem_responsavel(self):
        # Testa a criação de uma release sem um responsável associado
        release = Release.objects.create(
            nome="Release Sem Responsável",
            data_lancamento="2025-02-01",
            projeto=self.projeto
        )
        self.assertIsNone(release.responsavel)

    def test_deletar_projeto_associado_a_release(self):
        # Testa o comportamento ao deletar um projeto associado a uma release
        release = Release.objects.create(
            nome="Release Com Projeto",
            data_lancamento="2025-03-01",
            projeto=self.projeto
        )
        self.projeto.delete()
        with self.assertRaises(Release.DoesNotExist):
            Release.objects.get(id=release.id)

    def test_deletar_responsavel_associado_a_release(self):
        # Testa o comportamento ao deletar um responsável associado a uma release
        release = Release.objects.create(
            nome="Release Com Responsável",
            data_lancamento="2025-03-01",
            responsavel=self.responsavel
        )
        self.responsavel.delete()
        release_atualizada = Release.objects.get(id=release.id)
        self.assertIsNone(release_atualizada.responsavel)
