import React, { useEffect } from "react";
import { formatDate } from "../../../../services/utils";
import { Table } from "antd";
import { useContextoIteracao } from "../../context/contextoIteracao";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { listarIteracoesPorProjeto } from "../../../../services/iteracaoService";
import { optionsStatusIteracoes } from "../../../../services/optionsStatus";

const TableIteracoesSelect = ({onEdit, onDelete}) => {

    const COLUNAS_TABELA_ITERACOES = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: (_, record) => (
                <span style={{cursor: "pointer", color: "var(--primary-color)"}} onClick={() => onEdit(record)}>
                    {record.nome}
                </span>

            )
        },

        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => (
                <span>
                    {optionsStatusIteracoes.find(status => status.value === record.status)?.label}
                </span>
            )
        },
        {
            title: 'Data de início',
            dataIndex: 'data_inicio',
            key: 'data_inicio',
            render: (_, record) => (
                <span>
                    {formatDate(record.data_inicio)}
                </span>
            )
        },
        {
            title: 'Data de término',
            dataIndex: 'data_fim',
            key: 'data_fim',
            render: (_, record) => (
                <span>
                    {formatDate(record.data_fim)}
                </span>
            )
        },
        {
            title: 'Líder',
            dataIndex: 'nome_membro',
            key: 'nome_membro'
        },
        {
            title: 'Fase',
            dataIndex: 'nome_etapa',
            key: 'nome_etapa'
        }
    ]

    const {dadosProjeto} = useContextoGlobalProjeto()

    const {
        iteracoes, 
        setIteracoes,
        setIteracoesSelecionadas} = useContextoIteracao()

    const rowSelection = {
        onChange: (selectedRowsKeys, selectedRows) => {
          setIteracoesSelecionadas(selectedRows)
        },
    };

    const handleGetIteracoes = async () => {
        const response = await listarIteracoesPorProjeto(dadosProjeto.id)
        const iteracoesOrdenadas = response.data.sort((a, b) => a.numero - b.numero);
        setIteracoes(iteracoesOrdenadas)
    }

    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto !== null) {
                await handleGetIteracoes()
            }
        }

        fetchData()
    }, [])

    return (
        <div style={{}}>
            <h4 style={{textAlign: "center"}}> Cronograma de Iterações </h4> 
            <Table 
                className="style-table"
                columns={COLUNAS_TABELA_ITERACOES}
                dataSource={iteracoes}
                rowKey={"id"}
                rowSelection={rowSelection}
            />

        </div>

    )

}

export default TableIteracoesSelect