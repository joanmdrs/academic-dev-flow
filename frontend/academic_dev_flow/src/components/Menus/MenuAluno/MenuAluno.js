import { Menu, Space } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';

import { FaCoffee } from "react-icons/fa";
import { LuClipboardList } from "react-icons/lu";
import { LuFileCode2 } from "react-icons/lu";
import { LuFolder } from "react-icons/lu";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuWorkflow } from "react-icons/lu";
import { LuCalendarDays } from "react-icons/lu";
import { LuGithub } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { useContextoGlobalTheme } from "../../../context/ContextoTheme/ContextoTheme";

const { SubMenu } = Menu;

const MenuAluno = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const {theme} = useContextoGlobalTheme()

    return (
        <Sider 
            style={{borderRight: '1px solid #ddd'}}
            theme={theme}
            width={250} 
            collapsible 
            collapsed={collapsed} 
            onCollapse={(value) => setCollapsed(value)}
        >
            <div 
                style={{
                    display: "flex", 
                    justifyContent: "center",
                    alignItems: "center",
                    gap: '10px',
                    padding: "10px",
                    color: `${ theme === 'light' ? 'var(--primary-color)' : '#FFFFFF'}`,
                    height: '64px'
                }} 
            >
                <span> <FaCoffee size="25px" /> </span>
            
                {!collapsed && <span>Academic Dev Flow</span>}
            </div>
            <Menu

                theme={theme}
                mode="inline"
                style={{
                    marginTop: "20px"
                }}
                selectedKeys={[location.pathname]}
            >
                <Menu.Item
                    className='item-menu'
                    key='/aluno/home'
                    icon={<LuLayoutDashboard size="20px"/>}
                >
                    <Link to="/aluno/home">Dashboard</Link>
                </Menu.Item>
               
                <Menu.Item
                    className="item-menu"
                    key="/aluno/meus-projetos"
                    icon={<LuFolder size="20px"/>}
                >
                    <Link to="/aluno/meus-projetos">Projetos</Link>
                </Menu.Item>
        
                <SubMenu
                    className="item-menu"
                    key="/aluno/fluxos"
                    icon={<LuWorkflow style={{ fontSize: "20px" }} />}
                    title="Fluxos"
                >
                    <Menu.Item key="gerenciar-fluxos">
                        <Link to="/aluno/fluxos/gerenciar">Gerenciar fluxos</Link>
                    </Menu.Item>

                    <Menu.Item key="etapas">
                        <Link to="/aluno/etapas">Gerenciar etapas</Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu
                    className="item-menu"
                    key="/aluno/cronograma/"
                    icon={<LuCalendarDays size="20px" />}
                    title="Cronograma"
                >
                     <Menu.Item key="gerenciar-releases">
                        <Link to="/aluno/cronograma/releases">Releases</Link>
                    </Menu.Item>

                    <Menu.Item key="gerenciar-iterations">
                        <Link to="/aluno/cronograma/iterations">Iterações</Link>
                    </Menu.Item>

                </SubMenu>

                <Menu.Item
                    className='item-menu'
                    key='/aluno/tarefas'
                    icon={<LuClipboardList size="20px"/>}
                >
                    <Link to="/aluno/tarefas">Tarefas</Link>
                </Menu.Item>

                <Menu.Item
                    className="item-menu"
                    key='/aluno/artefatos'
                    icon={<LuFileCode2 size="20px" />}
                >
                    <Link to="/aluno/artefatos"> Artefatos </Link>
                </Menu.Item>

                <Menu.Item 
                    className="item-menu" 
                    key="/aluno/membros" 
                    icon={<LuUsers size="20px" />}
                >
                    <Link to="/aluno/membros"> Membros </Link>
                </Menu.Item>
                
                <Menu.Item 
                    className="item-menu" 
                    key="/aluno/github-integration" 
                    icon={<LuGithub size="20px" />}
                >
                    <Link to="/aluno/github-integration"> GitHub </Link>
                </Menu.Item>

            </Menu>
        </Sider>
    );
}

export default MenuAluno;
