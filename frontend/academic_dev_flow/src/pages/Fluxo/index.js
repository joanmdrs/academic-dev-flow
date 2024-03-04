import React from "react";
import { Layout } from 'antd';
import MyMenu from "../../components/Menu/Menu";
import MyHeader from "../../components/Header/Header";
import { FluxoProvider } from "./context/Provider/Provider";
import TabsFluxo from "./screens/TabsFluxo/TabsFluxo"

const Fluxo = () => {
    return (

        <React.Fragment>
            <MyMenu />
            <Layout>
                <MyHeader />
                <FluxoProvider> <TabsFluxo /> </FluxoProvider>
            </Layout>
        </React.Fragment>
    )
}

export default Fluxo
