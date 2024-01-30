import { Button } from "antd";
import React from "react";
import { MdEdit } from "react-icons/md";

const BotaoAtualizar = ({ funcao, status}) => {
    return (
      <Button 
        type="default" 
        size="large"
        icon={<MdEdit />} 
        onClick={funcao} 
        disabled={status}>
      </Button>
    );
  };

export default BotaoAtualizar;