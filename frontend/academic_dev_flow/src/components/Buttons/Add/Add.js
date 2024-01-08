import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import "./Add.css";

const Add = ({ onClick, disabled}) => {
    return (
      <Button 
        className='botao-adicionar'
        size="large"
        type="default" 
        icon={<PlusOutlined />} 
        onClick={onClick} 
        disabled={disabled}>
      </Button>
    );
  };
  
  export default Add;