import React from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const Delete = ({onClick, disabled}) => {
    return (
      <Button 
        type='primary' 
        icon={<DeleteOutlined />} 
        onClick={onClick} 
        disabled={disabled}
        danger>
      </Button>
    );
  };
  
  export default Delete;