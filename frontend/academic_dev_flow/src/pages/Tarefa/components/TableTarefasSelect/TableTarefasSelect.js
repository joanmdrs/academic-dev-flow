import { Table } from "antd";
import React from "react";
import { formatDate } from "../../../../services/utils";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";

const TableTarefasSelect = ({tasks, onEdit}) => {

    const COLUNAS_TABELA_TAREFAS= [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: (_, record) => (
                <a href={record.url_issue} target="blank"> 
                    {record.nome}
                </a>
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
            dataIndex: 'data_termino',
            key: 'data_termino',
            render: (_, record) => (
                <span>
                    {formatDate(record.data_fim)}
                </span>
            )
        },
        {
            title:  'Atribuída à',
            dataIndex: 'membros',
            key: 'membros',
            render: (membros) => (
            <span style={{display: "flex", gap: "10px"}}>
                {membros.map((membro) => (
                <span style={{
                    border: "1px solid var(--primary-color)", 
                    padding: "5px",
                    color: "var(--primary-color)",
                    borderRadius: "5px"
                    }} 
                    key={membro.id_membro_projeto}>
                    {membro.nome_membro} 
                </span>
                ))}
            </span>
            ),
        },
        {
            title: 'Iteração',
            dataIndex: 'nome_iteracao',
            key: 'nome_iteracao'
        }
    ]

    const {dadosProjeto} = useContextoGlobalProjeto()

    const rowSelection = {
        onChange: (selectedRowsKeys, selectedRows) => {
          //setIteracoesSelecionadas(selectedRows)
        },
    };
    return (
        <Table 
            columns={COLUNAS_TABELA_TAREFAS}
            dataSource={tasks}
            rowKey={"id"}
            rowSelection={rowSelection}
        />
    )
}

export default TableTarefasSelect