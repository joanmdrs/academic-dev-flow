import { Menu, Space } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { HiOutlineHome } from "react-icons/hi2";
import { LuLayoutGrid } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiFlowChart } from "react-icons/ri";
import { MdOutlineFolderOpen } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import { FaGithub } from "react-icons/fa";
import { FaCoffee } from "react-icons/fa";

const { SubMenu } = Menu;

const MenuAluno = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    return (
        <Sider width={250} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <Space 
                style={{
                    display: "flex", 
                    flex: '1',
                    justifyContent: "center",
                    alignItems: "center",
                    gap: '10px',
                    padding: "10px",
                    color: "#FFFFFF",
                    height: '64px',
                }} 
                className="demo-logo-vertical"
            >
                <FaCoffee size="25px" />
                {!collapsed && <span>Academic Dev Flow</span>}
            </Space>
            <Menu
                theme="dark"
                mode="inline"
                style={{
                    marginTop: "20px"
                }}
                selectedKeys={[location.pathname]}
            >
                <Menu.Item
                    className='item-menu'
                    key='/aluno/home'
                    icon={<HiOutlineHome size="20px"/>}
                >
                    <Link to="/aluno/home">Dashboard</Link>
                </Menu.Item>
               
                <Menu.Item
                    className="item-menu"
                    key="/aluno/meus-projetos"
                    icon={<MdOutlineFolderOpen size="20px"/>}
                >
                    <Link to="/aluno/meus-projetos">Projetos</Link>
                </Menu.Item>
        
                <SubMenu
                    className="item-menu"
                    key="/aluno/fluxos"
                    icon={<RiFlowChart style={{ fontSize: "20px" }} />}
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
                    icon={<IoCalendarOutline size="20px" />}
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
                    icon={<LuLayoutGrid size="20px"/>}
                >
                    <Link to="/aluno/tarefas">Tarefas</Link>
                </Menu.Item>

                <Menu.Item
                    className="item-menu"
                    key='/aluno/artefatos'
                    icon={<IoDocumentTextOutline size="20px" />}
                >
                    <Link to="/aluno/artefatos"> Artefatos </Link>
                </Menu.Item>

                <Menu.Item 
                    className="item-menu" 
                    key="/aluno/membros" 
                    icon={<HiOutlineUsers size="20px" />}
                >
                    <Link to="/aluno/membros"> Membros </Link>
                </Menu.Item>

                <SubMenu
                    className='item-menu'
                    key='/aluno/github-integration/'
                    icon={<FaGithub style={{ fontSize: "20px" }} />}
                    title="GitHub"
                >
                    <Menu.Item
                        className="item-menu"
                        key="/aluno/github-integration/issues"
                    >
                        <Link to="/aluno/github-integration/issues"> Issues </Link>
                    </Menu.Item>

                    <Menu.Item
                        className="item-menu"
                        key="/aluno/github-integration/contents"
                    >
                        <Link to="/aluno/github-integration/contents"> Contents </Link>
                    </Menu.Item>
                </SubMenu>

            </Menu>
        </Sider>
    );
}

export default MenuAluno;
