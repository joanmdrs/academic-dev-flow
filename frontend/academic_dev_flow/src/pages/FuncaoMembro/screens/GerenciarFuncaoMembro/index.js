import React from "react";
import {Layout} from 'antd'
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import MyHeader from "../../../../components/Header/Header";
import { FuncaoMembroProvider } from "../../context/FuncaoMembroContexto"; 
import GerenciarFuncaoMembro from "./GerenciarFuncaoMembro";
const { Content } = Layout;

const ScreenGerenciarFuncaoMembro = () => {
    
    return (
        <React.Fragment>
            <MenuAdmin/>
            <Layout>
                <MyHeader/>
                <Content>
                    <FuncaoMembroProvider>
                        <GerenciarFuncaoMembro />
                    </FuncaoMembroProvider>
                </Content>
            </Layout>
        </React.Fragment>
        
    )
}   

export default ScreenGerenciarFuncaoMembro