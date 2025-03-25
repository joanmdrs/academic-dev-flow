import {Table } from "antd";
import React from "react";
import RenderMembers from "../../../../components/RenderMembers/RenderMembers";
import { limitarCaracteres } from "../../../../services/utils";
import RenderEmpty from "../../../../components/Empty/Empty";

const TableProjetoEquipe = ({data, onOpen}) => {

    const columnsTable = [
        {
            title: 'Projeto',
            dataIndex: 'nome_projeto',
            key: 'nome_projeto',
            render: (_, record) => (
                <span 
                    onClick={() => onOpen(record)}
                    style={{
                        cursor: 'pointer',
                        width: '400px',
                        fontWeight: '600',
                        fontSize: '15px', 
                }}> {limitarCaracteres(record.nome_projeto, 100)} </span>

                    
            )
        }, 
        {
            title: 'Membros',
            dataIndex: 'nomes_membros',
            key: 'nomes_membros',
            render: (_, record) => (
                <RenderMembers 
                    membros={record.equipe} 
                    quantMembros={record.quantidade_membros} 
                    maxAvatars={3} 
                />
            )
        },
    ]

    return (
        <React.Fragment>
            {
            data.length !== 0 ? (
                <Table
                    dataSource={data}
                    columns={columnsTable}
                    rowKey="id"
                />
                
            ) : (
                <RenderEmpty title="Você não está vinculado a nenhum projeto" />
            )
        }
        </React.Fragment>
    )
}

export default TableProjetoEquipe