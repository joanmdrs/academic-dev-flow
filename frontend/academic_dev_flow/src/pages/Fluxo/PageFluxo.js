import React from "react";
import { FormProvider } from "./context/Provider/FormProvider";
import { Layout } from 'antd';
import TabsFluxo from "./components/TabsFluxo/TabsFluxo"; 
import MyMenu from "../../components/Menu/Menu";
import MyHeader from "../../components/Header/Header";

const PageFluxo = () => {
    return (

        <React.Fragment>
            <MyMenu />
            <Layout>
                <MyHeader />
                <FormProvider> <TabsFluxo /> </FormProvider>
            </Layout>
        </React.Fragment>
        
    )
}

export default PageFluxo
