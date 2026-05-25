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
            <Route path="projetos/visualizar" element={<ScreenVisualizarProjeto grupo="aluno" />} exact />
            
           
        </Switch>
    );
}

export default StudentRoutesDefinition;