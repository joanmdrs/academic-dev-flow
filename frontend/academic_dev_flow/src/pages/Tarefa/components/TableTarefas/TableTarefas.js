import React, { useEffect } from "react";
import { Table, Space, Tooltip } from 'antd';
import { listarTarefas } from "../../../../services/tarefaService";
import { useContextoTarefa } from "../../context/ContextoTarefa";
import { formatDate, handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";
import { optionsStatusTarefas } from "../../../../services/optionsStatus";
import { IoMdCreate, IoMdOpen, IoMdTrash } from "react-icons/io";

const TableTarefas = ({onView, onEdit, onDelete }) => {

    const COLUNAS_TABELA_TAREFAS = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: (_, record) => (
                <Space style={{ display: 'block' }}>
                    <a href="#" target="_blank" rel="noopener noreferrer"> {record.nome} </a>

                    <span style={{ color: '#585858', fontSize: '10px' }}>
                        { 
                        record.data_inicio && record.data_termino &&  (
                            <span> {formatDate(record.data_inicio)} - {formatDate(record.data_termino)} </span>
                        )
                    }
                    </span>
                </Space>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (statusValue) => {
                const status = optionsStatusTarefas.find(option => option.value === statusValue);
                return status ? status.label : statusValue;
            }
        },
        {
            title: 'Projeto',
            dataIndex: 'nome_projeto',
            key: 'nome_projeto',
        },
        {
            title: 'Categoria',
            dataIndex: 'nome_categoria',
            key: 'nome_categoria'
        },
        {
            title: 'Ações',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Visualizar">
                        <a><IoMdOpen /></a>
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

    const { tarefas, setTarefas, setTarefasSelecionadas } = useContextoTarefa();

    useEffect(() => {

        const fetchData = async () => {
            if (tarefas.length === 0) {
                await handleListarTarefas()
            }
        }

        fetchData()
    }, []);

    const handleListarTarefas = async () => {
        try {
            const response = await listarTarefas();

            if (!response.error && response.data.length > 0) {
                setTarefas(response.data)
            } else {
                setTarefas([]);
            }
        } catch (error) {
            setTarefas([]);
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING);
        }
    }
    
    const rowSelection = {
        onChange: (selectedRowsKeys, selectedRows) => {
            setTarefasSelecionadas(selectedRows)
        },
    };

    return (
        <Table
            rowKey="id"
            dataSource={tarefas}
            columns={COLUNAS_TABELA_TAREFAS}
            rowSelection={rowSelection}
        />
    );
};

export default TableTarefas;
