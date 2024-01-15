import React from 'react';
import { BrowserRouter, Routes as Switch, Route} from 'react-router-dom';
import Flow from './pages/flow/flow';
import FlowSteps from './pages/flow/FlowSteps';
import ViewFlow from './components/Flow/ViewFlow/ViewFlow';
import Home from './pages/home/Home';
import PageProjeto from './pages/Projeto/PageProjeto';
import PageMembro from './pages/Membro/PageMembro';
import PageArtefato from './pages/Artefato/PageArtefato';

function Routes() {
  return (
    <BrowserRouter>
        <Switch>
            <Route Component={Home} path='/' exact/>
            <Route Component={PageProjeto} path='/projetos' exact/>
            <Route Component={Flow} path='/fluxos' exact/>
            <Route Component={FlowSteps} path='/fluxos/novo' exact/>
            <Route Component={ViewFlow} path='fluxos/visualizar/:id' exact/>
            <Route Component={PageMembro} path='/membros' exact/>
            <Route Component={PageArtefato} path='/artefatos' exact/>
        
        </Switch>
        
    </BrowserRouter>

  );
}

export default Routes;
