import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Projeto from './pages/Projeto';
import Etapa from './pages/Etapa';
import Membro from './pages/Membro';
import Artefato from './pages/Artefato';
import LoginForm from './pages/Auth/Login';
import PageProjeto from './pages/Projeto/PageProjeto';
import StudentDashboard from './pages/Dashboard/StudentDashboard/StudentDashboard';
import ProjectsSection from './pages/Dashboard/StudentDashboard/ProjectsSection/ProjectsSection';
import AdminRoutes from './router/AdminRoutes/AdminRoutes';
import StudentRoutes from './router/StudentRoutes/StudentRoutes';
import Fluxo from './pages/Fluxo';

function Routes() {
 
  return (
    <Switch>
      <Route path="/" Component={LoginForm} />

      {/* Admin */}
      <Route element={<AdminRoutes />}>
        <Route path="/admin/home" Component={Home} />
        <Route path="/admin/projetos/antigo" Component={PageProjeto} />
        <Route path="/admin/projetos/novo" Component={Projeto}/>
        <Route path="/admin/fluxos/gerenciar" Component={Fluxo} />
        <Route path="/admin/etapas" Component={Etapa} />
        <Route path="/admin/membros" Component={Membro} />
        <Route path="/admin/artefatos" Component={Artefato} />
      </Route>

      {/* Aluno */}
      <Route element={<StudentRoutes />}>
        <Route path='/aluno/home' Component={StudentDashboard}/>
        <Route path='/aluno/projetos' Component={ProjectsSection} />
      </Route>
    </Switch>
  );
}

export default Routes;
