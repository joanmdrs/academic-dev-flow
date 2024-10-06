import React from "react";
import {Layout} from 'antd'
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import MyHeader from "../../../../components/Header/Header";
import { ProviderGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import AdminIssues from "./AdminIssues";
const {Content} = Layout

const ScreenAdminIssues = () => {

    return (
        <React.Fragment>
            <MenuAdmin/>
            <Layout>
                <MyHeader/>
                <Content>
                    <ProviderGlobalProjeto>
                        <AdminIssues />
                    </ProviderGlobalProjeto>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenAdminIssues