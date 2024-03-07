import "./ListaTarefas.css"
import { Button, Empty, Modal, Popconfirm, Table, Tabs } from "antd";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { LuCalendarCheck2 } from "react-icons/lu";
import { MdAccessTime } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import { useFormContext } from "../../../context/Provider/Provider";
import { formatDate } from "../../../../../../services/utils";
import Item from "antd/es/list/Item";
import { GoCheck } from "react-icons/go";
import { FaRegFolderOpen, FaTrash } from "react-icons/fa";
import { excluirTarefas, listarTarefasPorProjeto } from "../../../../../../services/tarefaService";
import Loading from "../../../../../../components/Loading/Loading";

const ListaTarefas = ({onEdit, onDelete}) => {

    const columns = [
      {
        title: "ID",
        dataIndex: 'id',
        key: 'id'
      },

        {
          title: 'Nome',
          dataIndex: 'nome',
          key: 'nome',
          render: (_, record) => (
            <span onClick={() => onEdit(record)} style={{color: "var(--primary-color)", cursor: 'pointer'}}> {record.nome} </span>
          )
        },
        {
          title: (
            <>
              <LuCalendarCheck2 style={{color: "#fffff"}} /> Criação
            </>
          ),
          dataIndex: 'data_criacao',
          key: 'data_criacao',
          render: (data_criacao) => (
            <span> {formatDate(data_criacao)} </span>
          ),
      
        },
        {
          title: (
            <>
              <MdAccessTime/> Prazo
            </>
          ),
          dataIndex: 'prazo',
          key: 'prazo',
          render: (prazo) => (
            <span> {prazo} dia(s) </span>
          )
        },
        {
          title: (
            <>
              <HiOutlineUsers /> Atribuída à
            </>
          ),
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
    ];


    const {dadosProjeto, tarefasExcluir, setTarefasExcluir} = useFormContext()
    const [tarefasPendentes, setTarefasPendentes] = useState([])
    const [tarefasResolvidas, setTarefasResolvidas] = useState([])
    const [loading, setLoading] = useState(true)

    const handleGetTarefas = async () => {

      const response = await listarTarefasPorProjeto(dadosProjeto.id)

      if (response.data.length > 0) {
        const tarefasConcluidas = response.data.filter((tarefa) => tarefa.concluida);
        const tarefasNaoConcluidas = response.data.filter((tarefa) => !tarefa.concluida);

        setTarefasPendentes(tarefasNaoConcluidas)
        setTarefasResolvidas(tarefasConcluidas)

        return {tarefasConcluidas, tarefasNaoConcluidas}
      }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto !== null){
              await handleGetTarefas()
            }

            setLoading(false)
        }

        fetchData()
    }, [dadosProjeto, loading])

    if (loading) {
      return <Loading />
    }

    const rowSelection = {
      onChange: (selectedRowsKeys, selectedRows) => {
        setTarefasExcluir(selectedRows)
      },
    };

    const handleDeleteTarefa = async () => {

      if (tarefasExcluir !== null) {
        const ids = tarefasExcluir.map((item) => item.id)
        await excluirTarefas(ids)
        setTarefasExcluir([])
        setTarefasPendentes([])
        setTarefasResolvidas([])
        setLoading(true)
      } 
    }

  const showDeleteConfirm = () => {

    Modal.confirm({
        title: 'Confirmar exclusão',
        content: 'Tem certeza que deseja excluir a(s) tarefa(s) ?',
        okText: 'Sim',
        cancelText: 'Não',
        onOk: async () =>  await handleDeleteTarefa()
        
      });
  };

  
    
    return (

      <div>

          <div style={{display: "flex", justifyContent: "flex-end", marginRight: "20px"}}> 
            { 
              (tarefasExcluir.length > 0) && 

                <Button danger icon={<FaTrash />} onClick={() => showDeleteConfirm()}> Excluir </Button>

              
            }
          </div>
  
          <Tabs>
            <Tabs.TabPane tab="Abertas" key="1" icon={<FaRegFolderOpen />}>
              { tarefasPendentes.length > 0 ? (
                <Table
                  className="table-lista-tarefas"
                  dataSource={tarefasPendentes}
                  columns={columns}
                  rowKey="id"
                  rowSelection={rowSelection}
                  />
              ) : (
                  <Empty 
                    description="Não há tarefas pendentes"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
            </Tabs.TabPane>

            <Tabs.TabPane tab="Resolvidas" key="2" icon={<GoCheck />}>
              { tarefasResolvidas.length > 0 ? (
                <Table
                  className="table-lista-tarefas"
                  dataSource={tarefasResolvidas}
                  columns={columns}
                  rowKey="id"
                  rowSelection={rowSelection}
                  />
              ) : (
                  <Empty 
                    description="Não há tarefas resolvidas"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
            </Tabs.TabPane>
          </Tabs>
      </div>
    )
}

export default ListaTarefas