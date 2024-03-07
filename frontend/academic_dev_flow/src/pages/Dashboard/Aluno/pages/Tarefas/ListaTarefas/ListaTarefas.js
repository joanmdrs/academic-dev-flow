import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { LuCalendarCheck2 } from "react-icons/lu";
import { MdAccessTime } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoMdCheckboxOutline } from "react-icons/io";
import { useFormContext } from "../../../context/Provider/Provider";
import { ListaTarefasPorProjeto, listarTarefasPorProjeto } from "../../../../../../services/tarefaService";
import { listarMembrosPorListaIds } from "../../../../../../services/membroProjetoService";
import { buscarMembrosPorListaIds } from "../../../../../../services/membroService";


const ListaTarefas = () => {

    const columns = [
        {
          title: 'Nome',
          dataIndex: 'nome',
          key: 'nome',
        },
        {
          title: (
            <>
              <LuCalendarCheck2 style={{color: "#fffff"}} /> Criação
            </>
          ),
          dataIndex: 'data_criacao',
          key: 'data_criacao'
      
        },
        {
          title: (
            <>
              <MdAccessTime/> Prazo
            </>
          ),
          dataIndex: 'prazo',
          key: 'prazo',
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
            <span>
              {membros.map((membro) => (
                <span key={membro.id}>{membro.nome}, </span>
              ))}
            </span>
          ),
        },
        {
            title: (
                <>
                    <IoMdCheckboxOutline /> Concluída
                </>
            ),
            dataIndex: 'concluida',
            key: 'concluida'
        }
        
    ];

    const {dadosProjeto} = useFormContext()
    const [tarefas, setTarefas] = useState([])

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
        const promises = response.data.map(async (tarefa) => {
            const response1 = await listarMembrosPorListaIds(tarefa.membros)

            console.log(response1.data.results)
            const listaIds = response1.data.results.map(item => item.membro);

            const response2 = await buscarMembrosPorListaIds(listaIds)


            return {
                id: tarefa.id,
                nome: tarefa.nome,
                data_criacao: tarefa.data_criacao,
                prazo: tarefa.prazo,
                membros: response2.data.results,
                projeto: tarefa.projeto,
                concluida: tarefa.concluida

            }

        })

        const resultados = await (Promise.all(promises))
        setTarefas(resultados)
    }
    

    return (
        <Table
            dataSource={tarefas}
            columns={columns}
            rowKey="id"
            rowSelection={{
                type: 'checkbox'
            }}
        />
    )
}

export default ListaTarefas