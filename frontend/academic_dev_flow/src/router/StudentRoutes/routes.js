import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import ScreenHomeDiscente from "../../pages/Home/Discente";
import ScreenPerfilMembro from "../../pages/Membro/screens/PerfilMembro";
import ScreenProjetos from "../../pages/Projeto/screens/Projetos";
import ScreenVisualizarProjeto from "../../pages/Projeto/screens/VisualizarProjeto";
import ScreenRelease from "../../pages/Release/screens/Release";
import ScreenIteracoes from "../../pages/Iteracao/screens/Iteracoes";
import ScreenGerenciarFluxos from "../../pages/Fluxo";
import ScreenGerenciarEtapas from "../../pages/Etapa/screens/GerenciarEtapas";
import ScreenTarefas from "../../pages/Tarefa/screens/Tarefas";
import ScreenGerenciarCategoriaTarefa from "../../pages/CategoriaTarefa";
import ScreenGerenciarTags from "../../pages/Tag";
import ScreenArtefatos from "../../pages/Artefato/screens/Artefatos";
import ScreenQuadroMembros from "../../pages/Membro/screens/QuadroMembros";
import ScreenGerenciarCategoriaFuncaoMembro from "../../pages/FuncaoMembro/screens/GerenciarCategoriaFuncaoMembro";
import ScreenEquipe from "../../pages/Membro/screens/Equipe";
import ScreenGerenciarRelatorios from "../../pages/Relatorio/screens/GerenciarRelatorios";
import ScreenVisualizarIteracao from "../../pages/Iteracao/screens/VisualizarIteracao";
import ScreenRepositories from "../../pages/GitHub/screens/Repositories";
import ScreenFeedbacks from "../../pages/Feedback/screens";
// import ScreenPainelGitHub from "../../pages/GitHub/screens/PainelGitHub";

function StudentRoutesDefinition() {
    return (
        <Switch>
            <Route path="home" element={<ScreenHomeDiscente grupo="aluno" />} exact />
            <Route path="perfil" element={<ScreenPerfilMembro grupo="aluno" />} exact/>
            <Route path="projetos" element={<ScreenProjetos grupo="aluno" />} exact />
            <Route path="projetos/visualizar" element={<ScreenVisualizarProjeto grupo="aluno" />} exact />
            <Route path="cronograma/lancamentos" element={<ScreenRelease grupo="aluno"/>} />
            <Route path="cronograma/iteracoes" element={<ScreenIteracoes grupo="aluno"/>} />
            <Route path="fluxos/gerenciar" element={<ScreenGerenciarFluxos grupo="aluno" />} exact />
            <Route path="etapas" element={<ScreenGerenciarEtapas  grupo="aluno" />} exact />
            <Route path="tarefas" element={<ScreenTarefas grupo="aluno" />} exact />
            <Route path="tarefas/categorias" element={<ScreenGerenciarCategoriaTarefa grupo="aluno" />} exact />
            <Route path="tarefas/tags" element={<ScreenGerenciarTags grupo="aluno" />} />
            <Route path="artefatos" element={<ScreenArtefatos grupo="aluno" />} exact />
            <Route path="membros/equipes" element={<ScreenQuadroMembros grupo="aluno" />} exact />
            <Route path="membros/funcoes" element={<ScreenGerenciarCategoriaFuncaoMembro grupo="aluno" />} exact />
            <Route path="membros/equipes/sua-equipe" element={<ScreenEquipe grupo="aluno" />} exact />
            <Route path="relatorios" element={<ScreenGerenciarRelatorios  grupo="aluno" />} exact />
            <Route path="iteracoes/visualizar" element={<ScreenVisualizarIteracao grupo="aluno" /> } exact />
            <Route path="github-integration" element={<ScreenRepositories grupo="aluno" />} exact />
            <Route path="feedbacks" element={<ScreenFeedbacks grupo="aluno" />} exact />
            {/* <Route path="github-integration/painel" element={<ScreenPainelGitHub grupo='aluno' />} exact /> */}
        </Switch>
    );
}

export default StudentRoutesDefinition;