import React from "react";
import { ProjetoProvider } from "./context/Provider/Provider";
import TabsProjeto from "./screens/TabsProjeto/TabsProjeto";
import MyHeader from "../../components/Header/Header";
import { Layout } from "antd";
import MenuAdmin from "../../components/Menus/MenuAdmin/MenuAdmin";

const Projeto = () => {

    return (
        <React.Fragment>
            <MenuAdmin />
            <Layout>
                <MyHeader />
                <ProjetoProvider> <TabsProjeto /> </ProjetoProvider>
            </Layout>
            
        </React.Fragment>
        
    )
}

export default Projeto