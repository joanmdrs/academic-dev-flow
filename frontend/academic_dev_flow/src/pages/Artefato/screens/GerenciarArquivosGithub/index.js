import React from "react";
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import MyHeader from "../../../../components/Header/Header";
import {Layout} from 'antd'
import { ProviderArtefato } from "../../context/ContextoArtefato";
import GerenciarArquivosGithub from "./GerenciarArquivosGithub";
import { ProviderGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";

const {Content} = Layout

const ScreenGerenciarArquivosGithub = () => {
    return (
        <React.Fragment>
            <MenuAdmin/>
            <Layout>
                <MyHeader/>
                <Content>
                    <ProviderGlobalProjeto>
                        <ProviderArtefato>
                            <GerenciarArquivosGithub />
                        </ProviderArtefato>
                    </ProviderGlobalProjeto>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenGerenciarArquivosGithub