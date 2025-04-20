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
import ScreenGerenciarRelatorios from "./pages/Relatorio/screens/GerenciarRelatorios";
import ScreenVisualizarIteracao from "./pages/Iteracao/screens/VisualizarIteracao";
import ScreenPerfilMembro from "./pages/Membro/screens/PerfilMembro";
import ScreenGerenciarFluxos from "./pages/Fluxo";
import ScreenGerenciarEtapas from "./pages/Etapa/screens/GerenciarEtapas";
import ScreenGerenciarCategoriaFuncaoMembro from "./pages/FuncaoMembro/screens/GerenciarCategoriaFuncaoMembro";
import ScreenGerenciarCategoriaTarefa from "./pages/CategoriaTarefa";
import ScreenAdminContents from "./pages/GitHub/admin/AdminContents";
import ScreenAdminIssues from "./pages/GitHub/admin/AdminIssues";
import ScreenAdminArtefatos from "./pages/Artefato/admin/AdminArtefatos";
import ScreenGerenciarFuncaoMembro from "./pages/FuncaoMembro/screens/GerenciarFuncaoMembro";
import ScreenRelease from "./pages/Release/screens/Release";
import ScreenIteracoes from "./pages/Iteracao/screens/Iteracoes";
import ScreenQuadroMembros from "./pages/Membro/screens/QuadroMembros";
import ScreenEquipe from "./pages/Membro/screens/Equipe";
import ScreenProjetos from "./pages/Projeto/screens/Projetos";
import ScreenTarefas from "./pages/Tarefa/screens/Tarefas";
import ScreenArtefatos from "./pages/Artefato/screens/Artefatos";
import ScreenHomeAdmin from "./pages/Home/Admin";
import ScreenHomeDiscente from "./pages/Home/Discente";
import ScreenVisualizarProjeto from "./pages/Projeto/screens/VisualizarProjeto";
import ScreenRepositories from "./pages/GitHub/screens/Repositories";
import ScreenAdminProjetos from "./pages/Projeto/admin/AdminProjetos";
import ScreenAdminReleases from "./pages/Release/admin/AdminReleases";
import ScreenAdminCommits from "./pages/GitHub/admin/AdminCommits";
import ScreenAdminIteracoes from "./pages/Iteracao/admin/AdminIteracoes";
import ScreenGerenciarTags from "./pages/Tag";
// import ScreenPainelGitHub from "./pages/GitHub/screens/PainelGitHub";
import { ProviderGlobalUser } from "./context/ContextoGlobalUser/ContextoGlobalUser";
import { ProviderGlobalProjeto } from "./context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import ScreenFeedbacks from "./pages/Feedback/screens";
import ScreenResetPassword from "./pages/Auth/ResetPassword/ResetPassword/ResetPassword";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword/ResetPassword";
import ConfirmResetPassword from "./pages/Auth/ResetPassword/ConfirmResetPassword/ConfirmResetPassword";

