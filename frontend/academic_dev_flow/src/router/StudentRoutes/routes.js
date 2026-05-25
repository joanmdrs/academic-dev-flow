import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import ScreenPerfilMembro from "../../pages/Membro/screens/PerfilMembro";
import ScreenVisualizarProjeto from "../../pages/Projeto/screens/VisualizarProjeto";
import ScreenQuadroMembros from "../../pages/Membro/screens/QuadroMembros";
import ScreenGerenciarCategoriaFuncaoMembro from "../../pages/FuncaoMembro/screens/GerenciarCategoriaFuncaoMembro";
import ScreenEquipe from "../../pages/Membro/screens/Equipe";
import ScreenGerenciarRelatorios from "../../pages/Relatorio/screens/GerenciarRelatorios";
import ScreenRepositories from "../../pages/GitHub/screens/Repositories";
import ScreenFeedbacks from "../../pages/Feedback/screens";

function StudentRoutesDefinition() {
    return (

        <Switch>
            <Route path="perfil" element={<ScreenPerfilMembro grupo="aluno" />} exact/>
            <Route path="projetos/visualizar" element={<ScreenVisualizarProjeto grupo="aluno" />} exact />
            
            <Route path="membros/equipes" element={<ScreenQuadroMembros grupo="aluno" />} exact />
            <Route path="membros/funcoes" element={<ScreenGerenciarCategoriaFuncaoMembro grupo="aluno" />} exact />
            <Route path="membros/equipes/sua-equipe" element={<ScreenEquipe grupo="aluno" />} exact />
            <Route path="relatorios" element={<ScreenGerenciarRelatorios  grupo="aluno" />} exact />
            <Route path="github-integration" element={<ScreenRepositories grupo="aluno" />} exact />
            <Route path="feedbacks" element={<ScreenFeedbacks grupo="aluno" />} exact />
            {/* <Route path="github-integration/painel" element={<ScreenPainelGitHub grupo='aluno' />} exact /> */}
        </Switch>
    );
}

export default StudentRoutesDefinition;