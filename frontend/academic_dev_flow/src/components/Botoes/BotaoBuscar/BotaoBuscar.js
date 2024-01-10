import React from "react";
import './BotaoBuscar.css';
import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const BotaoBuscar = ({funcao, status, nome}) => {
    return (
        <Button 
            className="botao-buscar" 
            type="default" 
            icon={<SearchOutlined />} 
            onClick={funcao}
            disabled={status}>
            {nome}
        </Button>
    );
}

export default BotaoBuscar;