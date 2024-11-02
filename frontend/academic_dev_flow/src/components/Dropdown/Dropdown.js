import { Avatar, Dropdown, Space } from "antd";
import React from "react";
import { DownOutlined } from '@ant-design/icons';
import { useContextoGlobalUser } from "../../context/ContextoGlobalUser/ContextoGlobalUser";
import { FaCaretDown } from "react-icons/fa";

const MyDropdown = ({ items }) => {
  const {usuario} = useContextoGlobalUser()
  
  return (
    <Dropdown trigger={['click']} menu={{items}}>
      <Space style={{display: 'flex', gap: '10px'}}>
        <Avatar src={`https://avatar.iran.liara.run/public/${usuario?.avatar}`} />
        <span> {usuario?.nome} </span>   
        <span style={{cursor: 'pointer'}}> <FaCaretDown/> </span>
      </Space>
       
    </Dropdown>
  );
};

export default MyDropdown;
