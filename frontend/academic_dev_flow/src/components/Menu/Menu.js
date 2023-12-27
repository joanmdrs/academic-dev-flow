import React from 'react';
import { Menu } from 'antd';
import {HiOutlineClipboardList} from "react-icons/hi"
import {DiScrum} from "react-icons/di"
import { BiGroup } from "react-icons/bi";
import './Menu.css';

const { SubMenu } = Menu;

const MyMenu = () => {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['projeto']}>

      <Menu.Item key="projeto" icon={<HiOutlineClipboardList style={{ fontSize: '20px' }} />}>
        <a href="/projetos">Projeto</a>
      </Menu.Item>

      <Menu.Item key="fluxos" icon={<DiScrum style={{ fontSize: '25px' }} />}>
        <a href="/fluxos">Fluxos</a>
      </Menu.Item>

      <SubMenu key="membros" icon={<BiGroup style={{ fontSize: '20px' }} />} title="Membros">
        <Menu.Item key="submenu-item-1">
          <a href="/membros/submenu-item-1">Submenu Item 1</a>
        </Menu.Item>
        <Menu.Item key="submenu-item-2">
          <a href="/membros/submenu-item-2">Submenu Item 2</a>
        </Menu.Item>
        {/* Adicione mais itens de submenu conforme necessário */}
      </SubMenu>

    </Menu>
  );
};

export default MyMenu;
