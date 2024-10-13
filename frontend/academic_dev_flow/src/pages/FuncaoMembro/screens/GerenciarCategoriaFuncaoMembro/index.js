import React from "react";
import {Layout} from 'antd'
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import MyHeader from "../../../../components/Header/Header";
import GerenciarCategoriaFuncaoMembro from "./GerenciarCategoriaFuncaoMembro";
import { FuncaoMembroProvider } from "../../context/FuncaoMembroContexto"; 
const { Content } = Layout;

const ScreenGerenciarCategoriaFuncaoMembro = () => {

    return (
        <React.Fragment>
            <MenuAdmin/>
            <Layout>
                <MyHeader/>
                <Content>
                    <FuncaoMembroProvider>
                        <GerenciarCategoriaFuncaoMembro />
                    </FuncaoMembroProvider>
                </Content>
            </Layout>
        </React.Fragment>
        
    )
}   

export default ScreenGerenciarCategoriaFuncaoMembro