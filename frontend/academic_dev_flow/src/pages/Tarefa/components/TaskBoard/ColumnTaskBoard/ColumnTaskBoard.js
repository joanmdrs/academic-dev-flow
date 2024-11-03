import React from 'react';
import { Tooltip } from 'antd'; 
import { FaPlus } from 'react-icons/fa';
import './ColumnTaskBoard.css'; 
import ItemTaskBoard from '../ItemTaskBoard/ItemTaskBoard';
import { getRandomColor } from '../../../../../services/utils';

const getColorByStatus = (title) => {
    switch (title) {
        case 'To Do':
            return '#4788FF'; 
        case 'In Progress':
            return '#f56a00'; 
        case 'Done':
            return '#00a2ae';
        default:
            return getRandomColor(); 
    }
};

const ColumnTaskBoard = ({ 
    title, 
    tarefas, 
    onCreate, 
    onUpdate, 
    onDelete, 
    onStartTarefa, 
    onPauseTarefa, 
}) => {

    return (
        <div className="column-task-board">
            <div 
                className="column-task-board-header" 
                style={{ backgroundColor: getColorByStatus(title) }}
            >
                <h4 className="column-task-board-title">{title}</h4>
                <span onClick={onCreate} className="column-task-board-add-task-button">
                    <Tooltip title="Adicionar Tarefa">
                        <FaPlus color="#FFFFFF" />
                    </Tooltip>
                </span>
            </div>
            <div className="column-task-board-task-list">
                {tarefas.map((item, index) => (
                    <ItemTaskBoard 
                        task={item} 
                        key={index} 
                        maxAvatars={3} 
                        onUpdate={onUpdate} 
                        onDelete={onDelete}
                        onStartTarefa={onStartTarefa}
                        onPauseTarefa={onPauseTarefa}
                    />
                ))}
            </div>
        </div>
    );
};

export default ColumnTaskBoard;
