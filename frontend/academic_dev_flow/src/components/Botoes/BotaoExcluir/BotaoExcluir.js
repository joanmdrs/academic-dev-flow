import React from 'react';
import { Button, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const BotaoExcluir = ({funcao, status}) => {


    const [modal, contextHolder] = Modal.useModal();
    const confirm = () => {
      modal.confirm({
        title: 'Confirm',
        icon: <ExclamationCircleOutlined />,
        content: 'Deseja prosseguir com esta ação ?',
        okText: 'Ok',
        onOk: () => {
          funcao()
        }
      });
    }
    
    return (
      <>
        <Button 
          type='primary'
          className='botao-de-acao'
          size='large'
          icon={<DeleteOutlined />} 
          onClick={confirm} 
          disabled={status}
          danger>
        </Button>
        {contextHolder}
      </>
      
    );
  };
  
  export default BotaoExcluir;