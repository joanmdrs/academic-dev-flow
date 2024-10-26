import React from 'react';
import { Tooltip } from 'antd'; 
import { FaPlus } from 'react-icons/fa';
import './ColumnTaskBoard.css'; 
import ItemTaskBoard from '../ItemTaskBoard/ItemTaskBoard';
import { getRandomColor } from '../../../../../services/utils';

const ColumnTaskBoard = ({ title, tarefas, onCreate, onUpdate, onDelete, onStartTarefa, onPauseTarefa }) => {
    return (
        <div className="column-task-board">
            <div className="column-task-board-header" style={{backgroundColor: `${getRandomColor()}`}}>
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
