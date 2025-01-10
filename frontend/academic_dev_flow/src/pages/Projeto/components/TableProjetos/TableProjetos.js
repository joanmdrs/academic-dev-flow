import { Empty, Space, Table, Tooltip } from "antd";
import React from "react";
import { optionsStatusProjetos } from "../../../../services/optionsStatus";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import RenderDate from "../../../../components/RenderDate/RenderDate";
import RenderStatus from "../../../../components/RenderStatus/RenderStatus";
import RenderMembers from "../../../../components/RenderMembers/RenderMembers";
import { limitarCaracteres } from "../../../../services/utils";
import { IoOpenOutline } from "react-icons/io5";

const TableProjetos = ({projetos, onUpdate, onDelete, onOpen}) => {

    const columns = [
        {
            title: 'Projeto',
            dataIndex: 'nome_projeto',
            key: 'nome_projeto',
            render: (_, record) => (
                <Space>
                    <span 
                        onClick={() => onOpen(record)}
                        style={{
                            width: '400px',
                            fontWeight: '600',
                            fontSize: '13px', 
                            fontFamily: 'Poppins, sans-serif',
                            cursor: 'pointer'
                        }}
                    > {limitarCaracteres(record.nome_projeto, 100)} </span>
                </Space>
            )
        },
        {
            title: 'Membros',
            dataIndex: 'nomes_membros',
            key: 'nomes_membros',
            render: (_, record) => (
                <RenderMembers membros={record.equipe} maxAvatars={3} quantMembros={record.quantidade_membros} />
            )
        },
        {
            title: 'Tarefas',
            dataIndex: 'quantidade_tarefas',
            key: 'quantidade_tarefas',
            align: 'center',
        },
        {
            title: 'Artefatos',
            dataIndex: 'quantidade_artefatos',
            key: 'quantidade_artefatos',
            align: 'center'
        },
        {
            title: 'Dt. Início',
            dataIndex: 'data_inicio_projeto',
            key: 'data_inicio_projeto',
            render: (_, record) => (
                <RenderDate dateType="inicio" dateValue={record.data_inicio_projeto} />
            )
        },
        {
            title: 'Dt. Término',
            dataIndex: 'data_termino_projeto',
            key: 'data_termino_projeto',
            render: (_, record) => (
                <RenderDate dateType="fim" dateValue={record.data_termino_projeto} />
            )
        },
        {
            title: 'Status',
            dataIndex: 'status_projeto',
            key: 'status_projeto',
            render: (_, record) => (
                <RenderStatus optionsStatus={optionsStatusProjetos} propStatus={record.status_projeto} />
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


    return (
        <React.Fragment>
            {
            projetos.length !== 0 ? (
                
                <Table
                    dataSource={projetos}
                    columns={columns}
                    rowKey="id"
                />
            ) : (
                <Empty
                    description="Nenhum projeto para exibir"
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    style={{
                        display: 'flex',
                        width: "100%",
                        height: "100%",
                        padding: '40px',
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