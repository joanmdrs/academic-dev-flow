import React from "react";
import { Routes as Switch, Route } from "react-router-dom";

import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword/ResetPassword";
import ConfirmResetPassword from "./pages/Auth/ResetPassword/ConfirmResetPassword/ConfirmResetPassword";

import AdminRoutesDefinition from "./router/AdminRoutes/routes";
import StudentRoutesDefinition from "./router/StudentRoutes/routes";

import LayoutBase from "./layouts/LayoutBase";
import ProtectedRoute from "./router/ProtectedRoute";

import { ProviderGlobalUser } from "./context/ContextoGlobalUser/ContextoGlobalUser";
import { ProviderGlobalProjeto } from "./context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import RotasProfessor from "./router/TeacherRoutes/routes";
import Home from "./pages/Home/Home";
import ScreenGerenciarFluxos from "./pages/Fluxo";
import ScreenGerenciarEtapas from "./pages/Etapa/screens/GerenciarEtapas";
import ScreenProjetos from "./pages/Projeto/screens/Projetos";
import TransicoesPage from "./pages/Fluxo/screens/TransicoesPage";
import ScreenTarefas from "./pages/Tarefa/screens/Tarefas";
import ScreenGerenciarCategoriaTarefa from "./pages/CategoriaTarefa";
import ScreenGerenciarTags from "./pages/Tag";
import ScreenArtefatos from "./pages/Artefato/screens/Artefatos";
import ScreenIteracoes from "./pages/Iteracao/screens/Iteracoes";
import ScreenRelease from "./pages/Release/screens/Release";
import ScreenVisualizarIteracao from "./pages/Iteracao/screens/VisualizarIteracao";
import ScreenChats from "./pages/Chat/screens/PainelChat";
import ScreenFeedbacks from "./pages/Feedback/screens";
import ScreenPerfilMembro from "./pages/Membro/screens/PerfilMembro";
import ScreenGerenciarMembros from "./pages/Membro/screens/GerenciarMembros";
import ScreenQuadroMembros from "./pages/Membro/screens/QuadroMembros";
import ScreenEquipe from "./pages/Membro/screens/Equipe";
import ScreenGerenciarCategoriaFuncaoMembro from "./pages/FuncaoMembro/screens/GerenciarCategoriaFuncaoMembro";
import VisualizarFluxoPage from "./pages/Fluxo/screens/VisualizarFluxoPage";

function Routes() {
    return (
        <ProviderGlobalUser>
            <ProviderGlobalProjeto>

                <Switch>

                    <Route path="/" element={<Login />} />
                    <Route path="/cadastre-se" element={<Register />} />
                    <Route path="/redefinir-senha" element={<ResetPassword />} />
                    <Route path="/redefinir-senha/confirmar/:token" element={<ConfirmResetPassword />} />
                    <Route element={<ProtectedRoute allowedRoles={['admin', 'aluno', 'professor']} />}>
                        <Route 
                            path="/home" 
                            element={
                                <LayoutBase>
                                    <Home />
                                </LayoutBase>
                            } 
                        />
                    </Route>
                    <Route element={<ProtectedRoute allowedRoles={['admin', 'aluno', 'professor']} />}>
                        <Route
                            path="/fluxos/*"
                            element={
                                <LayoutBase>
                                    <ScreenGerenciarFluxos />
                                </LayoutBase>
                            }
                        />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['admin', 'aluno', 'professor']} />}>
                        <Route
                            path="/etapas/*"
                            element={
                                <LayoutBase>
                                    <ScreenGerenciarEtapas />
                                </LayoutBase>
                            }
                        />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['aluno', 'professor']} />}>
                        <Route
                            path="/projetos/*"
                            element={
                                <LayoutBase>
                                    <ScreenProjetos />
                                </LayoutBase>
                            }
                        />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['aluno', 'professor']} />}>
                        <Route
                            path="/tarefas/*"
                            element={
                                <LayoutBase>
                                    <ScreenTarefas />
                                </LayoutBase>
                            }
                        />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['aluno', 'professor']} />}>
                        <Route
                            path="/tarefas/categorias*"
                            element={
                                <LayoutBase>
                                    <ScreenGerenciarCategoriaTarefa />
                                </LayoutBase>
                            }
                        />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['aluno', 'professor']} />}>
                        <Route
                            path="/tarefas/tags*"
                            element={
                                <LayoutBase>
                                    <ScreenGerenciarTags />
                                </LayoutBase>
                            }
                        />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['aluno', 'professor']} />}>
                        <Route
                            path="/artefatos*"
                            element={
                                <LayoutBase>
                                    <ScreenArtefatos />
                                </LayoutBase>
                            }
                        />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['admin', 'professor', 'aluno']} />}>
                        <Route
                            path="/transicoes/*"
                            element={
                                <LayoutBase>
                                    <TransicoesPage />
                                </LayoutBase>
                            }
                        />
                    </Route>   

                    <Route element={<ProtectedRoute allowedRoles={['admin', 'professor', 'aluno']} />}>
                        <Route
                            path="/visualizar-fluxo/*"
                            element={
                                <LayoutBase>
                                    <VisualizarFluxoPage />
                                </LayoutBase>
                            }
                        />
                    </Route>   
                    



                    <Route element={<ProtectedRoute allowedRoles={['professor', 'aluno']} />}>
                        <Route 
                            path="cronograma/lancamentos" 
                            element={
                                <LayoutBase>
                                    <ScreenRelease />
                                </LayoutBase>
                            } 
                        />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['professor', 'aluno']} />}>
                        <Route 
                            path="cronograma/iteracoes" 
                            element={
                                <LayoutBase>
                                    <ScreenIteracoes />
                                </LayoutBase>
                            } 
                        />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['professor', 'aluno']} />}>
                        <Route 
                            path="iteracoes/visualizar" 
                            element={
                                <LayoutBase>
                                    <ScreenVisualizarIteracao />
                                </LayoutBase>
                            } 
                        />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['aluno', 'professor']} />}>
                        <Route 
                            path="/chats/*" 
                            element={
                                <LayoutBase>
                                    <ScreenChats />
                                </LayoutBase>
                            } 
                        />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['admin', 'aluno', 'professor']} />}>
                        <Route
                            path="/feedbacks/*"
                            element={
                                <LayoutBase>
                                    <ScreenFeedbacks />
                                </LayoutBase>
                            }
                        />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['aluno', 'professor', 'admin']} />}>
                        <Route
                            path="/perfil/*"
                            element={
                                <LayoutBase>
                                    <ScreenPerfilMembro />
                                </LayoutBase>
                            }
                        />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['admin', 'professor']} />}>   
                        <Route
                            path="/membros/gerenciar/"
                            element={
                                <LayoutBase>
                                    <ScreenGerenciarMembros />
                                </LayoutBase>
                            }
                        />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['professor']} />}>   
                        <Route
                            path="/membros/equipes/"
                            element={
                                <LayoutBase>
                                    <ScreenQuadroMembros />
                                </LayoutBase>
                            }
                        />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['professor', 'aluno']} />}>   
                        <Route
                            path="/membros/equipes/sua-equipe/"
                            element={
                                <LayoutBase>
                                    <ScreenEquipe />
                                </LayoutBase>
                            }
                        />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['professor', 'admin']} />}>
                        <Route
                            path="/membros/funcoes"
                            element={
                                <LayoutBase>
                                    <ScreenGerenciarCategoriaFuncaoMembro />
                                </LayoutBase>
                            }
                        />
                    </Route>


                

















                            
                        

                    <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                        <Route
                            path="/admin/*"
                            element={
                                <LayoutBase>
                                    <AdminRoutesDefinition />
                                </LayoutBase>
                            }
                        />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['aluno']} />}>
                        <Route
                            path="/aluno/*"
                            element={
                                <LayoutBase>
                                    <StudentRoutesDefinition />
                                </LayoutBase>
                            }
                        />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['professor']} />}>
                        <Route
                            path="/professor/*"
                            element={
                                <LayoutBase>
                                    <RotasProfessor />
                                </LayoutBase>
                            }
                        />
                    </Route>

                </Switch>

            </ProviderGlobalProjeto>
        </ProviderGlobalUser>
    );
}

export default Routes;