import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard/ProjectCard'; 
import StudentMenu from '../../../../components/Menus/StudentMenu/StudentMenu';
import { Button, Layout, Space, Table, Tabs } from 'antd';
import MyHeader from '../../../../components/Header/Header';
import "./ProjectsSection.css"
import CustomBreadcrumb from '../../../../components/Breadcrumb/Breadcrumb';
import { LuCalendarCheck2, LuCalendarX2 } from "react-icons/lu";
import { TeamOutlined } from '@ant-design/icons';
import { CiCircleCheck } from "react-icons/ci";
import { TiFlowChildren } from "react-icons/ti";
import { PiEye } from "react-icons/pi";

const projectsData = [
  {
    key: 1,
    id: 1,
    nome: 'Projeto A',
    description: 'Descrição do Projeto A.',
    inicio: '27/02/2024',
    fim: '27/03/2024',
    status: 'Em andamento',
    team: 'Equipe A',
  },
  {
    key: 2,
    id: 2,
    nome: 'Projeto B',
    description: 'Descrição do Projeto B.',
    inicio: '27/02/2024',
    fim: '27/03/2024',
    status: 'Em andamento',
    team: 'Equipe B',
  },
];

const columns = [
  {
    title: 'Nome',
    dataIndex: 'nome',
    key: 'nome',
  },
  {
    title: (
      <>
        <CiCircleCheck style={{color: "#fffff"}} /> Status
      </>
    ),
    dataIndex: 'status',
    key: 'status'

  },
  {
    title: (
      <>
        <LuCalendarCheck2 /> Início
      </>
    ),
    dataIndex: 'inicio',
    key: 'inicio',
  },
  {
    title: (
      <>
        <LuCalendarX2/> Fim
      </>
    ),
    dataIndex: 'fim',
    key: 'fim',
  },
  {
    title: (
      <>
        <TeamOutlined /> Membros
      </>
    ),
    dataIndex: 'membros',
    key: 'membros'
  },
  {
    title: (
      <>
        <TiFlowChildren/> Fluxo
      </>
    ),
    dataIndex: 'fluxo',
    key: 'fluxo'
  },
  {
    title: 'Ações',
    key: 'action',
    render: (_, record) => (
      <Button>
        Visualizar
      </Button>
    ),

  }
];

const breadcrumbRoutes = [
  { title: 'Home', path: '/aluno/home' },
  { title: 'Projetos', path: '/aluno/projetos' },
];

const ProjectsSection = () => {

  return (
    <React.Fragment>
        <StudentMenu />
            <Layout>
                <MyHeader />
                <CustomBreadcrumb routes={breadcrumbRoutes} />
                <div className="projects-section-layout">
                    <div className='projects-section-title'>
                      <h2> Meus Projetos </h2>  
                    </div>
                    <div className='projects-section-content'> 
                      <Table 
                        className='meus-projetos-table'
                        dataSource={projectsData} 
                        columns={columns} />
                    </div>
                    
                </div>
            </Layout>
    </React.Fragment>
    
  );
};

export default ProjectsSection;