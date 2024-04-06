import React from "react";
import { Layout } from 'antd';
import MyHeader from "../../components/Header/Header";
import { FluxoProvider } from "./context/Provider/Provider";
import TabsFluxo from "./screens/TabsFluxo/TabsFluxo"
import MenuAdmin from "../../components/Menus/MenuAdmin/MenuAdmin";

const Fluxo = () => {
    return (

        <React.Fragment>
            <MenuAdmin />
            <Layout>
                <MyHeader />
                <FluxoProvider> <TabsFluxo /> </FluxoProvider>
            </Layout>
        </React.Fragment>
    )
}

export default Fluxo
