import React from "react";
import { Spin } from "antd";

import AdminLayout from "./AdminLayout";
import AlunoLayout from "./AlunoLayout";
import ProfessorLayout from "./ProfessorLayout";
import { useAuth } from "../hooks/AuthProvider";

const LayoutBase = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <Spin fullscreen />;
    }

    if (!user) {
        return <div>Usuário não autenticado</div>;
    }

    switch (user.role) {
        case "admin":
            return <AdminLayout>{children}</AdminLayout>;

        case "aluno":
            return <AlunoLayout>{children}</AlunoLayout>;

        case "professor":
            return <ProfessorLayout>{children}</ProfessorLayout>;

        default:
            return <div>Perfil não reconhecido</div>;
    }
};

export default LayoutBase;