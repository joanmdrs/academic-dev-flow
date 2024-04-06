import React from "react";
import { Layout } from 'antd';
import MyHeader from "../../../../components/Header/Header";
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import { Content } from "antd/es/layout/layout";
import VincularMembroAoProjeto from "./VincularMembroAoProjeto";

const ScreenVincularMembroAoProjeto = () => {

    return (
        <React.Fragment>
            <MenuAdmin/>
            <Layout>
                <MyHeader/>
                <Content>
                    <VincularMembroAoProjeto />
                </Content>
            </Layout>
        </React.Fragment>
      
    )
}

export default ScreenVincularMembroAoProjeto