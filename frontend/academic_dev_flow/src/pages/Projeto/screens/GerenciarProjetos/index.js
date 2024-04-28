import React from "react";
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import { Layout } from "antd";
import MyHeader from "../../../../components/Header/Header";
import { ProjetoProvider, ProviderProjeto } from "../../context/ContextoProjeto";
import GerenciarProjetos from "./GerenciarProjetos";

const ScreenGerenciarProjetos = () => {

    return (
        <React.Fragment>
            <MenuAdmin />
            <Layout>
                <MyHeader />
                <ProviderProjeto>
                    <GerenciarProjetos />
                </ProviderProjeto>
            </Layout>
            
        </React.Fragment>
        
    )
}

export default ScreenGerenciarProjetos