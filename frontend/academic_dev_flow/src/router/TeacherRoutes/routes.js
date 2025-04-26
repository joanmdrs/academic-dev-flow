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
import ScreenGerenciarMembros from "../../pages/Membro/screens/GerenciarMembros";
import ScreenQuadroMembros from "../../pages/Membro/screens/QuadroMembros";
import ScreenGerenciarCategoriaFuncaoMembro from "../../pages/FuncaoMembro/screens/GerenciarCategoriaFuncaoMembro";
import ScreenEquipe from "../../pages/Membro/screens/Equipe";
import ScreenVisualizarIteracao from "../../pages/Iteracao/screens/VisualizarIteracao";
import ScreenRepositories from "../../pages/GitHub/screens/Repositories";
import ScreenFeedbacks from "../../pages/Feedback/screens";
// import ScreenPainelGitHub from "../../pages/GitHub/screens/PainelGitHub";

function TeacherRoutesDefinition() {
    return (
        <Switch>
            <Route path="home" element={<ScreenHomeDiscente grupo="professor" />} exact />
            <Route path="perfil" element={<ScreenPerfilMembro grupo="professor" />} exact/>
            <Route path="projetos" element={<ScreenProjetos grupo="professor" />} exact />
            <Route path="projetos/visualizar" element={<ScreenVisualizarProjeto grupo="professor" />} exact />
            <Route path="cronograma/lancamentos" element={<ScreenRelease grupo="professor"/>} />
            <Route path="cronograma/iteracoes" element={<ScreenIteracoes grupo="professor"/>} />
            <Route path="fluxos/gerenciar" element={<ScreenGerenciarFluxos grupo="professor" />} exact />
            <Route path="etapas" element={<ScreenGerenciarEtapas  grupo="professor" />} exact />
            <Route path="tarefas" element={<ScreenTarefas grupo="professor" />} exact />
            <Route path="tarefas/categorias" element={<ScreenGerenciarCategoriaTarefa grupo="professor" />} exact />
            <Route path="tarefas/tags" element={<ScreenGerenciarTags grupo="professor" />} />
            <Route path="artefatos" element={<ScreenArtefatos grupo="professor" />} exact />
            <Route path="membros/gerenciar" element={<ScreenGerenciarMembros grupo="professor" />} exact />
            <Route path="membros/equipes" element={<ScreenQuadroMembros grupo="professor" />} exact />
            <Route path="membros/funcoes" element={<ScreenGerenciarCategoriaFuncaoMembro grupo="professor" />} exact />
            <Route path="membros/equipes/sua-equipe" element={<ScreenEquipe grupo="professor" />} exact />
            <Route path="iteracoes/visualizar" element={<ScreenVisualizarIteracao grupo="professor" /> } exact />
            <Route path="github-integration" element={<ScreenRepositories grupo="professor" />} exact />
            <Route path="feedbacks" element={<ScreenFeedbacks grupo="professor" />} exact />
            {/* <Route path="github-integration/painel" element={<ScreenPainelGitHub grupo='professor' />} exact /> */}
        </Switch>
    );
}

export default TeacherRoutesDefinition;