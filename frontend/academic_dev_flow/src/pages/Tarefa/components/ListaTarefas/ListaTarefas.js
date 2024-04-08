import React, { useEffect, useState } from "react";
import {Table, Space} from 'antd'
import { listarTarefas } from "../../../../services/tarefaService";
import { useContextoTarefa } from "../../context/ContextoTarefa";

const ListaTarefas = ({onEdit, onDelete}) => {

    const COLUNAS_TABELA_TAREFAS = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome'
        },
        {
            title: 'Data de Início',
            dataIndex: 'data_inicio',
            key: 'data_inicio'
        },
        {
            title: 'Data de Término (Previsão)',
            dataIndex: 'data_termino',
            key: 'data_termino'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status'
        },
        {
            title: 'Ações',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => onEdit(record)}>Editar</a>
                    <a onClick={() =>  onDelete(record.id)}>Excluir</a>
                </Space>
            )
        }
    ]

    const {tarefas, setTarefas} = useContextoTarefa()

    useEffect(() => {
        const fetchData = async () => {
            if (tarefas.length === 0){
                await handleListarTarefas()
            }
        }

        fetchData()
    }, [tarefas])

    const handleListarTarefas = async () => {
        const response = await listarTarefas()
        setTarefas(response.data)

    }


    return (
        <Table
            dataSource={tarefas}
            columns={COLUNAS_TABELA_TAREFAS}
        />
    )
}

export default ListaTarefas