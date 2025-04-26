import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import AdminRoutes from "./router/AdminRoutes";
import StudentRoutes from "./router/StudentRoutes";
import TeacherRoutes from "./router/TeacherRoutes";
import AdminRoutesDefinition from "./router/AdminRoutes/routes";
import StudentRoutesDefinition from "./router/StudentRoutes/routes";
import TeacherRoutesDefinition from "./router/TeacherRoutes/routes";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register";
import { ProviderGlobalUser } from "./context/ContextoGlobalUser/ContextoGlobalUser";
import { ProviderGlobalProjeto } from "./context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword/ResetPassword";
import ConfirmResetPassword from "./pages/Auth/ResetPassword/ConfirmResetPassword/ConfirmResetPassword";

function Routes() {
    return (
        <Switch>
            <Route path="/" Component={Login} />
            <Route path="/cadastre-se" Component={Register} />
            <Route path="/redefinir-senha" Component={ResetPassword} />
            <Route path='/redefinir-senha/confirmar/:token' Component={ConfirmResetPassword}/>

            {/* Admin Routes */}
            <Route path="/admin/*" element={
                <ProviderGlobalProjeto>
                    <ProviderGlobalUser>
                        <AdminRoutes>
                            <AdminRoutesDefinition />
                        </AdminRoutes>
                    </ProviderGlobalUser>
                </ProviderGlobalProjeto>
            } />

            {/* Student Routes */}
            <Route path="/aluno/*" element={
                <ProviderGlobalProjeto>
                    <ProviderGlobalUser>
                        <StudentRoutes>
                            <StudentRoutesDefinition />
                        </StudentRoutes>
                    </ProviderGlobalUser>
                </ProviderGlobalProjeto>
            } />

            {/* Teacher Routes */}
            <Route path="/professor/*" element={
                <ProviderGlobalProjeto>
                    <ProviderGlobalUser>
                        <TeacherRoutes>
                            <TeacherRoutesDefinition />
                        </TeacherRoutes>
                    </ProviderGlobalUser>
                </ProviderGlobalProjeto>
            } />
        </Switch>
    );
}

export default Routes;