import React from "react";
import MyMenu from "../../components/Menu/Menu";
import { Layout } from 'antd';
import MyHeader from "../../components/Header/Header";
import GerenciarMembros from "./screens/GerenciarMembros/GerenciarMembros";
import { MembroProvider } from "./context/MembroContexto";

const Membro = () => {

    return (
        <React.Fragment>
            <MyMenu/>
            <Layout>
                <MyHeader/>
                <MembroProvider>
                    <GerenciarMembros />
                </MembroProvider>
            </Layout>
        </React.Fragment>
      
    )
}

export default Membro