function Routes() {
    return (
        <Switch>
            <Route path="/" Component={Login} />
            <Route path="/cadastre-se" Component={Register} />
            <Route path="/redefinir-senha" Component={ResetPassword} />
            <Route path='/redefinir-senha/confirmar/:token' Component={ConfirmResetPassword}/>

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
                    element={<ScreenGerenciarMembros grupo="admin" />}
                    exact
                />
                <Route
                    path="/admin/membros/vincular-projeto"
                    Component={ScreenVincularMembroAoProjeto}
                    exact
                />

                <Route
                    path="/admin/membros/funcoes/gerenciar-categorias"
                    element={<ScreenGerenciarCategoriaFuncaoMembro grupo="admin" /> }
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

                <Route path="/admin/tarefas/gerenciar-categorias" element={<ScreenGerenciarCategoriaTarefa grupo="admin" />} exact />

                <Route 
                    path="/admin/tarefas/tags"
                    element={<ScreenGerenciarTags grupo="admin" />}
                />

                {/* Menu Item Iterações */}

                <Route path="/admin/cronograma/lancamentos" Component={ScreenAdminReleases} exact />

                <Route path="/admin/cronograma/iteracoes" Component={ScreenAdminIteracoes} exact />


                <Route 
                    path="/admin/feedbacks"
                    element={<ScreenFeedbacks grupo="admin" />}
                    exact
                />

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
                <Route path="/aluno/home" element={<ScreenHomeDiscente grupo="aluno" />} exact />

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
                    path="/aluno/cronograma/lancamentos"
                    element={
                        <ScreenRelease grupo="aluno"/>
                    }
                />

                <Route 
                    path="/aluno/cronograma/iteracoes"
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
                    path="/aluno/tarefas/categorias" 
                    element={<ScreenGerenciarCategoriaTarefa grupo="aluno" />} 
                    exact 
                />

                <Route 
                    path="/aluno/tarefas/tags"
                    element={<ScreenGerenciarTags grupo="aluno" />}
                />

                <Route
                    path="/aluno/artefatos"
                    element={<ScreenArtefatos grupo="aluno" />}
                    exact
                />

                <Route 
                    path="/aluno/membros/equipes"
                    element={<ScreenQuadroMembros grupo="aluno" />}
                    exact
                />

                <Route
                    path="/aluno/membros/funcoes"
                    element={<ScreenGerenciarCategoriaFuncaoMembro grupo="aluno" />}
                    exact
                /> 

                <Route
                    path="/aluno/membros/equipes/sua-equipe"
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
                    element={<ScreenRepositories grupo="aluno" />}
                    exact
                />

                <Route 
                    path="/aluno/feedbacks"
                    element={<ScreenFeedbacks grupo="aluno" />}
                    exact
                />

                {/* <Route 
                    path="/aluno/github-integration/painel"
                    element={<ScreenPainelGitHub grupo='aluno' />}
                    exact
                /> */}
                
            </Route>

            {/* Rotas do professor */}

            <Route element={
                <ProviderGlobalProjeto>
                    <ProviderGlobalUser>
                        <TeacherRoutes />
                    </ProviderGlobalUser>
                </ProviderGlobalProjeto>
            }
            >
                <Route path="/professor/home" element={<ScreenHomeDiscente grupo="professor" />} exact />

                <Route path="/professor/perfil" element={<ScreenPerfilMembro grupo="professor" />} exact/>

                <Route
                    path="/professor/projetos"
                    element={<ScreenProjetos grupo="professor" />}
                    exact
                />

                <Route
                    path="/professor/projetos/visualizar"
                    element={<ScreenVisualizarProjeto grupo="professor" />}
                    exact
                />

                <Route 
                    path="/professor/cronograma/lancamentos"
                    element={
                        <ScreenRelease grupo="professor"/>
                    }
                />

                <Route 
                    path="/professor/cronograma/iteracoes"
                    element={
                        <ScreenIteracoes grupo="professor"/>
                    }
                />

                <Route path="/professor/fluxos/gerenciar" element={<ScreenGerenciarFluxos grupo="professor" />} exact />
                <Route path="/professor/etapas" element={<ScreenGerenciarEtapas  grupo="professor" />} exact />

                <Route
                    path="/professor/tarefas"
                    element={<ScreenTarefas grupo="professor" />}
                    exact
                />

                <Route 
                    path="/professor/tarefas/categorias" 
                    element={<ScreenGerenciarCategoriaTarefa grupo="professor" />} 
                    exact 
                />

                <Route 
                    path="/professor/tarefas/tags"
                    element={<ScreenGerenciarTags grupo="professor" />}
                />
                
                <Route
                    path="/professor/artefatos"
                    element={<ScreenArtefatos grupo="professor" />}
                    exact
                />

                <Route
                    path="/professor/membros/gerenciar"
                    element={<ScreenGerenciarMembros grupo="professor" />}
                    exact
                />

                <Route 
                    path="/professor/membros/equipes"
                    element={<ScreenQuadroMembros grupo="professor" />}
                    exact
                />

                <Route
                    path="/professor/membros/funcoes"
                    element={<ScreenGerenciarCategoriaFuncaoMembro grupo="professor" />}
                    exact
                /> 

                <Route
                    path="/professor/membros/equipes/sua-equipe"
                    element={<ScreenEquipe grupo="professor" />}
                    exact
                />


                <Route 
                    path="/professor/iteracoes/visualizar"
                    element={<ScreenVisualizarIteracao grupo="professor" /> }
                    exact
                />

                <Route 
                    path="/professor/github-integration"
                    element={<ScreenRepositories grupo="professor" />}
                    exact
                />

                <Route 
                    path="/professor/feedbacks"
                    element={<ScreenFeedbacks grupo="professor" />}
                    exact
                />

                {/* <Route 
                    path="/professor/github-integration/painel"
                    element={<ScreenPainelGitHub grupo='professor' />}
                    exact
                /> */}
            </Route>
        </Switch>
  ) ;
}

export default Routes;
