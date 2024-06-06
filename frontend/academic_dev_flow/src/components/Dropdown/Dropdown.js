import { Dropdown } from "antd";
import React from "react";
import { CgProfile } from "react-icons/cg";

const MyDropdown = ({ items }) => {
  
  return (
    <Dropdown trigger={['click']} menu={{items}}>
      <CgProfile size="30px" color='#ffffff' cursor="pointer" />
    </Dropdown>
  );
};

export default MyDropdown;
