import React from 'react';
import ProjectCard from '../components/ProjectCard/ProjectCard'; 
import StudentMenu from '../../../../components/Menus/StudentMenu/StudentMenu';
import { Layout } from 'antd';
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

const ProjectsSection = () => {
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
            </Layout>
    </React.Fragment>
    
  );
};

export default ProjectsSection;