import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdFormatListBulleted } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";

const MenuAluno = () => {
    const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider width={250} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical">
            Academic Dev Flow
        </div>
        <Menu
            theme="dark"
            mode="inline"
            style={{
            marginTop: "20px"
            }}
        >
            <Menu.Item
                className='item-menu'
                key="meus-projetos"
                icon={<MdOutlineSpaceDashboard size="20px" />}
           >
                <Link to="/aluno/projetos">Projetos</Link>
            </Menu.Item>

            <Menu.Item
                className='item-menu'
                key='minhas-atividades'
                icon={<MdFormatListBulleted size="20px"/>}
            >
                <Link to="/aluno/atividades">Atividades</Link>
            </Menu.Item>

            <Menu.Item
                className='item-menu'
                key='meus-relatórios'
                icon={<HiOutlineDocumentReport size="20px"/>}
            >
                <Link to="/aluno/relatorios">Relatórios</Link>
            </Menu.Item>

      </Menu>
    </Sider>
  );
}

export default MenuAluno