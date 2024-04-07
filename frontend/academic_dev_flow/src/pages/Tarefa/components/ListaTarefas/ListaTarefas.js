import React, { useEffect, useState } from "react";
import {Table} from 'antd'
import { listarTarefas } from "../../../../services/tarefaService";

const ListaTarefas = () => {

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
        }
    ]

    const [tarefas, setTarefas] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            await handleListarTarefas()
        }

        fetchData()
    }, [])

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