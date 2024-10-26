import React from "react";
import "./ItemGridArtefato.css"
import { formatDate, getRandomColor, limitarCaracteres } from "../../../../../services/utils";
import { Avatar, Tooltip } from "antd";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { FaRegClock } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { GoCommentDiscussion } from "react-icons/go";
import { IoDocumentText } from "react-icons/io5";

function verificarAtraso(task) {
    const dataAtual = new Date().toISOString().split('T')[0]; 
    const tarefaAtrasada = task.data_termino < dataAtual && task.status !== 'concluida'; 
    return tarefaAtrasada ? true : false;
}

const ItemGridArtefato = ({artefato, onUpdate, onDelete}) => {

    const maxAvatars = 3

    return (
        <div className="artefato-container">
            <div className="artefato-header">
                <span>
                    <IoDocumentText color="var(--primary-color)" fontSize="30px"/>
                </span>
            </div>

            <div>
                <h3 
                    className="artefato-title" 
                >
                    {artefato.nome}
                    
                </h3>

                <h5 className="artefato-projeto-nome">{artefato.nome_projeto}</h5>
                <p className="artefato-descricao">{limitarCaracteres(artefato.descricao, 100)}</p>
            </div>

            <div className="artefatos-datas">
                <Tooltip title="Data de criação">
                    <span className="artefato-data-criacao"><FaRegClock /> {formatDate(artefato.data_criacao)}</span>
                </Tooltip>

                <Tooltip title="Data de término">
                    <span className="artefato-data-termino"><FaRegClock /> {formatDate(artefato.data_termino)}</span>
                </Tooltip>
                
                { verificarAtraso(artefato) && (
                    <span className="artefato-atrasado"><FaCircleInfo /> Em atraso </span>
                )}
                
            </div>

            <div className="artefato-footer">
                <div className="artefato-avatars">
                    {
                        artefato.nomes_membros.slice(0, maxAvatars).map((membro, index) => (
                            <Tooltip title={`${membro}`} key={index}>
                                <Avatar
                                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                                    style={{
                                        backgroundColor: getRandomColor(),
                                        zIndex: artefato.nomes_membros.length + index,
                                        marginLeft: index > 0 ? -10 : 0
                                    }}
                                >
                                    {membro[0].toUpperCase()}
                                </Avatar>
                            </Tooltip>
                        ))
                    }
                    {
                        (artefato.nomes_membros.length - maxAvatars) > 0 && 
                            <Avatar
                                
                                style={{
                                    backgroundColor: getRandomColor(),
                                    zIndex: artefato.nomes_membros.length * 2,
                                    marginLeft: -10,
                                }}
                            >
                                {`+${(artefato.nomes_membros.length - maxAvatars)}`}
                            </Avatar>
                    }
                </div>

                <div className="artefato-actions">
                    <a><GoCommentDiscussion size="20px" /></a>
                    <span style={{display: 'flex', gap: '10px'}}>
                        <a onClick={() => onUpdate(artefato)}>
                            <Tooltip title="Editar">
                                <IoMdCreate size="15px"  />
                            </Tooltip>
                        </a> 
                        <a onClick={() => onDelete(artefato.id)}>
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