import React from "react";
import "./ItemGridArtefato.css"
import { formatDate, getRandomColor, limitarCaracteres } from "../../../../../services/utils";
import { Avatar, Tooltip } from "antd";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { FaRegClock } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { GoCommentDiscussion } from "react-icons/go";
import { IoDocumentText } from "react-icons/io5";
import RenderMembers from "../../../../../components/RenderMembers/RenderMembers";

function verificarAtraso(task) {
    const dataAtual = new Date().toISOString().split('T')[0]; 
    const tarefaAtrasada = task.data_termino < dataAtual && task.status !== 'concluida'; 
    return tarefaAtrasada ? true : false;
}

const ItemGridArtefato = ({item, onUpdate, onDelete, onShowComments}) => {

    return (
        <div className="artefato-container">
            <div>
                <h3 
                    className="artefato-title" 
                >
                    {item.nome}
                    
                </h3>

                <h5 className="artefato-projeto-nome">{item.nome_projeto}</h5>
                <p className="artefato-descricao">{limitarCaracteres(item.descricao, 100)}</p>
            </div>

            <div className="artefatos-datas">
                <Tooltip title="Data de criação">
                    <span className="artefato-data-criacao"><FaRegClock /> {formatDate(item.data_criacao)}</span>
                </Tooltip>

                <Tooltip title="Data de término">
                    <span className="artefato-data-termino"><FaRegClock /> {formatDate(item.data_termino)}</span>
                </Tooltip>
                
                { verificarAtraso(item) && (
                    <span className="artefato-atrasado"><FaCircleInfo /> Em atraso </span>
                )}
                
            </div>

            <div className="artefato-footer">
                <div className="artefato-avatars">
                    <RenderMembers maxAvatars={3} membros={item.membros_info} quantMembros={1} /> 
                </div>

                <div className="artefato-actions">
                    <a onClick={() => onShowComments(item)}><GoCommentDiscussion size="20px" /></a>
                    <span style={{display: 'flex', gap: '10px'}}>
                        <a onClick={() => onUpdate(item)}>
                            <Tooltip title="Editar">
                                <IoMdCreate size="15px"  />
                            </Tooltip>
                        </a> 
                        <a onClick={() => onDelete(item.id)}>
                            <Tooltip title="Excluir">
                                <IoMdTrash size="15px" />
                            </Tooltip>
                        </a> 
                    </span>
                </div>
            </div>
            

        </div>
    )
}

export default ItemGridArtefato