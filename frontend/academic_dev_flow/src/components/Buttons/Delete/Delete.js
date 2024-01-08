import React from 'react';
import { Button, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const Delete = ({handleDelete, disabled}) => {


    const [modal, contextHolder] = Modal.useModal();
    const confirm = () => {
      modal.confirm({
        title: 'Confirm',
        icon: <ExclamationCircleOutlined />,
        content: 'Deseja prosseguir com esta ação ?',
        okText: 'Ok',
        onOk: () => {
          handleDelete()
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
          disabled={disabled}
          danger>
        </Button>
        {contextHolder}
      </>
      
    );
  };
  
  export default Delete;