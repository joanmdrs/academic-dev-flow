import { Button } from "antd";
import React from "react";
import { FaFilter } from "react-icons/fa";

const BotaoFiltrar = ({funcao, status}) => {

    return (
        <Button 
            type="default" 
            size="large"
            icon={<FaFilter />}
            onClick={funcao} 
            disabled={status}>
        </Button>
        
    )
}

export default BotaoFiltrar;