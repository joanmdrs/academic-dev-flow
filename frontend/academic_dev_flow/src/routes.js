import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import AdminRoutes from "./router/AdminRoutes/AdminRoutes";
import StudentRoutes from "./router/StudentRoutes/StudentRoutes";
import TeacherRoutes from "./router/TeacherRoutes/TeacherRoutes";
import HomeProfessor from "./pages/Perfis/Professor/Home";
import HomeAdministrador from "./pages/Perfis/Administrador/Home";
import HomeAluno from "./pages/Perfis/Aluno/Home";
import ScreenGerenciarMembros from "./pages/Membro/screens/GerenciarMembros";
import ScreenVincularMembroAoProjeto from "./pages/Membro/screens/VincularMembroAoProjeto";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register";
import ScreenGerenciarTarefas from "./pages/Tarefa/screens/GerenciarTarefas";
import ScreenGerenciarArtefatos from "./pages/Artefato/screens/GerenciarArtefatos";
import ScreenVisualizarArtefato from "./pages/Artefato/screens/VisualizarArtefato";
import ScreenGerenciarIteracoes from "./pages/Iteracao/screens/GerenciarIteracoes";
import ScreenGerenciarProjetos from "./pages/Projeto/screens/GerenciarProjetos";
import ScreenMinhasTarefas from "./pages/Tarefa/screens/MinhasTarefas";
import ScreenMeusArtefatos from "./pages/Artefato/screens/MeusArtefatos";
import ScreenVisualizarProjeto from "./pages/Projeto/screens/VisualizarProjeto";
import ScreenMeusProjetos from "./pages/Projeto/screens/MeusProjetos";
import ScreenGerenciarComentariosTarefa from "./pages/Comentario/screens/ComentariosTarefa";
import ScreenComentariosArtefato from "./pages/Comentario/screens/ComentariosArtefato";
import ScreenComentariosTarefa from "./pages/Comentario/screens/ComentariosTarefa";
import ScreenGerenciarRelatorios from "./pages/Relatorio/screens/GerenciarRelatorios";
import ScreenVisualizarTarefa from "./pages/Tarefa/screens/VisualizarTarefa";
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

function Routes() {
    return (
        <Switch>
            <Route path="/" Component={Login} />
            <Route path="/cadastre-se" Component={Register} />

            {/* Admin */}

            <Route element={
                <ProviderGlobalProjeto>

                    <AdminRoutes />

                </ProviderGlobalProjeto>
            
            }>
                {/* Página de Home */}
                <Route path="/admin/home" Component={HomeAdministrador} exact />

                <Route path="/admin/perfil" element={<ScreenPerfilMembro grupo="admin" />} exact/>


                {/* Menu Item Projetos */}
                <Route
                    path="/admin/projetos"
                    element={<ScreenGerenciarProjetos grupo="admin" />}
                    exact
                />

                {/* Menu Item Fluxos */}
                <Route path="/admin/fluxos/gerenciar" element={<ScreenGerenciarFluxos grupo="admin" />} exact />
                <Route path="/admin/etapas" element={<ScreenGerenciarEtapas  grupo="admin" />} exact />

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

                <Route
                    path="/admin/iteracoes"
                    Component={ScreenGerenciarIteracoes}
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
                    path="/admin/artefatos/visualizar"
                    element={<ScreenVisualizarArtefato grupo="admin" /> }
                />

                <Route 
                    path="/admin/tarefas/:idTarefa/comentarios"
                    element={<ScreenComentariosTarefa grupo="admin" />}
                    exact
                />

                <Route 
                    path="/admin/artefatos/:idArtefato/comentarios"
                    element={<ScreenComentariosArtefato grupo="admin" />}
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
                <Route path="/aluno/home" Component={HomeAluno} exact />

                <Route path="/aluno/perfil" element={<ScreenPerfilMembro grupo="aluno" />} exact/>

                <Route
                    path="/aluno/meus-projetos"
                    element={<ScreenMeusProjetos grupo="aluno" />}
                    exact
                />

                <Route
                    path="/aluno/projetos/visualizar/:idProjeto"
                    element={
                        <ScreenVisualizarProjeto grupo="aluno"/>
                    }
                    exact
                />

                <Route path="/aluno/fluxos/gerenciar" element={<ScreenGerenciarFluxos grupo="aluno" />} exact />
                <Route path="/aluno/etapas" element={<ScreenGerenciarEtapas  grupo="aluno" />} exact />

                <Route
                    path="/aluno/tarefas"
                    element={<ScreenMinhasTarefas grupo="aluno" />}
                    exact
                />

                <Route
                    path="/aluno/tarefas/visualizar"
                    element = {<ScreenVisualizarTarefa  grupo='aluno' />}
                    exact
                />

                <Route
                    path="/aluno/artefatos"
                    element={<ScreenMeusArtefatos grupo="aluno" />}
                    exact
                />

                <Route 
                    path="/aluno/artefatos/visualizar"
                    element={<ScreenVisualizarArtefato grupo="aluno" /> }
                    exact
                />

                <Route 
                    path="/aluno/tarefas/:idTarefa/comentarios"
                    element={<ScreenComentariosTarefa grupo="aluno" />}
                    exact
                />

                <Route 
                    path="/aluno/artefatos/:idArtefato/comentarios"
                    element={<ScreenComentariosArtefato grupo="aluno" />}
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
            </Route>

            {/* Rotas do professor */}

            <Route element={
                <ProviderGlobalProjeto>
                <TeacherRoutes />
                </ProviderGlobalProjeto>}
            >
                <Route path="/professor/home" Component={HomeProfessor} exact />

                <Route path="/professor/perfil" element={<ScreenPerfilMembro grupo="professor" />} exact/>

                <Route
                    path="/professor/projetos/gerenciar"
                    element={<ScreenGerenciarProjetos grupo="professor" />}
                    exact
                />

                <Route
                    path="/professor/projetos/meus-projetos"
                    element={<ScreenMeusProjetos grupo="professor" />}
                    exact
                />

                <Route
                    path="/professor/projetos/visualizar/:idProjeto"
                    element={
                        <ScreenVisualizarProjeto grupo="professor"/>
                    }
                    exact
                />

                <Route path="/professor/fluxos/gerenciar" element={<ScreenGerenciarFluxos grupo="professor" />} exact />
                <Route path="/professor/etapas" element={<ScreenGerenciarEtapas  grupo="professor" />} exact />
            
                <Route
                    path="/professor/tarefas"
                    element={<ScreenMinhasTarefas grupo="professor" />}
                    exact
                />

                <Route 
                    path="/professor/tarefas/:idTarefa/comentarios"
                    element={<ScreenGerenciarComentariosTarefa grupo="professor" />}
                    exact
                />

                <Route
                    path="/professor/artefatos"
                    element={<ScreenMeusArtefatos grupo="professor" />}
                    exact
                />

                <Route 
                    path="/professor/artefatos/visualizar"
                    element={<ScreenVisualizarArtefato grupo="professor" /> }
                />

                <Route 
                    path="/professor/artefatos/:idArtefato/comentarios"
                    element={<ScreenComentariosArtefato grupo="professor"/>}
                    exact
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
