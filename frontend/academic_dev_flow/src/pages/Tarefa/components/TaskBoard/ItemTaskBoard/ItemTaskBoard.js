import React from 'react';
import './ItemTaskBoard.css';
import { IoMdCreate, IoMdTrash } from 'react-icons/io';
import { FaRegClock, FaPlay, FaPause } from 'react-icons/fa';
import { GoCommentDiscussion } from 'react-icons/go';
import { formatDate, limitarCaracteres } from '../../../../../services/utils';
import { Badge, Space, Tooltip } from 'antd';
import { FaCircleInfo } from 'react-icons/fa6';
import RenderMembers from '../../../../../components/RenderMembers/RenderMembers';
import RenderDate from '../../../../../components/RenderDate/RenderDate';
import { IoChatbubblesOutline } from "react-icons/io5";

function verificarAtraso(task) {
    const dataAtual = new Date().toISOString().split('T')[0]; // Data atual no formato YYYY-MM-DD
    const tarefaAtrasada = task.data_termino < dataAtual && task.status !== 'concluida'; 
    return tarefaAtrasada ? true : false;
}

const ItemTaskBoard = ({ task, onUpdate, onDelete, onStartTarefa, onPauseTarefa, onShowComments}) => {
    const isAtrasada = verificarAtraso(task);

    const TaskContent = (
        <div className="task-container">
            <div className="task-header">
                <h4 style={{
                    color: `${task.cor_categoria}`,
                    margin: '0',
                    fontFamily: 'Poppins, sans-serif'
                }}
                >{task.nome_categoria} </h4>
                <span style={{ display: 'flex', gap: '10px' }}>
                    <span style={{ cursor: 'pointer', color: "#585858" }} onClick={() => onUpdate(task)}>
                        <Tooltip title="Editar">
                            <IoMdCreate size="15px" />
                        </Tooltip>
                    </span> 
                    <span style={{ cursor: 'pointer', color: "#585858" }} onClick={() => onDelete(task.id)}>
                        <Tooltip title="Excluir">
                            <IoMdTrash size="15px" />
                        </Tooltip>
                    </span> 
                </span>
            </div>

            <div>
                <h3 className="task-title">{limitarCaracteres(task.nome, 50)}</h3>
                <h5 className="task-project-name">Projeto: {task.nome_projeto}</h5>
                <p className="task-description">{limitarCaracteres(task.descricao, 100)}</p>
            </div>

            <div className="task-dates">
                <RenderDate dateType="inicio" dateValue={task.data_inicio} />
                <RenderDate dateType="termino" dateValue={task.data_termino} />
            </div>

            <div className="task-footer">
                <div className="task-avatars">
                    <RenderMembers maxAvatars={3} membros={task.membros_info} quantMembros={(task.membros_info).length} />
                </div>

                <div className="task-actions">
                    {!task.estado_contagem_tempo ? (
                        <Tooltip title="Play">
                            <span style={{ cursor: 'pointer', color: "#585858" }} onClick={() => onStartTarefa(task)}><FaPlay size="20px" /></span>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Pause">
                            <span style={{ cursor: 'pointer', color: "#585858" }} onClick={() => onPauseTarefa(task)}><FaPause size="20px" /></span>
                        </Tooltip>
                    )}
                    <Tooltip title="Comentários">
                        <span 
                            style={{ cursor: 'pointer', color: "#585858" }} 
                            onClick={() => onShowComments(task)}
                        >
                            <IoChatbubblesOutline size="22px" />
                        </span>
                    </Tooltip>
                </div>
            </div>
        </div>
    );

    return (
        isAtrasada ? (
            <Badge.Ribbon 
                style={{fontSize: '12px', padding: '5px'}} 
                placement='start' 
                text={<Space> <FaCircleInfo /> Em atraso</Space>}
                color='blue'
            >
                {TaskContent}
            </Badge.Ribbon>
        ) : TaskContent
    );
}

export default ItemTaskBoard;
