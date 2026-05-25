import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
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
import ScreenChats from "../../pages/Chat/screens/PainelChat";

function RotasProfessor() {
    return (
        <Switch>
            <Route path="perfil" element={<ScreenPerfilMembro grupo="professor" />} exact/>
            <Route path="projetos/visualizar" element={<ScreenVisualizarProjeto grupo="professor" />} exact />
            
            
        
            <Route path="chats" element={<ScreenChats grupo="professor" />} exact />
            <Route path="membros/gerenciar" element={<ScreenGerenciarMembros grupo="professor" />} exact />
            <Route path="membros/equipes" element={<ScreenQuadroMembros grupo="professor" />} exact />
            <Route path="membros/funcoes" element={<ScreenGerenciarCategoriaFuncaoMembro grupo="professor" />} exact />
            <Route path="membros/equipes/sua-equipe" element={<ScreenEquipe grupo="professor" />} exact />
            
            <Route path="github-integration" element={<ScreenRepositories grupo="professor" />} exact />
            <Route path="feedbacks" element={<ScreenFeedbacks grupo="professor" />} exact />
            {/* <Route path="github-integration/painel" element={<ScreenPainelGitHub grupo='professor' />} exact /> */}
        </Switch>
    );
}

export default RotasProfessor;