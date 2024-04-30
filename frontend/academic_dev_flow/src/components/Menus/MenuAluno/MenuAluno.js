import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdFormatListBulleted } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import SubMenu from "antd/es/menu/SubMenu";

const MenuAluno = () => {
    const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider width={250} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div 
            style={{
            display: "flex", 
            flex: '1',
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            color: "#FFFFFF",
            height: '64px',
            }} className="demo-logo-vertical">
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
                icon={<MdOutlineSpaceDashboard style={{ fontSize: "20px" }} />}
                title="Projetos"
            >
                <Menu.Item key="gerenciar-projetos">
                    <Link to="/aluno/projetos/gerenciar">Gerenciar</Link>
                </Menu.Item>
                
                <Menu.Item key="meus-projetos">
                    <Link to="/aluno/projetos/meus-projetos">Meus Projetos</Link>
                </Menu.Item>


            </SubMenu>

            <Menu.Item
                className='item-menu'
                key='minhas-atividades'
                icon={<MdFormatListBulleted size="20px"/>}
            >
                <Link to="/aluno/atividades">Atividades</Link>
            </Menu.Item>

            <Menu.Item
                className='item-menu'
                key='meus-relatórios'
                icon={<HiOutlineDocumentReport size="20px"/>}
            >
                <Link to="/aluno/relatorios">Relatórios</Link>
            </Menu.Item>

      </Menu>
    </Sider>
  );
}

export default MenuAluno