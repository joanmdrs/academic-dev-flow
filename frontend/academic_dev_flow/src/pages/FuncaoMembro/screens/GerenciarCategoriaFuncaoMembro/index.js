import React from "react";
import {Layout} from 'antd'
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import MyHeader from "../../../../components/Header/Header";
import GerenciarCategoriaFuncaoMembro from "./GerenciarCategoriaFuncaoMembro";
import { FuncaoMembroProvider } from "../../context/FuncaoMembroContexto"; 
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
const { Content } = Layout;

const ScreenGerenciarCategoriaFuncaoMembro = ({grupo}) => {

    return (
        <React.Fragment>
            { grupo === 'admin' && <MenuAdmin />}
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}
            <Layout>
                <MyHeader/>
                <Content>
                    <FuncaoMembroProvider>
                        <GerenciarCategoriaFuncaoMembro grupo={grupo} />
                    </FuncaoMembroProvider>
                </Content>
            </Layout>
        </React.Fragment>
        
    )
}   

export default ScreenGerenciarCategoriaFuncaoMembro