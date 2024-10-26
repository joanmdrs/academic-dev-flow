import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { HiOutlineHome } from "react-icons/hi2";
import { LuLayoutGrid } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import { VscGraph } from "react-icons/vsc";
import { RiFlowChart } from "react-icons/ri";
import { MdOutlineFolderOpen } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";

const { SubMenu } = Menu

const MenuAluno = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

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

                <Menu.Item
                    className="item-menu"
                    key="/aluno/cronograma"
                    icon={<IoCalendarOutline  size="20px" />}
                >
                    <Link to="/aluno/cronograma"> Cronograma </Link>
                </Menu.Item>

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

                <Menu.Item className="item-menu" key="/aluno/equipes" icon={<HiOutlineUsers size="20px" />
}>
                    <Link to="/aluno/equipes/"> Equipes </Link>
                </Menu.Item>

                <Menu.Item
                    className='item-menu'
                    key='/aluno/relatorios' 
                    icon={<VscGraph size="20px"/>}
                >
                    <Link to="/aluno/relatorios">Relatórios</Link>
                </Menu.Item>

            </Menu>
        </Sider>
    );
}

export default MenuAluno;
