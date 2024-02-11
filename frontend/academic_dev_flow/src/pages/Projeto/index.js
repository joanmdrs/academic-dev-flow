import React from "react";
import { ProjetoProvider } from "./context/Provider/Provider";
import TabsProjeto from "./screens/TabsProjeto/TabsProjeto";
import MyMenu from "../../components/Menu/Menu";
import MyHeader from "../../components/Header/Header";

const Projeto = () => {

    return (
        <React.Fragment>
            <MyMenu />
            <Layout>
                <MyHeader />
                <ProjetoProvider> <TabsProjeto /> </ProjetoProvider>
            </Layout>
            
        </React.Fragment>
        
    )
}

export default Projeto