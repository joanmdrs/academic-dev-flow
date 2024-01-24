import React, { useEffect, useState } from 'react';
import './Menu.css';
import { Menu } from 'antd';
import {HiOutlineClipboardList} from "react-icons/hi"
import {DiScrum} from "react-icons/di"
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

          <Menu.Item 
            className='item-menu'
            key="projeto" 
            icon={<HiOutlineClipboardList 
            style={{ fontSize: '20px'}}/>}
         >

            <a href="/projetos">Projetos</a>

          </Menu.Item>

          <SubMenu 
            className='item-menu'
            key="processo"
            icon={<RiFlowChart style={{ fontSize: '20px' }} />}
            title="Processos"
          >
            <Menu.Item key="fluxo" icon={<DiScrum size="25px"/>}>
            <a href="/fluxos">Fluxos</a>
            </Menu.Item>
            <Menu.Item key="etapa" icon={<BsBarChartSteps size="15px"/>}>
              <a href="/etapas">Etapas</a>
            </Menu.Item>
          </SubMenu>

          <Menu.Item
            className='item-menu' 
            key="membro" 
            icon={<BiGroup 
            style={{ fontSize: '20px' }}/>}
          >

            <a href="/membros">Membros</a>

          </Menu.Item>

          <Menu.Item
            className='item-menu'
            key='artefato'
            icon={<SiAzureartifacts style={{fontSize:'15px'}} />}
          >
            <a href='/artefatos'>Artefatos</a>
          </Menu.Item>

         
        </Menu>
      </Sider>
  );
};

export default MyMenu;
