import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import Etapa from "./pages/Etapa";
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
import PageGerenciarTipos from "./pages/Tipo";
import ScreenGerenciarTarefas from "./pages/Tarefa/screens/GerenciarTarefas";
import ScreenGerenciarArtefatos from "./pages/Artefato/screens/GerenciarArtefatos";
import ScreenVisualizarArtefato from "./pages/Artefato/screens/VisualizarArtefato";
import ScreenGerenciarArquivosGithub from "./pages/Artefato/screens/GerenciarArquivosGithub";
import ScreenGerenciarLabels from "./pages/Tarefa/screens/GerenciarLabels";
import ScreenGerenciarIssues from "./pages/Tarefa/screens/GerenciarIssues";
import ScreenGerenciarIteracoes from "./pages/Iteracao/screens/GerenciarIteracoes";
import ScreenGerenciarProjetos from "./pages/Projeto/screens/GerenciarProjetos";

function Routes() {
  return (
    <Switch>
      <Route path="/" Component={Login} />
      <Route path="/cadastre-se" Component={Register} />

      {/* Admin */}
      <Route element={<AdminRoutes />}>
        {/* Página de Home */}
        <Route path="/admin/home" Component={HomeAdministrador} exact />

        {/* Menu Item Projetos */}
        <Route path="/admin/projetos" Component={ScreenGerenciarProjetos} exact />

        {/* Menu Item Fluxos */}
        <Route path="/admin/fluxos/gerenciar" Component={Fluxo} exact />
        <Route path="/admin/etapas" Component={Etapa} exact />

        {/* Menu Item Membros */}
        <Route path="/admin/membros/gerenciar" Component={ScreenGerenciarMembros} exact />
        <Route path="/admin/membros/vincular-projeto" Component={ScreenVincularMembroAoProjeto} exact/>
      
        {/* Menu Item Artefatos */}
        <Route path="/admin/artefatos/gerenciar" Component={ScreenGerenciarArtefatos} exact />
        <Route path="/admin/artefatos/visualizar-artefato/" Component={ScreenVisualizarArtefato} exact/>
        <Route path="/admin/artefatos/gerenciar-arquivos/" Component={ScreenGerenciarArquivosGithub} exact/>

        {/* Menu Item Tarefas */}

        <Route path="/admin/tarefas/gerenciar" Component={ScreenGerenciarTarefas} exact/>
        <Route path="/admin/tarefas/issues" Component={ScreenGerenciarIssues} exact/>
        <Route path="/admin/tarefas/labels" Component={ScreenGerenciarLabels} exact/>

         {/* Menu Item Tipos */}

        <Route path="/admin/tipos" Component={PageGerenciarTipos} exact/>

        {/* Menu Item Iterações */}

        <Route path="admin/iteracoes" Component={ScreenGerenciarIteracoes} exact />

      </Route>

      
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

  
      {/* <Route element={<TeacherRoutes />}>
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
      </Route> */}
    </Switch>
  );
}

export default Routes;
