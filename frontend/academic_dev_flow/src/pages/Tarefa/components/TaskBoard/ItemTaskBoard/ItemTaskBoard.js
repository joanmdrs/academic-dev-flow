import React from 'react';
import './ItemTaskBoard.css'
import { IoMdCreate, IoMdTrash } from 'react-icons/io';
import { FaRegClock, FaPlay, FaPause } from 'react-icons/fa';
import { GoCommentDiscussion } from 'react-icons/go';
import { formatDate, limitarCaracteres } from '../../../../../services/utils';
import { Tooltip } from 'antd';
import { FaCircleInfo } from 'react-icons/fa6';
import RenderMembers from '../../../../../components/RenderMembers/RenderMembers';
import RenderDate from '../../../../../components/RenderDate/RenderDate';

function verificarAtraso(task) {
    const dataAtual = new Date().toISOString().split('T')[0]; // Data atual no formato YYYY-MM-DD
    const tarefaAtrasada = task.data_termino < dataAtual && task.status !== 'concluida'; 
    return tarefaAtrasada ? true : false;
}

const ItemTaskBoard = ({ task, maxAvatars = 3, onUpdate, onDelete, onStartTarefa, onPauseTarefa}) => {

    return (
        <div className="task-container">
            <div className="task-header">
                <h4 style={{
                    color: `${task.cor_categoria}`,
                    margin: '0',
                    fontFamily: 'Poppins, sans-serif'
                }}
                >{task.nome_categoria} </h4>
                <span style={{display: 'flex', gap: '10px'}}>
                    <a onClick={() => onUpdate(task)}>
                        <Tooltip title="Editar">
                            <IoMdCreate size="15px"  />
                        </Tooltip>
                    </a> 
                    <a onClick={() => onDelete(task.id)}>
                        <Tooltip title="Excluir">
                            <IoMdTrash size="15px" />
                        </Tooltip>
                    </a> 
                </span>
            </div>

            <div>
                <h3 
                    className="task-title" 
                >
                    {task.nome}
                    
                </h3>

                <h5 className="task-project-name">{task.nome_projeto}</h5>
                <p className="task-description">{limitarCaracteres(task.descricao, 100)}</p>
            </div>

            <div className="task-dates">
                <RenderDate dateType="inicio" dateValue={task.data_inicio} />
                <RenderDate dateType="termino" dateValue={task.data_termino} />
                
                { verificarAtraso(task) && (
                    <span className="task-atrasada"><FaCircleInfo /> Em atraso </span>
                )}
                
            </div>

            <div className="task-footer">
                <div className="task-avatars">
                    <RenderMembers maxAvatars={3} membros={task.membros_info} quantMembros={(task.membros_info).length} />
                </div>

                <div className="task-actions">
                    { !task.estado_contagem_tempo ? (
                        <Tooltip title="Play">
                            <a onClick={() => onStartTarefa(task)}><FaPlay size="20px" /></a>
                        </Tooltip>
                        
                    ) : (
                        <Tooltip title="Pause">
                            <a onClick={() => onPauseTarefa(task)}><FaPause size="20px" /></a>
                        </Tooltip>
                    )}
                    <a><GoCommentDiscussion size="20px" /></a>
                </div>
            </div>
        </div>
    )
}
export default ItemTaskBoard;
