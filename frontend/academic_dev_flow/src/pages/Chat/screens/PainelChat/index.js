import React from "react";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import { Layout } from "antd";
import MyHeader from "../../../../components/Header/Header";
import PainelChat from "./PainelChat";
import { ProviderChat } from "../../context/ContextoChat";
const { Content } = Layout

const ScreenChats = () => {
    
    return (
        <React.Fragment>
         
            <ProviderChat>
                <PainelChat />
            </ProviderChat>
        </React.Fragment>   
    )
}

export default ScreenChats