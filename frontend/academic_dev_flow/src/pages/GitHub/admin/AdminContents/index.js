import React from "react";
import {Layout} from 'antd'
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import MyHeader from "../../../../components/Header/Header";
import { ProviderGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import AdminContents from "./AdminContents";
const {Content} = Layout

const ScreenAdminContents = () => {

    return (
        <React.Fragment>
            <MenuAdmin/>
            <Layout>
                <MyHeader/>
                <Content>
                    <ProviderGlobalProjeto>
                        <AdminContents />
                    </ProviderGlobalProjeto>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenAdminContents