import { Avatar, Empty, Space, Table, Tooltip } from "antd";
import React, { useState } from "react";
import { formatDate, getRandomColor } from "../../../../services/utils";
import { optionsStatusProjetos } from "../../../../services/optionsStatus";
import { IoMdCreate, IoMdTrash } from "react-icons/io";

const TableProjetos = ({projetos, onUpdate, onDelete}) => {

    const maxAvatars = 3

    const columns = [
        {
            title: 'Projeto',
            dataIndex: 'nome_projeto',
            key: 'nome_projeto',
            render: (_, record) => (
                <Space>
                    <a > {record.nome_projeto} </a>
                </Space>
            )
        },
        {
            title: 'Membros',
            dataIndex: 'nomes_membros',
            key: 'nomes_membros',
            render: (_, record) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', position: 'relative', marginLeft: -8 }}>
                        {
                            record.nomes_membros.slice(0, maxAvatars).map((membro, index) => (
                                <Tooltip title={`${membro}`}>
                                    <Avatar
                                        key={index}
                                        style={{
                                            backgroundColor: getRandomColor(),
                                            zIndex: record.quantidade_membros - index,
                                            marginLeft: index > 0 ? -10 : 0, // Sobreposição
                                        }}
                                    >
                                        {membro[0].toUpperCase()} {/* Mostra a primeira letra do nome */}
                                    </Avatar>
                                </Tooltip>
                                
                            ))
                        }
                        {
                           ( record.quantidade_membros - maxAvatars ) > 0 && 
                                <Avatar
                                    key={record.quantidade_membros - maxAvatars}
                                    style={{
                                        backgroundColor: getRandomColor(),
                                        zIndex: (record.quantidade_membros - maxAvatars),
                                        marginLeft: (record.quantidade_membros - maxAvatars) > 0 ? -10 : 0, // Sobreposição
                                    }}
                                >
                                    { `+${(record.quantidade_membros - maxAvatars)}`}
                                </Avatar>
                        }
                    </div>
                </div>
            )
        },
        {
            title: 'Tarefas',
            dataIndex: 'quantidade_tarefas',
            key: 'quantidade_tarefas'
        },
        {
            title: 'Artefatos',
            dataIndex: 'quantidade_artefatos',
            key: 'quantidade_artefatos'
        },
        {
            title: 'Início',
            dataIndex: 'data_inicio_projeto',
            key: 'data_inicio_projeto',
            render: (_, record) => (
                <Space>
                    {formatDate(record.data_inicio_projeto)}
                </Space>
            )
        },
        {
            title: 'Fim',
            dataIndex: 'data_termino_projeto',
            key: 'data_termino_projeto',
            render: (_, record) => (
                <Space>
                    {formatDate(record.data_termino_projeto)}
                </Space>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status_projeto',
            key: 'status_projeto',
            render: (_, record) => (
                <span>
                    {optionsStatusProjetos.find(status => status.value === record.status_projeto)?.label}
                </span>
            )
        },
        {
            title: 'Fluxo',
            dataIndex: 'nome_fluxo',
            key: 'nome_fluxo'
        },
        {
            title: 'Ações',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Editar">
                        <a onClick={() => onUpdate(record)}><IoMdCreate /></a>
                    </Tooltip>
                    <Tooltip title="Excluir">
                        <a onClick={() => onDelete(record.projeto)}><IoMdTrash /></a>
                    </Tooltip>
                </Space>
            )
        }
    ];

    const [projetosSelecionados, setProjetosSelecionados] = useState([])

    const rowSelection = {
        onChange: (selectedRowsKeys, selectedRows) => {
            setProjetosSelecionados(selectedRows)
        },
    };


    return (
        <React.Fragment>
            {
            projetos.length !== 0 ? (
                <div className="global-div">
                    <Table
                        dataSource={projetos}
                        columns={columns}
                        rowKey="id"
                        rowSelection={rowSelection}
                    />
                </div>

                
            ) : (
                <Empty 
                    description="Nenhum projeto para exibir"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    style={{
                        display: 'flex',
                        width: "100%",
                        height: "100%",
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                </Empty>
            )
        }
        </React.Fragment>
    )
}

export default TableProjetos