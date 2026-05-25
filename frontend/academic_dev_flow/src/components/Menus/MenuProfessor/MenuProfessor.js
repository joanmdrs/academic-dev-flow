import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { FaCoffee } from "react-icons/fa";
import { LuClipboardList, LuFileCode2, LuFolder, LuLayoutDashboard, LuWorkflow, LuCalendarDays, LuGithub, LuUsers, LuMessageSquare, LuMessagesSquare } from "react-icons/lu";
import { useContextoGlobalTheme } from "../../../context/ContextoTheme/ContextoTheme";

const { SubMenu } = Menu;

const MenuProfessor = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const { theme } = useContextoGlobalTheme();

    return (
        <Sider 
            theme="dark"
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
                {!collapsed && <span>AcademicDevFlow</span>}
            </div>
            <Menu
                theme="dark"
                mode="inline"
                style={{ marginTop: "20px" }}
                selectedKeys={[location.pathname]}
            >
                <Menu.Item
                    className='item-menu'
                    key='/home'
                    icon={<LuLayoutDashboard size="20px" />}
                >
                    <Link to="/home">Home</Link>
                </Menu.Item>
               
                <Menu.Item
                    className="item-menu"
                    key="/projetos"
                    icon={<LuFolder size="20px" />}
                >
                    <Link to="/projetos">Projetos</Link>
                </Menu.Item>
        
                <SubMenu
                    className="item-menu"
                    key="fluxos"
                    icon={<LuWorkflow style={{ fontSize: "20px" }} />}
                    title="Fluxos"
                >
                    <Menu.Item key="/fluxos">
                        <Link to="/fluxos">Fluxos</Link>
                    </Menu.Item>

                    <Menu.Item key="/etapas">
                        <Link to="/etapas">Etapas</Link>
                    </Menu.Item>

                    <Menu.Item key="/transicoes">
                        <Link to="/transicoes">Transições</Link>
                    </Menu.Item>

                    <Menu.Item key="/visualizar-fluxo">
                        <Link to="/visualizar-fluxo">Visualizar</Link>
                    </Menu.Item>

                </SubMenu>

                <SubMenu
                    className="item-menu"
                    key="cronograma"
                    icon={<LuCalendarDays size="20px" />}
                    title="Cronograma"
                >
                    <Menu.Item key="/cronograma/lancamentos">
                        <Link to="/cronograma/lancamentos">Lançamentos</Link>
                    </Menu.Item>

                    <Menu.Item key="/cronograma/iteracoes">
                        <Link to="/cronograma/iteracoes">Iterações</Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu
                    className="item-menu"
                    key="tarefas"
                    icon={<LuClipboardList size="20px" />}
                    title="Tarefas"
                >
                    <Menu.Item key="tarefas">
                        <Link to="/tarefas">Tarefas</Link>
                    </Menu.Item>

                    <Menu.Item key="/tarefas/categorias">
                        <Link to="/tarefas/categorias">Categorias</Link>
                    </Menu.Item>

                    <Menu.Item key="/tarefas/tags"> 
                        <Link to="/tarefas/tags">Tags</Link>
                    </Menu.Item>
                </SubMenu>

                <Menu.Item
                    className="item-menu"
                    key='/artefatos'
                    icon={<LuFileCode2 size="20px" />}
                >
                    <Link to="/artefatos">Artefatos</Link>
                </Menu.Item>

                <Menu.Item
                    className="item-menu"
                    key="/chats"
                    icon={<LuMessagesSquare size="20px"/> }
                >
                    <Link to="/chats">Chats</Link>
                </Menu.Item>

                <SubMenu
                    className="item-menu"
                    key="membros"
                    icon={<LuUsers size="20px" />}
                    title="Membros"
                >
                    {/* <Menu.Item key="/membros/gerenciar">
                        <Link to="/membros/gerenciar">Membros</Link>
                    </Menu.Item> */}

                    <Menu.Item key="/membros/equipes">
                        <Link to="/membros/equipes">Equipes</Link>
                    </Menu.Item>

                    <Menu.Item key="/membros/funcoes">
                        <Link to="/membros/funcoes">Funções</Link>
                    </Menu.Item>
                </SubMenu>

                <Menu.Item
                    className="item-menu"
                    key='/professor/feedbacks'
                    icon={<LuMessageSquare size="20px" />}
                >
                    <Link to="/feedbacks">Feedbacks</Link>
                </Menu.Item>
                                
                <Menu.Item 
                    className="item-menu" 
                    key="github-integration" 
                    icon={<LuGithub size="20px" />}
                >
                    <Link to="/github-integration">GitHub</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default MenuProfessor;
