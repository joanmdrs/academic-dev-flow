import { Button } from "antd";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";

const BotaoVoltar = ({onClick}) => {

    return (
        <Button 
            type="default" 
            size="large"
            icon={<IoMdArrowBack />}
            onClick={onClick}     
        >
        </Button>
        
    )
}

export default BotaoVoltar;