import React, { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard/ProjectCard'; 
import StudentMenu from '../../../../components/Menus/StudentMenu/StudentMenu';
import { Button, Empty, Flex, Layout, Space, Table, Tabs } from 'antd';
import MyHeader from '../../../../components/Header/Header';
import "./ProjectsSection.css"
import CustomBreadcrumb from '../../../../components/Breadcrumb/Breadcrumb';
import { LuCalendarCheck2, LuCalendarX2 } from "react-icons/lu";
import { TeamOutlined } from '@ant-design/icons';
import { CiCircleCheck } from "react-icons/ci";
import { TiFlowChildren } from "react-icons/ti";
import { decodeToken } from 'react-jwt';
import Loading from '../../../../components/Loading/Loading';
import { buscarProjetosDoMembro } from '../../../../services/membroProjetoService';
import { buscarProjetosPorListaIds } from '../../../../services/projetoService';

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

  const [projectsData, setProjectsData] = useState(null)
  const [token] = useState(localStorage.getItem("token") || null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
      const searchData = async () => {
          try {
            const decoded = await decodeToken(token);

            const response1 = await buscarProjetosDoMembro(decoded.user_id);
            
            const ids = response1.data.map(element => element.projeto)
            const response2 = await buscarProjetosPorListaIds(ids)
            setProjectsData(response2.data.results)
            setTimeout(() => setShouldRender(true), 2000);
          } catch (error) {
              console.error('Erro ao decodificar o token:', error);
          }
      };
      if (token) {
          searchData();
      }
  }, [token]);

  if (!shouldRender) {
    return <Loading />
}


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
                      { 
                        projectsData !== null ? 

                        (<Table 
                            className='meus-projetos-table'
                            dataSource={projectsData} 
                            columns={columns} />) 
                        
                        : <Empty style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center" 
                        }}/>
                      }
                      
                    </div>
                    
                </div>
            </Layout>
    </React.Fragment>
    
  );
};

export default ProjectsSection;