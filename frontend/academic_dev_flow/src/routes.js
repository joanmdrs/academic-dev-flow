import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import AdminRoutes from "./router/AdminRoutes/AdminRoutes";
import StudentRoutes from "./router/StudentRoutes/StudentRoutes";
import TeacherRoutes from "./router/TeacherRoutes/TeacherRoutes";
import ScreenGerenciarMembros from "./pages/Membro/screens/GerenciarMembros";
import ScreenVincularMembroAoProjeto from "./pages/Membro/screens/VincularMembroAoProjeto";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register";
import ScreenGerenciarTarefas from "./pages/Tarefa/screens/GerenciarTarefas";
import ScreenVisualizarArtefato from "./pages/Artefato/screens/VisualizarArtefato";
import ScreenGerenciarRelatorios from "./pages/Relatorio/screens/GerenciarRelatorios";
import ScreenVisualizarIteracao from "./pages/Iteracao/screens/VisualizarIteracao";
import ScreenPerfilMembro from "./pages/Membro/screens/PerfilMembro";
import ScreenGerenciarFluxos from "./pages/Fluxo";
import ScreenGerenciarEtapas from "./pages/Etapa/screens/GerenciarEtapas";
import ScreenGerenciarCategoriaFuncaoMembro from "./pages/FuncaoMembro/screens/GerenciarCategoriaFuncaoMembro";
import { ProviderGlobalProjeto } from "./context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import ScreenGerenciarCategoriaTarefa from "./pages/CategoriaTarefa";
import ScreenAdminContents from "./pages/GitHub/admin/AdminContents";
import ScreenAdminIssues from "./pages/GitHub/admin/AdminIssues";
import ScreenAdminArtefatos from "./pages/Artefato/admin/AdminArtefatos";
import ScreenGerenciarFuncaoMembro from "./pages/FuncaoMembro/screens/GerenciarFuncaoMembro";
import { ProviderGlobalUser } from "./context/ContextoGlobalUser/ContextoGlobalUser";
import ScreenRelease from "./pages/Release/screens/Release";
import ScreenIteracoes from "./pages/Iteracao/screens/Iteracoes";
import ScreenQuadroMembros from "./pages/Membro/screens/QuadroMembros";
import ScreenEquipe from "./pages/Membro/screens/Equipe";
import ScreenProjetos from "./pages/Projeto/screens/Projetos";
import ScreenTarefas from "./pages/Tarefa/screens/Tarefas";
import ScreenArtefatos from "./pages/Artefato/screens/Artefatos";
import ScreenHomeAdmin from "./pages/Home/Admin";
import ScreenHomeDiscente from "./pages/Home/Discente";
import ScreenHomeDocente from "./pages/Home/Docente";
import ScreenVisualizarProjeto from "./pages/Projeto/screens/VisualizarProjeto";
import ScreenRepositories from "./pages/GitHub/screens/Repositories";
import ScreenPainelGitHub from "./pages/GitHub/screens/PainelGitHub";
import ScreenAdminProjetos from "./pages/Projeto/admin/AdminProjetos";
import ScreenAdminReleases from "./pages/Release/admin/AdminReleases";
import ScreenAdminCommits from "./pages/GitHub/admin/AdminCommits";
import ScreenAdminIteracoes from "./pages/Iteracao/admin/AdminIteracoes";

