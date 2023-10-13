import React from 'react';
import { Button, Modal, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const Confirm = () => {
  const [modal, contextHolder] = Modal.useModal();
  const confirm = () => {
    modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Deseja prosseguir com esta ação ?',
      okText: 'Ok',
      cancelText: 'Cancelar',
    });
  };
  return (
    <>
      <Space>
        <Button onClick={confirm}>Confirm</Button>
      </Space>
      {contextHolder}
    </>
  );
};
export default Confirm;