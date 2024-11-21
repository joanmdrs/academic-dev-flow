import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { FaCoffee } from "react-icons/fa";
import { useContextoGlobalTheme } from "../../../context/ContextoTheme/ContextoTheme";
import { LuCalendarDays, LuClipboardList, LuFileCode2, LuFolder, LuGithub, LuLayoutDashboard, LuUsers, LuWorkflow } from "react-icons/lu";

const { SubMenu } = Menu;

const MenuAdmin = () => {
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
                    marginTop: "20px",
                }}
                selectedKeys={[location.pathname]}
            >
                <Menu.Item
                    className='item-menu'
                    key='/aluno/home'
                    icon={<LuLayoutDashboard size="20px"/>}
                >
                    <Link to="/admin/home">Home</Link>
                </Menu.Item>

                <Menu.Item
                    className="item-menu"
                    key="/admin/projetos"
                    icon={<LuFolder size="20px"/>}
                >
                    <Link to="/admin/projetos">Projetos</Link>
                </Menu.Item>

                <SubMenu
                    className="item-menu"
                    key="/admin/fluxos"
                    icon={<LuWorkflow style={{ fontSize: "20px" }} />}
                    title="Fluxos"
                >
                    <Menu.Item key="gerenciar-fluxos">
                        <Link to="/admin/fluxos/gerenciar">Gerenciar fluxos</Link>
                    </Menu.Item>

                    <Menu.Item key="etapas">
                        <Link to="/admin/fluxos/etapas">Gerenciar etapas</Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu
                    className="item-menu"
                    key="/admin/cronograma/"
                    icon={<LuCalendarDays size="20px" />}
                    title="Cronograma"
                >
                     <Menu.Item key="gerenciar-releases">
                        <Link to="/admin/cronograma/releases">Releases</Link>
                    </Menu.Item>

                    <Menu.Item key="gerenciar-iterations">
                        <Link to="/admin/cronograma/iterations">Iterações</Link>
                    </Menu.Item>

                </SubMenu>

                <SubMenu
                    className="item-menu"
                    key="admin/membros"    
                    icon={<LuUsers size="20px" />}
                    title="Membros"
                >
                    <Menu.Item key="/admin/membros/gerenciar">
                        <Link to="/admin/membros/gerenciar">Gerenciar membros</Link>
                    </Menu.Item>

                    <Menu.Item key="/admin/membros/vincular-projeto"> 
                        <Link to="/admin/membros/vincular-projeto">Vincular Projeto</Link>
                    </Menu.Item>

                    <SubMenu
                        className="item-menu"
                        key="admin/membros/funcoes"
                        title="Funções"
                    >
                        <Menu.Item key="/admin/membros/funcoes/gerenciar-categorias">
                            <Link to="/admin/membros/funcoes/gerenciar-categorias">Categorias</Link>
                        </Menu.Item>

                        <Menu.Item key="/admin/membros/funcoes/gerenciar-funcoes">
                            <Link to="/admin/membros/funcoes/gerenciar-funcoes">Gerenciar Funções</Link>
                        </Menu.Item>
                    </SubMenu>

                </SubMenu>

                <Menu.Item 
                    className="item-menu" 
                    icon={<LuFileCode2 size="20px" />} 
                    key="/admin/artefatos/gerenciar"
                    title="Artefatos"
                >
                    <Link to="/admin/artefatos/gerenciar">Artefatos</Link>
                </Menu.Item>

                <SubMenu
                    className='item-menu'
                    key='/admin/tarefas'
                    icon={<LuClipboardList size="20px"/>}
                    title="Tarefas"
                >
                    <Menu.Item key="/admin/tarefas/gerenciar">
                        <Link to="/admin/tarefas/gerenciar">Gerenciar tarefas</Link>
                    </Menu.Item>

                    <Menu.Item key="/admin/tarefas/gerenciar-categorias">
                        <Link to="/admin/tarefas/gerenciar-categorias"> Categorias </Link>
                    </Menu.Item>

                    <Menu.Item key="/admin/tarefas/tags"> 
                        <Link to="/admin/tarefas/tags"> Tags </Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu
                    className='item-menu'
                    key='/admin/github-integration/'
                    icon={<LuGithub size="20px" />}
                    title="GitHub"
                >
                    <Menu.Item
                        className="item-menu"
                        key="/admin/github-integration/issues"
                    >
                        <Link to="/admin/github-integration/issues"> Issues </Link>
                    </Menu.Item>

                    <Menu.Item
                        className="item-menu"
                        key="/admin/github-integration/contents"
                    >
                        <Link to="/admin/github-integration/contents"> Contents </Link>
                    </Menu.Item>

                    <Menu.Item
                        className="item-menu"
                        key="/admin/github-integration/commits"
                    >
                        <Link to="/admin/github-integration/commits"> Commits </Link>
                    </Menu.Item>
                </SubMenu>

            </Menu>
        </Sider>
    );
};

export default MenuAdmin;
