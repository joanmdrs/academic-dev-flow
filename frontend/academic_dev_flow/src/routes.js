import React from 'react';
import { Routes as Switch, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import Projeto from './pages/Projeto';
import Etapa from './pages/Etapa';
import Membro from './pages/Membro';
import Artefato from './pages/Artefato';
import LoginForm from './pages/Auth/Login';
import PageFluxo from './pages/Fluxo/PageFluxo';
import PageProjeto from './pages/Projeto/PageProjeto';
import PrivateRoute from './router/PrivateRouter';

function Routes() {
  return (
        <Switch>            
            <Route Component={LoginForm} path="/login" exact/>
            <Route Component={PrivateRoute}>
              <Route Component={Home} path='/' exact/>
            </Route>
            <Route Component={PageProjeto} path='/projetos/antigo' exact/>
            <Route Component={Projeto} path='/projetos/novo' exact/>
            <Route Component={PageFluxo} path='/fluxos/gerenciar' exact/>
            <Route Component={Etapa} path='/etapas' exact/>
            <Route Component={Membro} path='/membros' exact/>
            <Route Component={Artefato} path='/artefatos' exact/>
        </Switch>
        

  );
}

export default Routes;
