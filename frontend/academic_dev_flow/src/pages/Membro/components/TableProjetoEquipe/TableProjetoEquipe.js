import {Space, Table, Tooltip } from "antd";
import React from "react";
import RenderMembers from "../../../../components/RenderMembers/RenderMembers";
import { limitarCaracteres } from "../../../../services/utils";
import RenderEmpty from "../../../../components/Empty/Empty";
import { IoOpenOutline } from "react-icons/io5";

const TableProjetoEquipe = ({data, onOpen}) => {

    const columnsTable = [
        {
            title: 'Projeto',
            dataIndex: 'nome_projeto',
            key: 'nome_projeto',
            render: (_, record) => (
                <Space>
                    <span 
                        style={{
                        width: '400px',
                        fontWeight: '600',
                        fontSize: '15px', 
                        fontFamily: 'Poppins, sans-serif'
                    }}> {limitarCaracteres(record.nome_projeto, 100)} </span>

                    <span style={{cursor: 'pointer'}} onClick={() => onOpen(record)}> 
                        <Tooltip title="Visualizar">
                            <IoOpenOutline size="18px" />
                        </Tooltip>
                    </span>
                    
                </Space>
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
                    style={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', padding: '20px'}}
                />
                
            ) : (
                <RenderEmpty title="Você não está vinculado a nenhum projeto" />
            )
        }
        </React.Fragment>
    )
}

export default TableProjetoEquipe