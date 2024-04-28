import React, { useEffect } from "react";
import {Table, Space} from 'antd'
import { listarTarefas } from "../../../../services/tarefaService";
import { useContextoTarefa } from "../../context/ContextoTarefa";
import { formatDate, handleError } from "../../../../services/utils";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";
import { optionsStatusTarefas } from "../../../../services/optionsStatus";

const ListaTarefas = ({onEdit, onDelete}) => {

    const COLUNAS_TABELA_TAREFAS = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: (_, record) => (
                <Space>
                    <a href={record.url_issue} target="_blank"> {record.nome} </a>
                </Space>
            )
        },
        {
            title: 'Data de Início',
            dataIndex: 'data_inicio',
            key: 'data_inicio',
            render: (_, record) => (
                <Space>
                    <span> {formatDate(record.data_inicio)}</span>
                </Space>
            )
        },
        {
            title: 'Data de Término (Previsão)',
            dataIndex: 'data_termino',
            key: 'data_termino',
            render: (_, record) => (
                <Space>
                    <span> {formatDate(record.data_termino)}</span>
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
        try {
            const response = await listarTarefas()

            if (response.data.length > 0){
                const dados = await Promise.all(response.data.map(async (tarefa) => {
                    const resProjeto = await buscarProjetoPeloId(tarefa.projeto)
                    
                    if (!resProjeto.error){
                        tarefa['nome_projeto'] = resProjeto.data.nome;
                    }
                    return tarefa
                }))
                const resultado = await (Promise.resolve(dados))
                setTarefas(resultado)
            } else {
                setTarefas([])
            }
        } catch (error) {
            setTarefas([])
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
        }

    }


    return (
        <Table
            dataSource={tarefas}
            columns={COLUNAS_TABELA_TAREFAS}
        />
    )
}

export default ListaTarefas