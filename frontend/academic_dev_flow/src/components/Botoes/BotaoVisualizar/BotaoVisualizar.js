import React from 'react';
import { Button } from 'antd';
import { AiOutlineFileSearch } from "react-icons/ai";

const BotaoVisualizar = ({ funcao, status}) => {
    return (
      <Button 
        size="large"
        type="default" 
        icon={<AiOutlineFileSearch />} 
        onClick={funcao} 
        disabled={status}>
      </Button>
    );
  };
  
  export default BotaoVisualizar;