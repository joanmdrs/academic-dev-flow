import React from "react";
import GerenciarCategoriaFuncaoMembro from "./GerenciarCategoriaFuncaoMembro";
import { FuncaoMembroProvider } from "../../context/FuncaoMembroContexto"; 

const ScreenGerenciarCategoriaFuncaoMembro = () => {

    return (
        <React.Fragment>

            <FuncaoMembroProvider>
                <GerenciarCategoriaFuncaoMembro  />
            </FuncaoMembroProvider>
               
        </React.Fragment>
        
    )
}   

export default ScreenGerenciarCategoriaFuncaoMembro