import React from "react";
import { Layout } from "antd";
import MyHeader from "../../../../components/Header/Header";
import { Content } from "antd/es/layout/layout";
import { ProviderIteracao } from "../../context/contextoIteracao";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";

const ScreenCronogramaIteracoes = () => {

    return (
        <React.Fragment>
            <MenuAluno />
            <Layout>
                <MyHeader/>
                <Content>
                   <ProviderIteracao>
                        < />
                   </ProviderIteracao>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenCronogramaIteracoes