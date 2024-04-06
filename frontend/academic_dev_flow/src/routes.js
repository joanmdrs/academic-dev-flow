import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import Projeto from "./pages/Projeto";
import Etapa from "./pages/Etapa";
import Artefato from "./pages/Artefato";
import AdminRoutes from "./router/AdminRoutes/AdminRoutes";
import StudentRoutes from "./router/StudentRoutes/StudentRoutes";
import Fluxo from "./pages/Fluxo";
import TeacherRoutes from "./router/TeacherRoutes/TeacherRoutes";
import MeusProjetos from "./pages/Projeto/screens/MeusProjetos/MeusProjetos";
import VisualizarProjeto from "./pages/Projeto/screens/VisualizarProjeto/VisualizarProjeto";
import { ProjetoProvider } from "./context/ProjetoContext";
import HomeProfessor from "./pages/Perfis/Professor/Home";
import HomeAdministrador from "./pages/Perfis/Administrador/Home";
import HomeAluno from "./pages/Perfis/Aluno/Home";
import ScreenGerenciarMembros from "./pages/Membro/screens/GerenciarMembros";
import ScreenVincularMembroAoProjeto from "./pages/Membro/screens/VincularMembroAoProjeto";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register";

function Routes() {
  return (
    <Switch>
      <Route path="/" Component={Login} />
      <Route path="/cadastre-se" Component={Register} />

      {/* Admin */}
      <Route element={<AdminRoutes />}>
        
        <Route path="/admin/home" Component={HomeAdministrador} exact />
        <Route path="/admin/projetos" Component={Projeto} exact />
        <Route path="/admin/fluxos/gerenciar" Component={Fluxo} exact />
        <Route path="/admin/etapas" Component={Etapa} exact />
        <Route path="/admin/membros/gerenciar" Component={ScreenGerenciarMembros} exact />
        <Route path="/admin/membros/vincular-projeto" Component={ScreenVincularMembroAoProjeto} exact/>
        <Route path="/admin/artefatos" Component={Artefato} exact />
      </Route>

      {/* Aluno */}
      <Route element={<StudentRoutes />}>
        <Route path="/aluno/home" Component={HomeAluno} exact />
        <Route
          path="/aluno/projetos"
          element={<MeusProjetos grupo="aluno" />}
          exact
        />
        <Route
          path="/aluno/projetos/visualizar/:idProjeto"
          element={
            <ProjetoProvider>
              {" "}
              <VisualizarProjeto grupo={"aluno"} />{" "}
            </ProjetoProvider>
          }
          exact
        />
      </Route>

      {/* Professor */}
      <Route element={<TeacherRoutes />}>
        <Route path="/professor/home" Component={HomeProfessor} exact />
        <Route
          path="/professor/projetos"
          element={<MeusProjetos grupo="professor" />}
          exact
        />
        <Route
          path="/professor/projetos/visualizar/:idProjeto"
          element={
            <ProjetoProvider>
              {" "}
              <VisualizarProjeto grupo={"professor"} />{" "}
            </ProjetoProvider>
          }
          exact
        />
      </Route>
    </Switch>
  );
}

export default Routes;
