import React from "react";
import { formatDate } from "../../../../services/utils";
import { Table } from "antd";
import { useContextoIteracao } from "../../context/contextoIteracao";

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
            key: 'status'
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

    const {iteracoes, setIteracoesSelecionadas} = useContextoIteracao()

    const rowSelection = {
        onChange: (selectedRowsKeys, selectedRows) => {
          setIteracoesSelecionadas(selectedRows)
        },
    };

    return (
        <Table 
            bordered={true}
            className="style-table"
            columns={COLUNAS_TABELA_ITERACOES}
            dataSource={iteracoes}
            rowKey={"id"}
            rowSelection={rowSelection}
        />

    )

}

export default TableIteracoesSelect