function Routes() {
    return (
        <Switch>
            <Route path="/" Component={Login} />
            <Route path="/cadastre-se" Component={Register} />

            {/* Admin */}

            <Route element={
                <ProviderGlobalProjeto>
                    <ProviderGlobalUser>
                        <AdminRoutes />
                    </ProviderGlobalUser>
                </ProviderGlobalProjeto>
            
            }>
                {/* Página de Home */}
                <Route path="/admin/home" Component={ScreenHomeAdmin} exact />

                <Route path="/admin/perfil" element={<ScreenPerfilMembro grupo="admin" />} exact/>


                {/* Menu Item Projetos */}
                <Route
                    path="/admin/projetos"
                    element={<ScreenAdminProjetos />}
                    exact
                />

                {/* Menu Item Fluxos */}
                <Route path="/admin/fluxos/gerenciar" element={<ScreenGerenciarFluxos grupo="admin" />} exact />
                <Route path="/admin/fluxos/etapas" element={<ScreenGerenciarEtapas  grupo="admin" />} exact />

                {/* Menu Item Membros */}
                <Route
                    path="/admin/membros/gerenciar"
                    Component={ScreenGerenciarMembros}
                    exact
                />
                <Route
                    path="/admin/membros/vincular-projeto"
                    Component={ScreenVincularMembroAoProjeto}
                    exact
                />

                <Route
                    path="/admin/membros/funcoes/gerenciar-categorias"
                    Component={ScreenGerenciarCategoriaFuncaoMembro}
                    exact
                /> 

                <Route 
                    path="/admin/membros/funcoes/gerenciar-funcoes"
                    Component={ScreenGerenciarFuncaoMembro}
                    exact    
                /> 

                {/* Menu Item Artefatos */}
                <Route
                    path="/admin/artefatos/gerenciar"
                    Component={ScreenAdminArtefatos}
                    exact
                />

                {/* Menu Item Tarefas */}

                <Route
                    path="/admin/tarefas/gerenciar"
                    Component={ScreenGerenciarTarefas}
                    exact
                />

                {/* Menu Item Categorias de Tarefa */}

                <Route path="/admin/tarefas/gerenciar-categorias" Component={ScreenGerenciarCategoriaTarefa} exact />

                {/* Menu Item Iterações */}

                <Route path="/admin/cronograma/releases" Component={ScreenAdminReleases} exact />

                <Route path="/admin/cronograma/iterations" Component={ScreenAdminIteracoes} exact />

                <Route
                    path="/admin/github-integration/issues"
                    Component={ScreenAdminIssues}
                    exact
                />

                <Route 
                    path="/admin/github-integration/contents"
                    Component={ScreenAdminContents}
                    exact
                />

                <Route 
                    path="/admin/github-integration/commits"
                    Component={ScreenAdminCommits}
                    exact
                />

                <Route 
                    path="/admin/artefatos/visualizar"
                    element={<ScreenVisualizarArtefato grupo="admin" /> }
                />

                <Route
                    path="/admin/relatorios"
                    element={<ScreenGerenciarRelatorios  grupo="admin" />}
                
                />
            </Route>

            {/* Rotas do aluno */}

            <Route element={
                
                <ProviderGlobalProjeto>
                    <ProviderGlobalUser>
                        <StudentRoutes />
                    </ProviderGlobalUser>
                </ProviderGlobalProjeto>
            }>
                <Route path="/aluno/home" Component={ScreenHomeDiscente} exact />

                <Route path="/aluno/perfil" element={<ScreenPerfilMembro grupo="aluno" />} exact/>

                <Route
                    path="/aluno/projetos"
                    element={<ScreenProjetos grupo="aluno" />}
                    exact
                />

                <Route
                    path="/aluno/projetos/visualizar"
                    element={<ScreenVisualizarProjeto grupo="aluno" />}
                    exact
                />

                <Route 
                    path="/aluno/cronograma/releases"
                    element={
                        <ScreenRelease grupo="aluno"/>
                    }
                />

                <Route 
                    path="/aluno/cronograma/iterations"
                    element={
                        <ScreenIteracoes grupo="aluno"/>
                    }
                />

                <Route path="/aluno/fluxos/gerenciar" element={<ScreenGerenciarFluxos grupo="aluno" />} exact />
                <Route path="/aluno/etapas" element={<ScreenGerenciarEtapas  grupo="aluno" />} exact />

                <Route
                    path="/aluno/tarefas"
                    element={<ScreenTarefas grupo="aluno" />}
                    exact
                />



                <Route
                    path="/aluno/artefatos"
                    element={<ScreenArtefatos grupo="aluno" />}
                    exact
                />

                <Route 
                    path="/aluno/artefatos/visualizar"
                    element={<ScreenVisualizarArtefato grupo="aluno" /> }
                    exact
                />

                <Route 
                    path="/aluno/membros"
                    element={<ScreenQuadroMembros grupo="aluno" />}
                    exact
                />

                <Route
                    path="/aluno/membros/equipe"
                    element={<ScreenEquipe grupo="aluno" />}
                    exact
                />

                <Route
                    path="/aluno/relatorios"
                    element={<ScreenGerenciarRelatorios  grupo="aluno" />}
                    exact
                />

                <Route 
                    path="/aluno/iteracoes/visualizar"
                    element={<ScreenVisualizarIteracao grupo="aluno" /> }
                    exact
                />

                <Route 
                    path="/aluno/github-integration"
                    element={<ScreenRepositories grupo={"aluno"} />}
                    exact
                />

                <Route 
                    path="/aluno/github-integration/painel"
                    element={<ScreenPainelGitHub grupo={'aluno'} />}
                    exact
                />
                
            </Route>

            {/* Rotas do professor */}

            <Route element={
                <ProviderGlobalProjeto>
                <TeacherRoutes />
                </ProviderGlobalProjeto>}
            >
                <Route path="/professor/home" Component={ScreenHomeDocente} exact />

                <Route path="/professor/perfil" element={<ScreenPerfilMembro grupo="professor" />} exact/>

        

                <Route
                    path="/professor/projetos/projetos"
                    element={<ScreenProjetos grupo="professor" />}
                    exact
                />

                <Route path="/professor/fluxos/gerenciar" element={<ScreenGerenciarFluxos grupo="professor" />} exact />
                <Route path="/professor/etapas" element={<ScreenGerenciarEtapas  grupo="professor" />} exact />
            
                <Route
                    path="/professor/tarefas"
                    element={<ScreenTarefas grupo="professor" />}
                    exact
                />

                <Route
                    path="/professor/artefatos"
                    element={<ScreenArtefatos grupo="professor" />}
                    exact
                />

                <Route 
                    path="/professor/artefatos/visualizar"
                    element={<ScreenVisualizarArtefato grupo="professor" /> }
                />

                <Route 
                    path="/aluno/iteracoes/visualizar"
                    element={<ScreenVisualizarIteracao grupo="professor" /> }
                />

                <Route
                    path="/professor/relatorios"
                    element={<ScreenGerenciarRelatorios  grupo="professor" />}
                />
            </Route>
        </Switch>
  ) ;
}

export default Routes;
