import React from "react";
import "./ItemGridArtefato.css"
import { formatDate, limitarCaracteres } from "../../../../../services/utils";
import { Tooltip } from "antd";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { FaRegClock } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { GoCommentDiscussion } from "react-icons/go";
import RenderMembers from "../../../../../components/RenderMembers/RenderMembers";
import { IoChatbubblesOutline } from "react-icons/io5";

function verificarAtraso(task) {
    const dataAtual = new Date().toISOString().split('T')[0]; 
    const tarefaAtrasada = task.data_termino < dataAtual && task.status !== 'finalizado'; 
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

                <Tooltip title="Data de entrega">
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
                    <span style={{cursor: 'pointer'}} onClick={() => onShowComments(item)}><IoChatbubblesOutline size="20px" /></span>
                    <span style={{display: 'flex', gap: '10px'}}>
                        <span style={{cursor: 'pointer'}} onClick={() => onUpdate(item)}>
                            <Tooltip title="Editar">
                                <IoMdCreate size="15px"  />
                            </Tooltip>
                        </span> 
                        <span style={{cursor: 'pointer'}} onClick={() => onDelete(item.id)}>
                            <Tooltip title="Excluir">
                                <IoMdTrash size="15px" />
                            </Tooltip>
                        </span> 
                    </span>
                </div>
            </div>
            

        </div>
    )
}

export default ItemGridArtefato