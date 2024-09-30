import React from "react";
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import { Layout } from "antd";
import MyHeader from "../../../../components/Header/Header";
import { Content } from "antd/es/layout/layout";
import GerenciarIteracoes from "./GerenciarIteracoes";
import { ProviderIteracao } from "../../context/contextoIteracao";
import { ProviderGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";

const ScreenGerenciarIteracoes = () => {

    return (
        <React.Fragment>
            <MenuAdmin/>
            <Layout>
                <MyHeader/>
                <Content>
                    <ProviderGlobalProjeto>
                        <ProviderIteracao>
                            <GerenciarIteracoes />
                    </ProviderIteracao>
                    </ProviderGlobalProjeto>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenGerenciarIteracoes