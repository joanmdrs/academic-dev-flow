import React from "react";
import "./ItemGridArtefato.css";
import { formatDate, limitarCaracteres } from "../../../../../services/utils";
import { Tooltip, Badge, Space } from "antd";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { FaRegClock } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import RenderMembers from "../../../../../components/RenderMembers/RenderMembers";
import { IoChatbubblesOutline } from "react-icons/io5";
import RenderDate from "../../../../../components/RenderDate/RenderDate";

function verificarAtraso(artefato) {
    const dataAtual = new Date().toISOString().split('T')[0]; 
    const tarefaAtrasada = artefato.data_termino < dataAtual && artefato.status !== 'finalizado'; 
    return tarefaAtrasada ? true : false;
}

const ItemGridArtefato = ({ item, onUpdate, onDelete, onShowComments }) => {
    const isAtrasado = verificarAtraso(item);

    const ArtefatoContent = (
        <div className="artefato-container">
            <div>
                <h3 className="artefato-title">
                    {item.nome}
                </h3>
                <h5 className="artefato-projeto-nome">{item.nome_projeto}</h5>
                <p className="artefato-descricao">{limitarCaracteres(item.descricao, 100)}</p>
            </div>

            <div className="artefatos-datas">
                <RenderDate  dateType="inicio" dateValue={item.data_termino}  />
            </div>

            <div className="artefato-footer">
                <div className="artefato-avatars">
                    <RenderMembers maxAvatars={3} membros={item.membros_info} quantMembros={1} /> 
                </div>

                <div className="artefato-actions">
                    <span style={{ cursor: 'pointer' }} onClick={() => onShowComments(item)}>
                        <IoChatbubblesOutline size="20px" />
                    </span>
                    <span style={{ display: 'flex', gap: '10px' }}>
                        <span style={{ cursor: 'pointer' }} onClick={() => onUpdate(item)}>
                            <Tooltip title="Editar">
                                <IoMdCreate size="15px" />
                            </Tooltip>
                        </span> 
                        <span style={{ cursor: 'pointer' }} onClick={() => onDelete(item.id)}>
                            <Tooltip title="Excluir">
                                <IoMdTrash size="15px" />
                            </Tooltip>
                        </span> 
                    </span>
                </div>
            </div>
        </div>
    );

    return (
        isAtrasado ? (
            <Badge.Ribbon 
                style={{ fontSize: '12px', padding: '5px' }} 
                placement="start" 
                text={<Space><FaCircleInfo /> Em atraso</Space>}
                color="blue"
            >
                {ArtefatoContent}
            </Badge.Ribbon>
        ) : ArtefatoContent
    );
};

export default ItemGridArtefato;
