import React from "react";
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import MyHeader from "../../../../components/Header/Header";
import {Layout} from 'antd'
import { ProviderArtefato } from "../../context/ContextoArtefato";
import GerenciarArquivosGithub from "./GerenciarArquivosGithub";

const {Content} = Layout

const ScreenGerenciarArquivosGithub = () => {
    return (
        <React.Fragment>
            <MenuAdmin/>
            <Layout>
                <MyHeader/>
                <Content>
                    <ProviderArtefato>
                        <GerenciarArquivosGithub />
                    </ProviderArtefato>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenGerenciarArquivosGithub