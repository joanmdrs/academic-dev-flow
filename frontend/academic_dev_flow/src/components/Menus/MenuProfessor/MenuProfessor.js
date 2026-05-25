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
                {!collapsed && <span>AcademicDevFlow</span>}
            </div>
            <Menu
                theme={theme}
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
                    <Menu.Item key="gerenciar-fluxos">
                        <Link to="/fluxos">Gerenciar fluxos</Link>
                    </Menu.Item>

                    <Menu.Item key="gerenciar-etapas">
                        <Link to="/etapas">Gerenciar etapas</Link>
                    </Menu.Item>

                    <Menu.Item key="gerenciar-transicoes">
                        <Link to="/transicoes">Gerenciar transições</Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu
                    className="item-menu"
                    key="cronograma"
                    icon={<LuCalendarDays size="20px" />}
                    title="Cronograma"
                >
                    <Menu.Item key="/professor/cronograma/lancamentos">
                        <Link to="/professor/cronograma/lancamentos">Lançamentos</Link>
                    </Menu.Item>

                    <Menu.Item key="/professor/cronograma/iteracoes">
                        <Link to="/professor/cronograma/iteracoes">Iterações</Link>
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

                    <Menu.Item key="tarefas/categorias">
                        <Link to="/tarefas/categorias">Categorias</Link>
                    </Menu.Item>

                    <Menu.Item key="tarefas/tags"> 
                        <Link to="/tarefas/tags">Tags</Link>
                    </Menu.Item>
                </SubMenu>

                <Menu.Item
                    className="item-menu"
                    key='/professor/artefatos'
                    icon={<LuFileCode2 size="20px" />}
                >
                    <Link to="/professor/artefatos">Artefatos</Link>
                </Menu.Item>

                <Menu.Item
                    className="item-menu"
                    key="/professor/chats"
                    icon={<LuMessagesSquare size="20px"/> }
                >
                    <Link to="/professor/chats">Chats</Link>
                </Menu.Item>

                <SubMenu
                    className="item-menu"
                    key="membros"
                    icon={<LuUsers size="20px" />}
                    title="Membros"
                >
                    <Menu.Item key="/professor/membros/gerenciar">
                        <Link to="/professor/membros/gerenciar">Membros</Link>
                    </Menu.Item>

                    <Menu.Item key="/professor/membros/equipes">
                        <Link to="/professor/membros/equipes">Equipes</Link>
                    </Menu.Item>

                    <Menu.Item key="/professor/membros/funcoes">
                        <Link to="/professor/membros/funcoes">Funções</Link>
                    </Menu.Item>
                </SubMenu>

                <Menu.Item
                    className="item-menu"
                    key='/professor/feedbacks'
                    icon={<LuMessageSquare size="20px" />}
                >
                    <Link to="/professor/feedbacks">Feedbacks</Link>
                </Menu.Item>
                                
                {/* <Menu.Item 
                    className="item-menu" 
                    key="/professor/github-integration" 
                    icon={<LuGithub size="20px" />}
                >
                    <Link to="/professor/github-integration">GitHub</Link>
                </Menu.Item> */}
            </Menu>
        </Sider>
    );
}

export default MenuProfessor;
