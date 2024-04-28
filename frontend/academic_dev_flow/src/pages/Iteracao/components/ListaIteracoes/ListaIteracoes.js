import { Space, Table } from "antd";
import React, { useEffect } from "react";
import { formatDate, handleError } from "../../../../services/utils";
import { useContextoIteracao } from "../../context/contextoIteracao";
import { listarIteracoes } from "../../../../services/iteracaoService";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";

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
            dataIndex: 'data_fim',
            key: 'data_fim',
            render: (_, record) => (
                <Space>
                    <span> {formatDate(record.data_fim)}</span>
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
                await handleListarIteracoes()
            }
        }

        fetchData()
    }, [iteracoes])

    const handleListarIteracoes = async () => {
        try {
            const response = await listarIteracoes()

            if (response.data.length > 0){
                const dados = await Promise.all(response.data.map(async (iteracao) => {
                    const resProjeto = await buscarProjetoPeloId(iteracao.projeto)
                    
                    if (!resProjeto.error){
                        iteracao['nome_projeto'] = resProjeto.data.nome;
                    }
                    return iteracao
                }))
                const resultado = await (Promise.resolve(dados))
                setIteracoes(resultado)
            } else {
                setIteracoes([])
            }
        } catch (error) {
            setIteracoes([])
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
        }

    }


    return (
        <Table
            dataSource={iteracoes}
            columns={COLUNAS_TABELA_TAREFAS}
        />
    )
}

export default ListaIteracoes