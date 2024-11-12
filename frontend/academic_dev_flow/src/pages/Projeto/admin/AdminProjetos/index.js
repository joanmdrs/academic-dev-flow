import React from "react";
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import { Layout } from "antd";
import MyHeader from "../../../../components/Header/Header";
import { ProviderProjeto } from "../../context/ContextoProjeto";
import AdminProjetos from "./AdminProjetos";

const ScreenAdminProjetos = () => {


    return (
        <React.Fragment>
            <MenuAdmin />
            <Layout>
                <MyHeader />
                <ProviderProjeto>
                    <AdminProjetos />
                </ProviderProjeto>
            </Layout>
            
        </React.Fragment>
        
    )
}

export default ScreenAdminProjetos