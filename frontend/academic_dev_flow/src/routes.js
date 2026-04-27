import React from "react";
import { Routes as Switch, Route } from "react-router-dom";

import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword/ResetPassword";
import ConfirmResetPassword from "./pages/Auth/ResetPassword/ConfirmResetPassword/ConfirmResetPassword";

import AdminRoutesDefinition from "./router/AdminRoutes/routes";
import StudentRoutesDefinition from "./router/StudentRoutes/routes";
import TeacherRoutesDefinition from "./router/TeacherRoutes/routes";

import LayoutBase from "./layouts/LayoutBase";
import ProtectedRoute from "./router/ProtectedRoute";

import { ProviderGlobalUser } from "./context/ContextoGlobalUser/ContextoGlobalUser";
import { ProviderGlobalProjeto } from "./context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import RotasProfessor from "./router/TeacherRoutes/routes";
import Home from "./pages/Home/Home";

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