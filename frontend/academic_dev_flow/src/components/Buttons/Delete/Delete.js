import React from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const Delete = ({ onClick }) => {
    return (
      <Button type="default" icon={<DeleteOutlined />} onClick={onClick} disabled>
      </Button>
    );
  };
  
  export default Delete;