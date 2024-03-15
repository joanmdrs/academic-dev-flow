import { Flex, Table } from "antd";
import React from "react";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import { useProjetoContext } from "../../../context/ProjetoContext";
import { excluirIteracao } from "../../../services/iteracaoService";
import { formatDate } from "../../../services/utils";


const cronogramaStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%"
}

const colunaStyle = {
    padding: "0",
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    width: '25%',
    height: '100vh',
}

const iteracaoStyle = {
    flex: "1",
    textAlign: "center",
    textTransform: "uppercase",
    color: "#fff"
}

const Cronograma = ({iteracoes, exibirForm, }) => {

    const COLUNAS_ITERACOES = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: (_, record) => (
                <span style={{cursor: "pointer", color: "var(--primary-color)"}} onClick={() => handleEdit(record)}>
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
            title: 'Gerente',
            dataIndex: 'nome_membro',
            key: 'nome_membro'
        },
        {
            title: 'Fase',
            dataIndex: 'nome_etapa',
            key: 'nome_etapa'
        }
    ]

    const {setDadosIteracao} = useProjetoContext()

    const handleEdit = (record) => {
        exibirForm()
        setDadosIteracao(record)
    }

    const handleDelete = async (record) => {
        await excluirIteracao(record.id)
    }

    const rowSelection = {
        onChange: (selectedRowsKeys, selectedRows) => {
          console.log(selectedRows)
        },
    };

    return (
        <div style={{...cronogramaStyle}}>
                
            <h4 style={{textAlign: "center"}}> Cronograma de Iterações </h4> 
            {
                iteracoes &&  
                                    
                <Table 
                    bordered={true}
                    className="style-table"
                    columns={COLUNAS_ITERACOES}
                    dataSource={iteracoes}
                    rowKey={"id"}
                    rowSelection={rowSelection}
                />

            }
        </div>
    )
}

export default Cronograma