import React from "react";
import MyMenu from "../../components/Menu/Menu";
import { Layout } from 'antd';
import MyHeader from "../../components/Header/Header";
import PageArtefato from "./PageArtefato";

const Artefato = () => {

    return (
        <React.Fragment>
            <MyMenu/>
            <Layout>
                <MyHeader/>
                <PageArtefato />
            </Layout>
        </React.Fragment>
      
    )
}

export default Artefato