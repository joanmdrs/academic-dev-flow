import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const Add = ({ onClick, disabled}) => {
    return (
      <Button type="default" icon={<PlusOutlined />} onClick={onClick} disabled={disabled}>
      </Button>
    );
  };
  
  export default Add;