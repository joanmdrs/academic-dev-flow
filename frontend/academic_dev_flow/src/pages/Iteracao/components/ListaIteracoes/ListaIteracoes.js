import { Space } from "antd";
import React, { useEffect } from "react";
import { formatDate } from "../../../../services/utils";
import { useContextoIteracao } from "../../context/contextoIteracao";

const ListaIteracoes = ({onEdit, onDelete}) => {

    const COLUNAS_TABELA_TAREFAS = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome'
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
            key: 'status'
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

    const {iteracoes, setIteracoes} = useContextoIteracao()


    useEffect(() => {
        const fetchData = async () => {
            if (iteracoes.length === 0){
                await handleListarTarefas()
            }
        }

        fetchData()
    }, [iteracoes])

    const handleListarIteracoes = async () => {
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