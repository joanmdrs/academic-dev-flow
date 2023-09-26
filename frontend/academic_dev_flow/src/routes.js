import React from 'react';
import { BrowserRouter as Router, Routes as Switch, Route, BrowserRouter, Link } from 'react-router-dom';

// Importe os componentes para cada rota
//import Home from './components/Home';
//import FormPage from './components/FormPage';
//import NotFound from './components/NotFound';
import MyForm from './pages/projeto';

function Routes() {
  return (
    <BrowserRouter>
        <div>
        {/* Cabeçalho ou navegação com links para as rotas */}
            <nav>
            <ul>
                <li>
                <a href="/">Home</a>
                </li>
                <li>
                <a href="/projetos">Projetos</a>
                </li>
            </ul>
            </nav>
        </div>
        <Switch>
            <Route Component={MyForm} path='/projetos' exact/>
        </Switch>
        
    </BrowserRouter>

  );
}

export default Routes;
