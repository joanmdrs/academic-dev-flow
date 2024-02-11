import React from "react";
import MyMenu from "../../components/Menu/Menu";
import { Layout } from 'antd';
import MyHeader from "../../components/Header/Header";
import PageEtapa from "./PageEtapa";

const Etapa = () => {

    return (
        <React.Fragment>
            <MyMenu/>
            <Layout>
                <MyHeader/>
                <PageEtapa />
            </Layout>
        </React.Fragment>
      
    )
}

export default Etapa