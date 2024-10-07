import React from "react";
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import MyHeader from "../../../../components/Header/Header";
import {Layout} from 'antd'
import AdminArtefatos from "./AdminArtefatos";
import { ProviderGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { ProviderArtefato } from "../../context/ContextoArtefato";

const {Content} = Layout

const ScreenAdminArtefatos = () => {
    
    return (
        <React.Fragment>
            <MenuAdmin/>
            <Layout>
                <MyHeader/>
                <Content>
                    <ProviderGlobalProjeto>
                        <ProviderArtefato>
                            <AdminArtefatos />
                        </ProviderArtefato>
                    </ProviderGlobalProjeto>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenAdminArtefatos