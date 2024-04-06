import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BiGroup } from "react-icons/bi";
import { SiAzureartifacts } from "react-icons/si";
import Sider from "antd/es/layout/Sider";
import { RiFlowChart } from "react-icons/ri";
import { IoPricetagsOutline } from "react-icons/io5";


const { SubMenu } = Menu;

const MenuAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);

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
        }} className="demo-logo-vertical">
        Academic Dev Flow
      </div>
      <Menu
        theme="dark"
        mode="inline"
        style={{
          marginTop: "20px",
        }}
      >
        <Menu.Item
          className="item-menu"
          key="projeto"
          icon={<HiOutlineClipboardList style={{ fontSize: "20px" }} />}
        >
          <Link to="/admin/projetos">Projetos</Link>
        </Menu.Item>

        <SubMenu
          className="item-menu"
          key="fluxo"
          icon={<RiFlowChart style={{ fontSize: "20px" }} />}
          title="Fluxos"
        >
          <Menu.Item key="gerenciar-fluxos">
            <Link to="/admin/fluxos/gerenciar">Gerenciar fluxos</Link>
          </Menu.Item>

          <Menu.Item key="etapas">
            <Link to="/admin/etapas">Gerenciar etapas</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          className="item-menu"
          key="membro"
          icon={<BiGroup style={{ fontSize: "20px" }} />}
          title="Membros"
        >
          <Menu.Item key="gerenciar-fluxos">
            <Link to="/admin/membros/gerenciar">Gerenciar membros</Link>
          </Menu.Item>

          <Menu.Item key="etapas">
            <Link to="/admin/membros/vincular-projeto">Vincular projeto</Link>
          </Menu.Item>
        </SubMenu>

        <Menu.Item
          className="item-menu"
          key="artefato"
          icon={<SiAzureartifacts style={{ fontSize: "15px" }} />}
        >
          <Link to="/admin/artefatos">Artefatos</Link>
        </Menu.Item>

        <Menu.Item 
          className="item-menu"
          key="tipos"
          icon={<IoPricetagsOutline style={{ fontSize: "15px" }} />}
        >
          <Link to="/admin/tipos">Tipos</Link>

        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default MenuAdmin;
