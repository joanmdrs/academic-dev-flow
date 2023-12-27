import React, { useState } from 'react';
import './Menu.css';
import { Menu } from 'antd';
import {HiOutlineClipboardList} from "react-icons/hi"
import {DiScrum} from "react-icons/di"
import { BiGroup } from "react-icons/bi";
import Sider from 'antd/es/layout/Sider';
const { SubMenu } = Menu;

const MyMenu = () => {

  const [collapsed, setCollapsed] = useState(false);

  return (
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>

        <div className="demo-logo-vertical">
          AcademicDevFlow
        </div>

        <Menu 
          theme="dark" 
          mode="inline" 
          defaultSelectedKeys={['projeto']}
        >
          <Menu.Item key="projeto" icon={<HiOutlineClipboardList style={{ fontSize: '20px' }} />}>
            <a href="/projetos">Projeto</a>
          </Menu.Item>

          <Menu.Item key="fluxos" icon={<DiScrum style={{ fontSize: '25px' }} />}>
            <a href="/fluxos">Fluxos</a>
          </Menu.Item>

          <SubMenu key="membros" icon={<BiGroup style={{ fontSize: '20px' }} />} title="Membros">
            <Menu.Item key="submenu-item-1">
              <a href="/membros/alunos">Alunos</a>
            </Menu.Item>
            <Menu.Item key="submenu-item-2">
              <a href="/membros/professores">Professores</a>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
  );
};

export default MyMenu;
