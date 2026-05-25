import React from "react";
import { FuncaoMembroProvider } from "../../context/FuncaoMembroContexto"; 
import GerenciarFuncaoMembro from "./GerenciarFuncaoMembro";

const ScreenGerenciarFuncaoMembro = () => {
    
    return (
        <React.Fragment>
            <FuncaoMembroProvider>
                <GerenciarFuncaoMembro />
            </FuncaoMembroProvider>
        </React.Fragment>
        
    )
}   

export default ScreenGerenciarFuncaoMembro