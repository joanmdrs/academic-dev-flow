import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { FaCoffee } from "react-icons/fa";
import { LuClipboardList, LuFileCode2, LuFolder, LuLayoutDashboard, LuWorkflow, LuCalendarDays, LuGithub, LuUsers } from "react-icons/lu";
import { useContextoGlobalTheme } from "../../../context/ContextoTheme/ContextoTheme";

const { SubMenu } = Menu;

const MenuAluno = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const { theme } = useContextoGlobalTheme();

    return (
        <Sider 
            style={{ borderRight: '1px solid #ddd' }}
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
                    color: `${theme === 'light' ? 'var(--primary-color)' : '#FFFFFF'}`,
                    height: '64px'
                }} 
            >
                <span><FaCoffee size="25px" /></span>
                {!collapsed && <span>Academic Dev Flow</span>}
            </div>
            <Menu
                theme={theme}
                mode="inline"
                style={{ marginTop: "20px" }}
                selectedKeys={[location.pathname]}
            >
                <Menu.Item
                    className='item-menu'
                    key='/aluno/home'
                    icon={<LuLayoutDashboard size="20px" />}
                >
                    <Link to="/aluno/home">Home</Link>
                </Menu.Item>
               
                <Menu.Item
                    className="item-menu"
                    key="/aluno/projetos"
                    icon={<LuFolder size="20px" />}
                >
                    <Link to="/aluno/projetos">Projetos</Link>
                </Menu.Item>
        
                <SubMenu
                    className="item-menu"
                    key="fluxos"
                    icon={<LuWorkflow style={{ fontSize: "20px" }} />}
                    title="Fluxos"
                >
                    <Menu.Item key="/aluno/fluxos/gerenciar">
                        <Link to="/aluno/fluxos/gerenciar">Gerenciar fluxos</Link>
                    </Menu.Item>

                    <Menu.Item key="/aluno/etapas">
                        <Link to="/aluno/etapas">Gerenciar etapas</Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu
                    className="item-menu"
                    key="cronograma"
                    icon={<LuCalendarDays size="20px" />}
                    title="Cronograma"
                >
                    <Menu.Item key="/aluno/cronograma/releases">
                        <Link to="/aluno/cronograma/releases">Releases</Link>
                    </Menu.Item>

                    <Menu.Item key="/aluno/cronograma/iterations">
                        <Link to="/aluno/cronograma/iterations">Iterações</Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu
                    className="item-menu"
                    key="tarefas"
                    icon={<LuClipboardList size="20px" />}
                    title="Tarefas"
                >
                    <Menu.Item key="/aluno/tarefas">
                        <Link to="/aluno/tarefas">Tarefas</Link>
                    </Menu.Item>

                    <Menu.Item key="/aluno/tarefas/categorias">
                        <Link to="/aluno/tarefas/categorias">Categorias</Link>
                    </Menu.Item>

                    <Menu.Item key="/aluno/tarefas/tags"> 
                        <Link to="/aluno/tarefas/tags">Tags</Link>
                    </Menu.Item>
                </SubMenu>

                <Menu.Item
                    className="item-menu"
                    key='/aluno/artefatos'
                    icon={<LuFileCode2 size="20px" />}
                >
                    <Link to="/aluno/artefatos">Artefatos</Link>
                </Menu.Item>

                <SubMenu
                    className="item-menu"
                    key="membros"
                    icon={<LuUsers size="20px" />}
                    title="Membros"
                >
                    <Menu.Item key="/aluno/membros/equipes">
                        <Link to="/aluno/membros/equipes">Equipes</Link>
                    </Menu.Item>

                    <Menu.Item key="/aluno/membros/funcoes">
                        <Link to="/aluno/membros/funcoes">Funções</Link>
                    </Menu.Item>
                </SubMenu>
                                
                {/* <Menu.Item 
                    className="item-menu" 
                    key="/aluno/github-integration" 
                    icon={<LuGithub size="20px" />}
                >
                    <Link to="/aluno/github-integration">GitHub</Link>
                </Menu.Item> */}
            </Menu>
        </Sider>
    );
}

export default MenuAluno;
