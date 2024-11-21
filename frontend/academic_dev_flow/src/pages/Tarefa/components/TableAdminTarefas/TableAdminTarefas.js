import React, { useEffect } from "react";
import { Table, Space, Tooltip } from 'antd';
import { listarTarefas } from "../../../../services/tarefaService";
import { useContextoTarefa } from "../../context/ContextoTarefa";
import { formatDate, handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";
import { optionsStatusTarefas } from "../../../../services/optionsStatus";
import { IoMdCreate, IoMdOpen, IoMdTrash } from "react-icons/io";
import RenderEmpty from "../../../../components/Empty/Empty";
import RenderStatus from "../../../../components/RenderStatus/RenderStatus";
import RenderCategoria from "../../../../components/RenderCategoria/RenderCategoria";
import RenderDate from "../../../../components/RenderDate/RenderDate";

const TableAdminTarefas = ({onView, onEdit, onDelete }) => {

    const COLUNAS_TABELA_TAREFAS = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: (_, record) => (
                <span className="ff-pop"> 
                    {record.nome}
                </span>
            )
        },
        {
            title: 'Data de início',
            dataIndex: 'data_inicio',
            key: 'data_inicio', 
            render: (_, record) => (
                <RenderDate dateType="inicio" dateValue={record.data_inicio} />
            )

        },
        {
            title: 'Data de término',
            dataIndex: 'data_termino',
            key: 'data_termino', 
            render: (_, record) => (
                <RenderDate dateType="termino" dateValue={record.data_termino} />
            )

        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => (
                <RenderStatus optionsStatus={optionsStatusTarefas} propStatus={record.status} />
            )
        },
        {
            title: 'Projeto',
            dataIndex: 'nome_projeto',
            key: 'nome_projeto',
        },
        {
            title: 'Categoria',
            dataIndex: 'nome_categoria',
            key: 'nome_categoria',
            render: (_, record) => (
                <RenderCategoria nome={record.nome_categoria} cor={record.cor_categoria} />
            )
        },
        {
            title: 'Ações',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space>
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

    const handleListarTarefas = async () => {
        const response = await listarTarefas()

        if (!response.error){
            setTarefas(response.data)
        }
    }

    useEffect(() => {

        const fetchData = async () => {
            await handleListarTarefas()
        }

        fetchData()
    }, []);
    
    const rowSelection = {
        onChange: (selectedRowsKeys, selectedRows) => {
            setTarefasSelecionadas(selectedRows)
        },
    };

    return (
        <React.Fragment>
            { tarefas.length !== 0 ? (
                <Table
                    rowKey="id"
                    dataSource={tarefas}
                    columns={COLUNAS_TABELA_TAREFAS}
                    rowSelection={rowSelection}
                />
            ) : (
                <RenderEmpty title="Nenhuma tarefa para exibir" />
            )}
        </React.Fragment>
    );
};

export default TableAdminTarefas;
