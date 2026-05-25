import React from "react";
import { Routes as Switch, Route } from "react-router-dom";

import ScreenVisualizarProjeto from "../../pages/Projeto/screens/VisualizarProjeto";
import ScreenGerenciarMembros from "../../pages/Membro/screens/GerenciarMembros";
import ScreenQuadroMembros from "../../pages/Membro/screens/QuadroMembros";
import ScreenGerenciarCategoriaFuncaoMembro from "../../pages/FuncaoMembro/screens/GerenciarCategoriaFuncaoMembro";
import ScreenEquipe from "../../pages/Membro/screens/Equipe";
import ScreenRepositories from "../../pages/GitHub/screens/Repositories";

function RotasProfessor() {
    return (
        <Switch>
            <Route path="projetos/visualizar" element={<ScreenVisualizarProjeto grupo="professor" />} exact />
            
            
            <Route path="membros/gerenciar" element={<ScreenGerenciarMembros grupo="professor" />} exact />
            <Route path="membros/equipes" element={<ScreenQuadroMembros grupo="professor" />} exact />
            <Route path="membros/funcoes" element={<ScreenGerenciarCategoriaFuncaoMembro grupo="professor" />} exact />
            <Route path="membros/equipes/sua-equipe" element={<ScreenEquipe grupo="professor" />} exact />
            
            <Route path="github-integration" element={<ScreenRepositories grupo="professor" />} exact />
            {/* <Route path="github-integration/painel" element={<ScreenPainelGitHub grupo='professor' />} exact /> */}
        </Switch>
    );
}

export default RotasProfessor;