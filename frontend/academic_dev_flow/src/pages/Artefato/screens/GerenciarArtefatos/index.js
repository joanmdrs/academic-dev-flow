import React from "react";
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import MyHeader from "../../../../components/Header/Header";
import {Layout} from 'antd'
import { ProviderArtefato } from "../../context/ContextoArtefato";
import GerenciarArtefatos from "./GerenciarArtefatos";
import { ProviderGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";

const {Content} = Layout

const ScreenGerenciarArtefatos = () => {
    
    return (
        <React.Fragment>
            <MenuAdmin/>
            <Layout>
                <MyHeader/>
                <Content>
                    <ProviderGlobalProjeto>
                        <ProviderArtefato>
                            <GerenciarArtefatos />
                        </ProviderArtefato>
                    </ProviderGlobalProjeto>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenGerenciarArtefatos