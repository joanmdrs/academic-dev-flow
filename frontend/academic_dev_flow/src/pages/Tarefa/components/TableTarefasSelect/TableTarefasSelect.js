import { Space, Table } from "antd";
import React from "react";
import { formatDate } from "../../../../services/utils";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { useContextoTarefa } from "../../context/ContextoTarefa";

const TableTarefasSelect = ({tasks, onEdit}) => {

    const COLUNAS_TABELA_TAREFAS= [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: (_, record) => (
                <Space style={{display: 'block'}}>
                    <a href={record.url_issue} target="blank"> 
                        {record.nome}
                    </a>

                    <span style={{color: '#585858', fontSize: '10px'}}>
                        #{record.number_issue} {formatDate(record.data_inicio)} - {formatDate(record.data_termino)} 
                    </span>
                
                </Space>
        
            )
        },
        {
            title:  'Atribuída à',
            dataIndex: 'membros_info',
            key: 'membros_info',
            render: (membros_info) => (
            <span style={{display: "flex", gap: "10px"}}>
                {membros_info.map((membro) => (
                <span style={{
                    color: "var(--primary-color)",
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
        },
        {
            title: 'Ações',
            dataIndex: 'actions', 
            key: 'actions', 
            render: (_, record) => (
                <Space>
                    <a onClick={() => onEdit(record)}> Editar </a>
                </Space>
            )
        }
    ]

    const {dadosProjeto} = useContextoGlobalProjeto()
    const {setTarefasSelecionadas} = useContextoTarefa()

    const rowSelection = {
        onChange: (selectedRowsKeys, selectedRows) => {
          setTarefasSelecionadas(selectedRows)
        },
    };

    return (
        <Table 
            className="style-table"
            bordered
            columns={COLUNAS_TABELA_TAREFAS}
            dataSource={tasks}
            rowKey={"id"}
            rowSelection={rowSelection}
        />
    )
}

export default TableTarefasSelect