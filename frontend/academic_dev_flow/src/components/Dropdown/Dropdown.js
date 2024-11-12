import { Avatar, Space } from "antd";
import React from "react";
import { FaCaretDown } from "react-icons/fa";
import { useContextoGlobalUser } from "../../context/ContextoGlobalUser/ContextoGlobalUser";
import { Dropdown } from "antd";

const MyDropdown = ({ items }) => {
  const { usuario } = useContextoGlobalUser();

  return (
    <Space style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <Avatar src={`https://avatar.iran.liara.run/public/${usuario?.avatar}`} />
      <span> {usuario?.nome} </span>
      
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
