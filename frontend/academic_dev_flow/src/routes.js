import React from 'react';
import { Routes as Switch, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import PageProjeto from './pages/Projeto/PageProjeto';
import PageMembro from './pages/Membro/PageMembro';
import PageArtefato from './pages/Artefato/PageArtefato';
import PageEtapa from './pages/Etapa/PageEtapa';
import ScreenCadastrarFluxo from './pages/Fluxo/screens/ScreenCadastrarFluxo/ScreenCadastrarFluxo';
import ScreenPlanilhaFluxos from './pages/Fluxo/screens/ScreenPlanilhaFluxos/ScreenPlanilhaFluxos';
import TabsCriarFluxo from './pages/Fluxo/components/TabsCriarFluxo/TabsCriarFluxo';

function Routes() {
  return (
        <Switch>
            <Route Component={Home} path='/' exact/>
            <Route Component={PageProjeto} path='/projetos' exact/>
            <Route Component={ScreenCadastrarFluxo} path='/fluxos/gerenciar' exact/>
            <Route Component={PageEtapa} path='/etapas' exact/>
            <Route Component={PageMembro} path='/membros' exact/>
            <Route Component={PageArtefato} path='/artefatos' exact/>
        
        </Switch>
        

  );
}

export default Routes;
