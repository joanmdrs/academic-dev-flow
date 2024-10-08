import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { HiOutlineHome } from "react-icons/hi";
import { LuLayoutGrid } from "react-icons/lu";
import { IoDocumentOutline } from "react-icons/io5";
import { VscGraph } from "react-icons/vsc";

const {SubMenu} = Menu

const MenuProfessor = () => {
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
                    key='/professor/home'
                    icon={<HiOutlineHome size="20px"/>}
                >
                    <Link to="/professor/home">Dashboard</Link>
                </Menu.Item>

                <SubMenu
                    className='item-menu'
                    key='/professor/projetos'
                    icon={<MdOutlineSpaceDashboard style={{ fontSize: "20px" }} />}
                    title="Projetos"
                >
                    <Menu.Item key="/gerenciar-projetos">
                        <Link to="/professor/projetos/gerenciar">Gerenciar</Link>
                    </Menu.Item>
                    
                    <Menu.Item key="/meus-projetos">
                        <Link to="/professor/projetos/meus-projetos">Meus Projetos</Link>
                    </Menu.Item>


                </SubMenu>

                <Menu.Item
                    className='item-menu'
                    key='/professor/tarefas'
                    icon={<LuLayoutGrid size="20px"/>}
                >
                    <Link to="/professor/tarefas">Tarefas</Link>
                </Menu.Item>

                <Menu.Item
                    className="item-menu"
                    key='/professor/artefatos'
                    icon={<IoDocumentOutline size="20px" />}
                >
                    <Link to="/professor/artefatos"> Artefatos </Link>
                </Menu.Item>

                <Menu.Item
                    className='item-menu'
                    key='/professor/relatorios'
                    icon={<VscGraph size="20px"/>}
                >
                    <Link to="/professor/relatorios">Relatórios</Link>
                </Menu.Item>

            </Menu>
    </Sider>
        
        
    );
}

export default MenuProfessor