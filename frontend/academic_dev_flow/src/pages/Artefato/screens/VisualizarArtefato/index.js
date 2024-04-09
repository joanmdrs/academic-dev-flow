import React from "react";
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import MyHeader from "../../../../components/Header/Header";
import {Layout} from 'antd'
import { ProviderArtefato } from "../../context/ContextoArtefato";
import VisualizarArtefato from "./VisualizarArtefato";

const {Content} = Layout

const ScreenVisualizarArtefato = () => {
    return (
        <React.Fragment>
            <MenuAdmin/>
            <Layout>
                <MyHeader/>
                <Content>
                    <ProviderArtefato>
                        <VisualizarArtefato />
                    </ProviderArtefato>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenVisualizarArtefato