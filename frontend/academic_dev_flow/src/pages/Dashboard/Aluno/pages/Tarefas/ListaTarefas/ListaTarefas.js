import "./ListaTarefas.css"
import { Empty, Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { LuCalendarCheck2 } from "react-icons/lu";
import { MdAccessTime } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import { useFormContext } from "../../../context/Provider/Provider";
import { formatDate } from "../../../../../../services/utils";
import Item from "antd/es/list/Item";
import { GoCheck } from "react-icons/go";
import { FaRegFolderOpen } from "react-icons/fa";
import { listarTarefasPorProjeto } from "../../../../../../services/tarefaService";

const ListaTarefas = ({onEdit}) => {

    const columns = [
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

    const CustomTable = ({dados, colunas}) => {
      return (
        <Table
          className="table-lista-tarefas"
          dataSource={dados}
          columns={colunas}
          rowKey="id"
          rowSelection={{
              type: 'checkbox'
          }}
        />
      )
    }

    const {dadosProjeto, dadosTarefa, setDadosTarefa} = useFormContext()
    const [tarefasPendentes, setTarefasPendentes] = useState([])
    const [tarefasResolvidas, setTarefasResolvidas] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto !== null){
                await handleGetTarefas()
            }
        }

        fetchData()
    }, [])

    const handleGetTarefas = async () => {

        const response = await listarTarefasPorProjeto(dadosProjeto.id)

        if (response.data.length > 0) {
          const tarefasConcluidas = response.data.filter((tarefa) => tarefa.concluida);
          const tarefasNaoConcluidas = response.data.filter((tarefa) => !tarefa.concluida);

          setTarefasPendentes(tarefasNaoConcluidas)
          setTarefasResolvidas(tarefasConcluidas)
        }
    }
    
    return (

      <React.Fragment>
          <Tabs>
            <Item tab="Abertas" key="1" icon={<FaRegFolderOpen />}>
              { tarefasPendentes.length > 0 ? (<CustomTable colunas={columns} dados={tarefasPendentes}/>) : (
                  <Empty 
                    description="Não há tarefas pendentes"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
            </Item>

            <Item tab="Resolvidas" key="2" icon={<GoCheck />}>
              { tarefasResolvidas.length > 0 ? (<CustomTable colunas={columns} dados={tarefasResolvidas}/>) : (
                <Empty 
                  description="Não há tarefas resolvidas"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
              
            </Item>
          </Tabs>
      </React.Fragment>
    )
}

export default ListaTarefas