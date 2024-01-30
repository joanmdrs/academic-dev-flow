import React from 'react';
import { Routes as Switch, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import PageProjeto from './pages/Projeto/PageProjeto';
import PageMembro from './pages/Membro/PageMembro';
import PageArtefato from './pages/Artefato/PageArtefato';
import PageEtapa from './pages/Etapa/PageEtapa';
import PageFluxo from './pages/Fluxo/PageFluxo';

function Routes() {
  return (
        <Switch>
            <Route Component={Home} path='/' exact/>
            <Route Component={PageProjeto} path='/projetos' exact/>
            <Route Component={PageFluxo} path='/fluxos/gerenciar' exact/>
            <Route Component={PageEtapa} path='/etapas' exact/>
            <Route Component={PageMembro} path='/membros' exact/>
            <Route Component={PageArtefato} path='/artefatos' exact/>
        
        </Switch>
        

  );
}

export default Routes;
