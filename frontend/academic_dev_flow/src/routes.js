import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Projeto from './pages/Projeto';
import Etapa from './pages/Etapa';
import Membro from './pages/Membro';
import Artefato from './pages/Artefato';
import StudentDashboard from './pages/Dashboard/StudentDashboard/StudentDashboard';
import AdminRoutes from './router/AdminRoutes/AdminRoutes';
import StudentRoutes from './router/StudentRoutes/StudentRoutes';
import Fluxo from './pages/Fluxo';
import Login from './pages/Auth/Login';
import ProjectsSection from './pages/Dashboard/StudentDashboard/screens/ProjectSection/ProjectsSection';
import ViewProject from './pages/Dashboard/StudentDashboard/screens/ViewProject/ViewProject';

function Routes() {
 
  return (
    <Switch>
      <Route path="/" Component={Login} />

      {/* Admin */}
      <Route element={<AdminRoutes />}>
        <Route path="/admin/home" Component={Home} exact/>
        <Route path="/admin/projetos" Component={Projeto} exact/>
        <Route path="/admin/fluxos/gerenciar" Component={Fluxo} exact/>
        <Route path="/admin/etapas" Component={Etapa} exact/>
        <Route path="/admin/membros" Component={Membro} exact/>
        <Route path="/admin/artefatos" Component={Artefato} exact/>
      </Route>

      {/* Aluno */}
      <Route element={<StudentRoutes />}>
        <Route path='/aluno/home' Component={StudentDashboard} exact/>
        <Route path='/aluno/projetos' Component={ProjectsSection} exact/>
        <Route path='/aluno/projetos/visualizar/:projectId' Component={ViewProject} exact/> 
      </Route>
    </Switch>
  );
}

export default Routes;
