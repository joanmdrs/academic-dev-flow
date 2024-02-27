import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard/ProjectCard'; 
import StudentMenu from '../../../../components/Menus/StudentMenu/StudentMenu';
import { Layout, Tabs } from 'antd';
import MyHeader from '../../../../components/Header/Header';
import "./ProjectsSection.css"
const projectsData = [
  {
    id: 1,
    title: 'Projeto A',
    description: 'Descrição do Projeto A.',
    inicio: '27/02/2024',
    fim: '27/03/2024',
    status: 'Em andamento',
    team: 'Equipe A',
  },
  {
    id: 2,
    title: 'Projeto B',
    description: 'Descrição do Projeto B.',
    inicio: '27/02/2024',
    fim: '27/03/2024',
    status: 'Em andamento',
    team: 'Equipe B',
  },
  // Adicione mais projetos conforme necessário
];

const TAB_ITEMS = [
  {
    key: '1',
    label: 'p',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Tab 2',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Tab 3',
    children: 'Content of Tab Pane 3',
  },
]

const ProjectsSection = () => {

  const [isOpenProject, setIsOpenProject] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  return (
    <React.Fragment>
        <StudentMenu />
            <Layout>
                <MyHeader />
                <div className="projects-section-layout">
                    <div className='projects-section-title'>
                      <h2> Meus Projetos </h2>  
                    </div>
                    <div className='projects-section-content'> 
                      {projectsData.map((project) => (
                          <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                    
                </div>

                { !isOpenProject && 
                  <div className='projects-section-content-details'> 
                      <Tabs defaultActiveKey="1" items={TAB_ITEMS}  tabPosition='left'/>;
                  </div>
                }
            </Layout>
    </React.Fragment>
    
  );
};

export default ProjectsSection;