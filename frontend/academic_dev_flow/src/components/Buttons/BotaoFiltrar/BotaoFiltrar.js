import { Button } from "antd";
import React from "react";
import { FaFilter } from "react-icons/fa";

const BotaoFiltrar = ({onClick, disabled}) => {

    return (
        <Button 
            type="default" 
            size="large"
            icon={<FaFilter />}
            onClick={onClick} 
            disabled={disabled}>
        </Button>
        
    )
}

export default BotaoFiltrar;