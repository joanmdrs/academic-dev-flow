import React from 'react';
import './ProjectCard.css'; // Importe o arquivo de estilos CSS
import { Space } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { LuCalendarCheck2, LuCalendarX2 } from "react-icons/lu";

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
        <h3>{project.title}</h3>
        <Space>
            <LuCalendarCheck2 />
            <span>Início: {project.inicio}</span>
        </Space>
        <Space>
            <LuCalendarX2 />
            <span>Fim: {project.fim}</span>
        </Space>
        <Space>
            <CheckCircleOutlined />
            <span>Status: {project.status}</span>
        </Space>
    </div>
  );
};

export default ProjectCard;
