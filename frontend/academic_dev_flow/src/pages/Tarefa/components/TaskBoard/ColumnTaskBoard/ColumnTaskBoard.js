import React from 'react';
import { Tooltip } from 'antd'; 
import { FaPlus } from 'react-icons/fa';
import './ColumnTaskBoard.css'; 
import ItemTaskBoard from '../ItemTaskBoard/ItemTaskBoard';

const ColumnTaskBoard = ({ title, tarefas }) => {
    return (
        <div className="column-task-board">
            <div className="column-task-board-header">
                <h4 className="column-task-board-title">{title}</h4>
                <span className="column-task-board-add-task-button">
                    <Tooltip title="Adicionar Tarefa">
                        <FaPlus color="var(--primary-color)" />
                    </Tooltip>
                </span>
            </div>
            <div className="column-task-board-task-list">
                {tarefas.map((item, index) => (
                    <ItemTaskBoard task={item} key={index} maxAvatars={3} />
                ))}
            </div>
        </div>
    );
};

export default ColumnTaskBoard;
