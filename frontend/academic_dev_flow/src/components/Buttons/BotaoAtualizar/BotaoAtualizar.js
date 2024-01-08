import { Button } from "antd";
import React from "react";
import { MdEdit } from "react-icons/md";

const BotaoAtualizar = ({ onClick, disabled}) => {
    return (
      <Button type="default" icon={<MdEdit />} onClick={onClick} disabled={disabled}>
      </Button>
    );
  };

export default BotaoAtualizar;