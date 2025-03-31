import React from "react";
import RenderDate from "../../../../components/RenderDate/RenderDate";
import RenderMembers from "../../../../components/RenderMembers/RenderMembers";
import { FaGithub, FaLink } from "react-icons/fa";
import { Space, Tooltip } from "antd";

const ListContent = ({item}) => {


    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
            <div>ID: <span> #{item.projeto} </span> </div>
            <div>{`Fluxo: ${item.nome_fluxo ? item.nome_fluxo : 'Não informado'}`}</div>
            <div>{`Descrição: ${item.descricao_projeto ? item.descricao_projeto : ''}`}</div>
            <div> 
                Início: <RenderDate dateType="inicio" dateValue={item.data_inicio_projeto} />
                Término: <RenderDate dateType="fim" dateValue={item.data_termino_projeto} />
            </div>
            <div>
                Equipe: 
                <RenderMembers 
                    membros={item.equipe} 
                    maxAvatars={3} 
                    quantMembros={item.quantidade_membros} 
                /> 

            </div>
            <Space> 
                <Tooltip title="Link do repositório">
                    <a style={{color: 'black'}} href={item.dados_projeto.link_repo} target="_blank"> <FaGithub size={20}/> </a>
                </Tooltip>
                <Tooltip title="Link da aplicação">
                    <a style={{color: 'black'}} href={item.dados_projeto.link_site} target="_blank"> <FaLink size={20} /> </a>
                </Tooltip>
            </Space>
            
        </div>
    )
}

export default ListContent