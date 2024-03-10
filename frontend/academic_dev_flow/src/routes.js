import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Projeto from './pages/Projeto';
import Etapa from './pages/Etapa';
import Membro from './pages/Membro';
import Artefato from './pages/Artefato';
import AdminRoutes from './router/AdminRoutes/AdminRoutes';
import StudentRoutes from './router/StudentRoutes/StudentRoutes';
import Fluxo from './pages/Fluxo';
import Login from './pages/Auth/Login';
import HomeAluno from './pages/Dashboard/Aluno/HomeAluno';
import { ProviderProjeto } from './pages/Dashboard/Aluno/context/Provider/Provider';
import TeacherRoutes from './router/TeacherRoutes/TeacherRoutes';
import HomeProfessor from './pages/Dashboard/Professor/Home';
import MeusProjetos from './pages/Dashboard/Projetos/MeusProjetos/MeusProjetos';
import VisualizarProjeto from './pages/Dashboard/Projetos/VisualizarProjeto/VisualizarProjeto';

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
        <Route path='/aluno/home' Component={HomeAluno} exact/>
        <Route path='/aluno/projetos' Component={MeusProjetos} exact/>
        <Route path='/aluno/projetos/visualizar/:idProjeto' element={
          <ProviderProjeto> <VisualizarProjeto /> </ProviderProjeto>
        } exact/> 
      </Route>

      {/* Professor */}
      <Route element={<TeacherRoutes />}>
        <Route path='/professor/home' Component={HomeProfessor} exact/>
        <Route path='/professor/projetos' Component={MeusProjetos} exact/>
        <Route path='/professor/projetos/visualizar/:idProjeto' element={
          <ProviderProjeto> <VisualizarProjeto grupo={'professor'} /> </ProviderProjeto>
        } exact/> 
      </Route>
    </Switch>
  );
}

export default Routes;
