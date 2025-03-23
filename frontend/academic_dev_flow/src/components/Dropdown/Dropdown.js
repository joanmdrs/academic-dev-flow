import { Avatar, Space, Tooltip } from "antd";
import React from "react";
import { FaCaretDown } from "react-icons/fa";
import { useContextoGlobalUser } from "../../context/ContextoGlobalUser/ContextoGlobalUser";
import { Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";

const MyDropdown = ({ items }) => {
  const { usuario } = useContextoGlobalUser();

  console.log(usuario)
  return (
    <Space style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <Tooltip placement="left" title={usuario?.nome}>
        <Avatar style={{backgroundColor: 'var(--primary-color)'}}>
          {usuario?.nome ? usuario.nome.charAt(0).toUpperCase() : <UserOutlined />}
        </Avatar>
      </Tooltip>
      
      {/* Dropdown surrounding only the icon */}
      <Dropdown trigger={['click']} menu={{ items }}>
        <span style={{ cursor: 'pointer' }}>
          <FaCaretDown />
        </span>
      </Dropdown>
    </Space>
  );
};

export default MyDropdown;
