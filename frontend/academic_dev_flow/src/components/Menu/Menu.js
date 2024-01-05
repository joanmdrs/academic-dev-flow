import React, { useEffect, useState } from 'react';
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

          <Menu.Item 
            className='item-menu'
            key="fluxo" 
            icon={<DiScrum 
            style={{ fontSize: '25px' }}/>}
          >
            <a href="/fluxos">Fluxos</a>
            
          </Menu.Item>

          <Menu.Item
            className='item-menu' 
            key="membro" 
            icon={<BiGroup 
            style={{ fontSize: '20px' }}/>}
          >

            <a href="/membros">Membros</a>

          </Menu.Item>

         
        </Menu>
      </Sider>
  );
};

export default MyMenu;
