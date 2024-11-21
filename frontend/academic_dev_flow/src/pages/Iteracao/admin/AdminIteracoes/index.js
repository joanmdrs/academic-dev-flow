import React from "react";
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import { Layout } from "antd";
import MyHeader from "../../../../components/Header/Header";
import { ProviderIteracao } from "../../context/contextoIteracao";
import AdminIteracoes from "./AdminIteracoes";

const {Content} = Layout

const ScreenAdminIteracoes = () => {

    return (
        <React.Fragment>
            <MenuAdmin/>
            <Layout>
                <MyHeader/>
                <Content>
                    <ProviderIteracao>
                        <AdminIteracoes />
                    </ProviderIteracao>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenAdminIteracoes