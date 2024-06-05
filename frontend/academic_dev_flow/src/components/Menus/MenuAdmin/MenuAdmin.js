import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BiGroup } from "react-icons/bi";
import Sider from "antd/es/layout/Sider";
import { RiFlowChart } from "react-icons/ri";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdOutlineTaskAlt } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsLayers } from "react-icons/bs";

const { SubMenu } = Menu;

const MenuAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    return (
        <Sider
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
                padding: "10px",
                color: "#FFFFFF",
                height: '64px',
                }} 
                
                className="demo-logo-vertical"
            >
                Academic Dev Flow
            </div>
            <Menu
                theme="dark"
                mode="inline"
                style={{
                    marginTop: "20px",
                }}
                selectedKeys={[location.pathname]}
            >
                <Menu.Item
                    className="item-menu"
                    key="/admin/projetos"
                    icon={<HiOutlineClipboardList style={{ fontSize: "20px" }} />}
                >
                    <Link to="/admin/projetos">Projetos</Link>
                </Menu.Item>

                <SubMenu
                    className="item-menu"
                    key="/admin/fluxos"
                    icon={<RiFlowChart style={{ fontSize: "20px" }} />}
                    title="Fluxos"
                >
                    <Menu.Item key="/admin/fluxos/gerenciar">
                        <Link to="/admin/fluxos/gerenciar">Gerenciar fluxos</Link>
                    </Menu.Item>

                    <Menu.Item key="/admin/etapas">
                        <Link to="/admin/etapas">Gerenciar etapas</Link>
                    </Menu.Item>
                </SubMenu>

                <Menu.Item
                    className="item-menu"
                    key="/admin/membros/gerenciar"
                    icon={<BiGroup style={{ fontSize: "20px" }} />}
                >
                    <Link to="/admin/membros/gerenciar">Membros</Link>
                </Menu.Item>

                <SubMenu
                    className='item-menu'
                    key='/admin/artefatos'
                    icon={<IoDocumentTextOutline style={{ fontSize: "20px" }} />}
                    title="Artefatos"
                >
                    <Menu.Item key="/admin/artefatos/gerenciar">
                        <Link to="/admin/artefatos/gerenciar">Gerenciar artefatos</Link>
                    </Menu.Item>

                    <Menu.Item key="/admin/artefatos/gerenciar-arquivos">
                        <Link to="/admin/artefatos/gerenciar-arquivos">Gerenciar arquivos</Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu
                    className='item-menu'
                    key='/admin/tarefas'
                    icon={<MdOutlineTaskAlt style={{ fontSize: "20px" }} />}
                    title="Tarefas"
                >
                    <Menu.Item key="/admin/tarefas/gerenciar">
                        <Link to="/admin/tarefas/gerenciar">Gerenciar tarefas</Link>
                    </Menu.Item>

                    <Menu.Item key="/admin/tarefas/issues">
                        <Link to="/admin/tarefas/issues">Gerenciar issues</Link>
                    </Menu.Item>

                    {/* <Menu.Item key="gerenciar-labels">
                        <Link to="/admin/tarefas/labels">Labels</Link>
                    </Menu.Item> */}
                </SubMenu>

                <Menu.Item 
                    className="item-menu"
                    key="/admin/categorias"
                    icon={<IoPricetagsOutline style={{ fontSize: "20px" }} />}
                >
                    <Link to="/admin/categorias">Categorias</Link>
                </Menu.Item>

                <Menu.Item
                    className="item-menu"
                    key="/admin/iteracoes"
                    icon={<BsLayers style={{fontSize: '20px'}} />}
                >
                    <Link to="/admin/iteracoes"> Iterações </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default MenuAdmin;
