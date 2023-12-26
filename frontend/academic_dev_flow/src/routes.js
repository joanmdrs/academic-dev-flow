import React from 'react';
import { BrowserRouter, Routes as Switch, Route} from 'react-router-dom';
import Projeto from './pages/projeto/projeto';
import Flow from './pages/flow/flow';
import FlowSteps from './pages/flow/FlowSteps';
import ViewFlow from './components/Flow/ViewFlow/ViewFlow';
import PaginaMembro from './pages/membro/PageMembro';

function Routes() {
  return (
    <BrowserRouter>
        <Switch>
            <Route Component={Projeto} path='/projetos' exact/>
            <Route Component={Flow} path='/fluxos' exact/>
            <Route Component={FlowSteps} path='/fluxos/novo' exact/>
            <Route Component={ViewFlow} path='fluxos/visualizar/:id' exact/>
            <Route Component={PaginaMembro} path='/membros' exact/>
        </Switch>
        
    </BrowserRouter>

  );
}

export default Routes;
