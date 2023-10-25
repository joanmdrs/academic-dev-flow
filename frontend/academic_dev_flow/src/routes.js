import React from 'react';
import { BrowserRouter, Routes as Switch, Route} from 'react-router-dom';
import Projeto from './pages/projeto/projeto';
import Flow from './pages/flow/flow';
import AddFlow from './pages/flow/addFlow';
import FlowSteps from './pages/flow/arq_aux';

function Routes() {
  return (
    <BrowserRouter>
        <Switch>
            <Route Component={Projeto} path='/projetos' exact/>
            <Route Component={Flow} path='/fluxos' exact/>
            <Route Component={FlowSteps} path='/fluxos/novo' exact/>
        </Switch>
        
    </BrowserRouter>

  );
}

export default Routes;
