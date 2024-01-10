import { Button } from "antd";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import "./BotaoVoltar.css";

const BotaoVoltar = ({funcao}) => {

    return (
        <Button 
            id="botao-voltar"
            type="default" 
            size="large"
            icon={<IoMdArrowBack />}
            onClick={funcao}
            
        >
        </Button>
        
    )
}

export default BotaoVoltar;