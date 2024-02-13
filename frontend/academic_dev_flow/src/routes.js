import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Projeto from './pages/Projeto';
import Etapa from './pages/Etapa';
import Membro from './pages/Membro';
import Artefato from './pages/Artefato';
import LoginForm from './pages/Auth/Login';
import PageFluxo from './pages/Fluxo/PageFluxo';
import PageProjeto from './pages/Projeto/PageProjeto';
import PrivateRoute from './router/PrivateRouter';
import { useAuth } from './hooks/AuthProvider';
import AdminDashboard from './pages/UserDashboards/AdminDashboard/AdminDashboard';
import { decodeToken } from 'react-jwt';
import StudentDashboard from './pages/Dashboard/StudentDashboard/StudentDashboard';

function Routes() {

  const token = localStorage.getItem('token')
  const decodedToken = decodeToken(token)
  console.log(decodedToken)

  return (
    <Switch>
      <Route path="/" Component={LoginForm} />

      {/* Admin */}
      <Route element={<PrivateRoute isAllowed={!!decodedToken && decodedToken.groups.includes('Admin')}/>}>
        <Route path="/admin" Component={Home} />
        <Route path="/admin/projetos/antigo" Component={PageProjeto} />
        <Route path="/admin/fluxos/gerenciar" Component={PageFluxo} />
        <Route path="/admin/etapas" Component={Etapa} />
        <Route path="/admin/membros" Component={Membro} />
        <Route path="/admin/artefatos" Component={Artefato} />
      </Route>

      {/* Aluno */}
      <Route element={<PrivateRoute isAllowed={!!decodedToken && decodedToken.groups.includes('Alunos')} />}>
        <Route path='/aluno/home' Component={StudentDashboard}/>
      </Route>

    </Switch>
  );
}

export default Routes;

    