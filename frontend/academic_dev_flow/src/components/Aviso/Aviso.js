import React from "react";
import { Drawer, Button, Card } from "antd"; 

const Aviso = ({ titulo, descricao, visible, onClose }) => {

  return (
    <Drawer
      title={titulo}
      open={visible}
      onClose={onClose}
      placement="top"
      
    >
      <Card>
        <p>{descricao}</p>
        <Button type="primary" onClick={onClose}>Entendi</Button>
      </Card>
    </Drawer>
  );
};

export default Aviso;
