import { Button, Modal, Table } from "antd";
import React from "react";
import { useProjetoContext } from "../../../../context/ContextoGlobalProjeto";
import { excluirIteracoes } from "../../../../services/iteracaoService";
import { formatDate } from "../../../../services/utils";
import { FaTrash } from "react-icons/fa";


const cronogramaStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%"
}

const Cronograma = ({iteracoes, onShow, onReload}) => {

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

    const {setDadosIteracao, iteracoesSelecionadas, setIteracoesSelecionadas} = useProjetoContext()

    const handleEdit = (record) => {
        onShow()
        setDadosIteracao(record)
    }

    const handleDelete = async () => {

        if (iteracoesSelecionadas !== null) {
          const ids = iteracoesSelecionadas.map((item) => item.id)
          await excluirIteracoes(ids)
          setIteracoesSelecionadas([])
        } 

        onReload()
      }
  
    const showDeleteConfirm = () => {
  
      Modal.confirm({
          title: 'Confirmar exclusão',
          content: 'Tem certeza que deseja excluir a(s) iteração(ões) ?',
          okText: 'Sim',
          cancelText: 'Não',
          onOk: async () =>  await handleDelete()
          
        });
    };

    const rowSelection = {
        onChange: (selectedRowsKeys, selectedRows) => {
          setIteracoesSelecionadas(selectedRows)
        },
    };

    return (
        <div style={{...cronogramaStyle}}>

            <h4 style={{textAlign: "center"}}> Cronograma de Iterações </h4> 
        
            <React.Fragment>
                
                <div style={{display: "flex", justifyContent: "flex-end", marginRight: "20px"}}>  
                    {
                        (iteracoesSelecionadas.length > 0) && <Button danger icon={<FaTrash />} onClick={() => showDeleteConfirm()}> Excluir </Button>
                    }
                </div>

                

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
            </React.Fragment>
            
        </div>
    )
}

export default Cronograma