import React, { useEffect, useState } from 'react';
import './Menu.css';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { HiOutlineClipboardList } from "react-icons/hi";
import { DiScrum } from "react-icons/di";
import { BiGroup } from "react-icons/bi";
import { SiAzureartifacts } from "react-icons/si";
import { BsBarChartSteps } from "react-icons/bs";
import Sider from 'antd/es/layout/Sider';
import { RiFlowChart } from "react-icons/ri";

const { SubMenu } = Menu;

const MyMenu = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider width={250} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div className="demo-logo-vertical">
        Academic Dev Flow
      </div>
      <Menu
        theme="dark"
        mode="inline"
        style={{
          marginTop: "20px"
        }}
      >
        <SubMenu 
          className='item-menu'
          key='projeto'
          icon={<HiOutlineClipboardList style={{ fontSize: '20px' }} />}
          title="Projetos"
        >

          <Menu.Item
            className='item-menu'
            key="projeto-antigo"
          >
            <Link to="/projetos/antigo">Projetos antigo</Link>
          </Menu.Item>

          <Menu.Item
            className='item-menu'
            key="projeto-novo"
          >
            <Link to="/projetos/novo">Projetos novo</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          className='item-menu'
          key="fluxo"
          icon={<RiFlowChart style={{ fontSize: '20px' }} />}
          title="Fluxos"
        >
          <Menu.Item key="gerenciar-fluxos">
            <Link to="/fluxos/gerenciar">Gerenciar fluxos</Link>
          </Menu.Item>
          <Menu.Item key="etapas">
            <Link to="/etapas">Gerenciar etapas</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item
          className='item-menu'
          key="membro"
          icon={<BiGroup style={{ fontSize: '20px' }} />}
        >
          <Link to="/membros">Membros</Link>
        </Menu.Item>
        <Menu.Item
          className='item-menu'
          key='artefato'
          icon={<SiAzureartifacts style={{ fontSize: '15px' }} />}
        >
          <Link to='/artefatos'>Artefatos</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default MyMenu;
