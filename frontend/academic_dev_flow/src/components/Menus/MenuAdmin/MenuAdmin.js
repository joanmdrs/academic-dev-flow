import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BiGroup } from "react-icons/bi";
import Sider from "antd/es/layout/Sider";
import { RiFlowChart } from "react-icons/ri";
import { MdOutlineTaskAlt } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsLayers } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

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

                <SubMenu
                    className="item-menu"
                    key="admin/membros"    
                    icon={<BiGroup style={{ fontSize: "20px" }} />}
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
                    key="/admin/iteracoes"
                    icon={<BsLayers style={{fontSize: '20px'}} />}
                >
                    <Link to="/admin/iteracoes"> Iterações </Link>
                </Menu.Item>

                <Menu.Item 
                    className="item-menu" 
                    icon={<IoDocumentTextOutline style={{fontSize: "20px"}} />} 
                    key="/admin/artefatos/gerenciar"
                    title="Artefatos"
                >
                    <Link to="/admin/artefatos/gerenciar">Artefatos</Link>
                </Menu.Item>

                <SubMenu
                    className='item-menu'
                    key='/admin/tarefas'
                    icon={<MdOutlineTaskAlt style={{ fontSize: "20px" }} />}
                    title="Tarefas"
                >
                    <Menu.Item key="/admin/tarefas/gerenciar">
                        <Link to="/admin/tarefas/gerenciar">Gerenciar tarefas</Link>
                    </Menu.Item>

                    <Menu.Item key="/admin/tarefas/gerenciar-categorias">
                        <Link to="/admin/tarefas/gerenciar-categorias"> Categorias </Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu
                    className='item-menu'
                    key='/admin/github-integration/'
                    icon={<FaGithub style={{ fontSize: "20px" }} />}
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
                </SubMenu>

            </Menu>
        </Sider>
    );
};

export default MenuAdmin;
