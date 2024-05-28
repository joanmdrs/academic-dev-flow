import { Space, Table, Tooltip } from "antd";
import React from "react";
import { formatDate } from "../../../../services/utils";
import { useContextoTarefa } from "../../context/ContextoTarefa";
import { UserOutlined } from '@ant-design/icons';
import { IoClose } from "react-icons/io5";
import { IoMdCreate, IoMdOpen, IoMdTrash } from "react-icons/io";
import { FaCirclePlay } from "react-icons/fa6";
import { FaCirclePause } from "react-icons/fa6";

const TableTarefasSelect = ({ tasks, onView, onEdit, onDelete, onStart, onPause }) => {

    const COLUNAS_TABELA_TAREFAS = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: (_, record) => (
                <Space style={{ display: 'block' }}>
                    <a href={record.url_issue} target="_blank" rel="noopener noreferrer"> {record.nome} </a>
                    {record.data_inicio && record.data_termino ? (
                        <span style={{ color: '#585858', fontSize: '10px' }}>
                            #{record.number_issue} {formatDate(record.data_inicio)} - {formatDate(record.data_termino)}
                        </span>
                    ) : null}
                </Space>
            )
        },
        {
            title: 'Atribuída à',
            dataIndex: 'membros_info',
            key: 'membros_info',
            render: (membros_info) => (
                <span style={{ display: "flex", gap: "10px" }}>
                    {membros_info.map((membro) => (
                        <Tooltip title={membro.nome_membro} key={membro.id_membro_projeto}>
                            <UserOutlined style={{ color: "var(--primary-color)" }} />
                        </Tooltip>
                    ))}
                </span>
            ),
        },
        {
            title: 'Iteração',
            dataIndex: 'nome_iteracao',
            key: 'nome_iteracao',
            align: 'center',
            render: (_, record) => (
                <Space>
                    {record.nome_iteracao ?
                        record.nome_iteracao
                        : <Tooltip title="Nenhuma iteração vinculada">
                            <IoClose color="red" />
                        </Tooltip>}
                </Space>
            )
        },
        {
            title: 'Ações',
            dataIndex: 'actions',
            key: 'actions',
            align: 'center',
            render: (_, record) => (
                <Space>
                    <Tooltip title={record.estado_contagem_tempo === true ? 'Pausar' : 'Iniciar'}>
                        {record.estado_contagem_tempo === true ? 
                            <a onClick={() => onPause(record.id)}>
                                <FaCirclePause />
                            </a>

                            :

                            <a onClick={() => onStart(record.id)}>
                                <FaCirclePlay />
                            </a>
                        }
                    </Tooltip>
                    <Tooltip title="Visualizar">
                        <a onClick={() => onView(record)}><IoMdOpen /></a>
                    </Tooltip>
                    <Tooltip title="Editar">
                        <a onClick={() => onEdit(record)}><IoMdCreate /></a>
                    </Tooltip>
                    <Tooltip title="Excluir">
                        <a onClick={() => onDelete(record.id)}><IoMdTrash /></a>
                    </Tooltip>
                </Space>
            )
        }
    ];

    const { setTarefasSelecionadas } = useContextoTarefa();

    const rowSelection = {
        onChange: (selectedRowsKeys, selectedRows) => {
            setTarefasSelecionadas(selectedRows);
        },
    };

    return (
        <Table
            columns={COLUNAS_TABELA_TAREFAS}
            dataSource={tasks}
            rowKey={"id"}
            rowSelection={rowSelection}
        />
    );
};

export default TableTarefasSelect;
