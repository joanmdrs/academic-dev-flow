import React from "react";
import MyMenu from "../../components/Menu/Menu";
import { Layout } from 'antd';
import MyHeader from "../../components/Header/Header";
import PageMembro from "./PageMembro";

const Membro = () => {

    return (
        <React.Fragment>
            <MyMenu/>
            <Layout>
                <MyHeader/>
                <PageMembro />
            </Layout>
        </React.Fragment>
      
    )
}

export default Membro