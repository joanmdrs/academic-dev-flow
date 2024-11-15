import React from "react";
import { ProviderGlobalUser } from "../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import PerfilMembro from "./PerfilMembro";
import { MembroProvider } from "../../context/MembroContexto";
import MyHeader from "../../../../components/Header/Header";
import { Layout } from "antd";
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import CustomBreadcrumb from "../../../../components/Breadcrumb/Breadcrumb";

const ScreenPerfilMembro = ({grupo}) => {

    const breadcrumbRoutes = [
        { title: 'Home', path: `/${grupo}/home` },
        { title: 'Perfil', path: `/${grupo}/perfil` },
    ];

    
    return (
        <React.Fragment>
            { grupo === 'admin' && <MenuAdmin />}
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}
            <Layout>
                <MyHeader/>
                <ProviderGlobalUser>
                    <MembroProvider>
                        <PerfilMembro/>
                    </MembroProvider>
                </ProviderGlobalUser>
            </Layout>
        </React.Fragment>
    )
}

export default ScreenPerfilMembro