import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import "./BotaoAdicionar.css";

const BotaoAdicionar = ({ funcao, status}) => {
    return (
      <Button 
        className='botao-adicionar'
        size="large"
        type="default" 
        icon={<PlusOutlined />} 
        onClick={funcao} 
        disabled={status}>
      </Button>
    );
  };
  
  export default BotaoAdicionar;