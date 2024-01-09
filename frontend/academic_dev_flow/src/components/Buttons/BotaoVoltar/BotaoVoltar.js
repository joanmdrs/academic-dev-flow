import { Button } from "antd";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import "./BotaoVoltar.css";

const BotaoVoltar = ({onClick}) => {

    return (
        <Button 
            id="botao-voltar"
            type="default" 
            size="large"
            icon={<IoMdArrowBack />}
            onClick={onClick}
            
        >
        </Button>
        
    )
}

export default BotaoVoltar;