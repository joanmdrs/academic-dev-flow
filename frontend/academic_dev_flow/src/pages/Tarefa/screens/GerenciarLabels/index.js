import React from "react";
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import {Layout} from 'antd'
import MyHeader from "../../../../components/Header/Header";
import { ProviderTarefa } from "../../context/ContextoTarefa";
import GerenciarLabels from "./GerenciarLabels";
const {Content} = Layout

const ScreenGerenciarLabels = () => {

    return (
        <React.Fragment>
            <MenuAdmin/>
            <Layout>
                <MyHeader/>
                <Content>
                    <ProviderTarefa>
                        {/* <GerenciarLabels /> */}
                    </ProviderTarefa>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenGerenciarLabels