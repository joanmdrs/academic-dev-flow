import React from "react";
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import { Layout } from "antd";
import MyHeader from "../../../../components/Header/Header";
import { ProviderProjeto } from "../../context/ContextoProjeto";
import GerenciarProjetos from "./GerenciarProjetos";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";

const ScreenGerenciarProjetos = ({grupo}) => {


    return (
        <React.Fragment>
            { grupo === "discente" && <MenuAluno />}
            { grupo === "admin" && <MenuAdmin />}
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