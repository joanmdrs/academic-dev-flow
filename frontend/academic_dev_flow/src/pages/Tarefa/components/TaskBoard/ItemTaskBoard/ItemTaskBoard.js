import React from 'react';
import './ItemTaskBoard.css'
import { IoMdCreate, IoMdTrash } from 'react-icons/io';
import { FaRegClock, FaPlay } from 'react-icons/fa';
import { GoCommentDiscussion } from 'react-icons/go';
import { formatDate, getRandomColor, limitarCaracteres } from '../../../../../services/utils';
import { Avatar, Tooltip } from 'antd';

const ItemTaskBoard = ({ task, maxAvatars = 3 }) => {

    return (
        <div className="task-container">
            <div className="task-header">
                <h3 style={{color: `${getRandomColor()}`, margin: '0'}}>{task.categoria} </h3>
                <span>
                    <a><IoMdCreate /></a>
                    <a><IoMdTrash /></a>
                </span>
            </div>

            <div>
                <h3 className="task-title">{task.nome}</h3>
                <h5 className="task-project-name">{task.nome_projeto}</h5>
                <p className="task-description">{limitarCaracteres(task.descricao, 100)}</p>
            </div>

            <div className="task-dates">
                <span className="task-start-date"><FaRegClock /> {formatDate(task.inicio)}</span>
                <span className="task-end-date"><FaRegClock /> {formatDate(task.fim)}</span>
            </div>

            <div className="task-footer">
                <div className="task-avatars">
                    {
                        task.nomes_membros.slice(0, maxAvatars).map((membro, index) => (
                            <Tooltip title={`${membro}`} key={index}>
                                <Avatar
                                    style={{
                                        backgroundColor: getRandomColor(),
                                        zIndex: task.nomes_membros.length + index,
                                        marginLeft: index > 0 ? -10 : 0
                                    }}
                                >
                                    {membro[0].toUpperCase()}
                                </Avatar>
                            </Tooltip>
                        ))
                    }
                    {
                        (task.nomes_membros.length - maxAvatars) > 0 && 
                            <Avatar
                                style={{
                                    backgroundColor: getRandomColor(),
                                    zIndex: task.nomes_membros.length,
                                    marginLeft: -10,
                                }}
                            >
                                {`+${(task.nomes_membros.length - maxAvatars)}`}
                            </Avatar>
                    }
                </div>

                <div className="task-actions">
                    <a><FaPlay size="20px" /></a>
                    <a><GoCommentDiscussion size="20px" /></a>
                </div>
            </div>
        </div>
    )
}
export default ItemTaskBoard;
