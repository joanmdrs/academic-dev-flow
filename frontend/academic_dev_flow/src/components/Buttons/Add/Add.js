import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const Add = ({ onClick }) => {
    return (
      <Button type="default" icon={<PlusOutlined />} onClick={onClick}>
      </Button>
    );
  };
  
  export default Add;