import { Button, Empty, Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { formatarTempo, handleError } from "../../../../services/utils";
import { FaPause, FaPlay } from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";
import RenderMembers from "../../../../components/RenderMembers/RenderMembers";
import RenderDate from "../../../../components/RenderDate/RenderDate";
import RenderStatus from "../../../../components/RenderStatus/RenderStatus";
import { optionsStatusTarefas } from "../../../../services/optionsStatus";
import { listarCategoriaTarefa } from "../../../../services/categoriaTarefaService";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";
import { useContextoTarefa } from "../../context/ContextoTarefa";
import RenderEmpty from "../../../../components/Empty/Empty";
import { IoChatbubblesOutline } from "react-icons/io5";

const TableTask = ({onUpdate, onDelete, onStartTarefa, onPauseTarefa, onShowComments}) => {
    
    const [optionsCategorias, setOptionsCategorias] = useState([]);
    const {tarefas} = useContextoTarefa()

    const columnsTable = [
        {
            title: 'Tarefa',
            dataIndex: 'nome',
            key: 'nome',
            render: (_, record) => (
                <span className="ff-pop"> {record.nome} </span>
            )
        },
        {
            title: 'Categoria',
            dataIndex: 'categoria_tarefa',
            key: 'categoria_tarefa',
            filters: optionsCategorias.map(option => ({
                text: option.label,
                value: option.value
            })),
            onFilter: (value, record) => record.categoria === value, 
            render: (_, record) => (
                <span style={{
                    fontSize: '10px',
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    backgroundColor: `${record.cor_categoria}`,
                    padding: '10px',
                    borderRadius: '5px',
                    textTransform: 'uppercase'
                }}>
                    {record.nome_categoria}
                </span>
            )
        },
        {
            title: 'Membros',
            dataIndex: 'nomes_membros',
            key: 'nomes_membros',
            align: 'center',
            render: (_, record) => (
                <RenderMembers 
                    maxAvatars={3} 
                    membros={record.membros_info} 
                    quantMembros={(record.membros_info).length} 
                />
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            filters: optionsStatusTarefas.map(option => ({
                text: option.label,
                value: option.value
            })),
            onFilter: (value, record) => record.status === value,
            render: (_, record) => (
                <RenderStatus optionsStatus={optionsStatusTarefas} propStatus={record.status} />
            )
        },
        {
            title: 'Início',
            dataIndex: 'data_inicio',
            key: 'data_inicio',
            align: 'center',
            render: (_, record) => (
                <RenderDate dateType="inicio" dateValue={record.data_inicio} />
            )
        },
        {
            title: 'Fim',
            dataIndex: 'data_termino',
            key: 'data_termino',
            align: 'center',
            render: (_, record) => (
                <RenderDate dateType="termino" dateValue={record.data_termino} />
            )
        },
        {
            title: 'Contar tempo',
            dataIndex: 'contar_tempo',
            key: 'contar_tempo',
            render: (_, record) => (
                <Space> 
                    {
                        !record.estado_contagem_tempo ? (
                            <Button style={{
                                border: 'none',
                                padding: '10px', 
                                borderRadius: '5px', 
                                fontSize: '12px', 
                                fontWeight: 'bold', 
                                backgroundColor: '#A9E2F3', 
                                color: '#0B4C5F'
                            }} 
                                icon={<FaPlay />}
                                onClick={() => onStartTarefa(record)}
                            > 
                                Iniciar
                            </Button>
                        ) : (
                            <Button style={{
                                border: 'none',
                                padding: '10px', 
                                borderRadius: '5px', 
                                fontSize: '12px', 
                                fontWeight: 'bold', 
                                backgroundColor: '#F6CECE', 
                                color: '#B40404'
                            }} 
                                icon={<FaPause />}
                                onClick={() => onPauseTarefa(record)}
                            > 
                                Pausar
                            </Button>
                        )
                    }
                    
                    
                </Space>
            )
        },
        {
            title: 'Tempo Gasto',
            dataIndex: 'tempo_gasto',
            key: 'tempo_gasto',
            align: 'center',
            render: (_, record) => (
                <Space>
                    <span> {formatarTempo(record.tempo_gasto)}</span>
                </Space>
            )
        },
        {
            title: 'Ações',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Comentários">
                        <span style={{cursor: 'pointer'}} onClick={() => onShowComments()}><IoChatbubblesOutline size="20px" /></span>
                    </Tooltip>
                    
                    <Tooltip title="Editar">
                        <span style={{cursor: 'pointer'}}  onClick={() => onUpdate(record)}><IoMdCreate /></span>
                    </Tooltip>
                    <Tooltip title="Excluir">
                        <span style={{cursor: 'pointer'}} onClick={() => onDelete(record.id)}><IoMdTrash /></span>
                    </Tooltip>
                </Space>
            )
        }
    ]

    useEffect(() => {
        const handleGetCategorias = async () => {
            try {
                const response = await listarCategoriaTarefa();
                if (!response.error && response.data) {
                    const resultados = response.data.map((item) => ({
                        value: item.id,
                        label: item.nome
                    }));
                    setOptionsCategorias(resultados);
                }
            } catch (error) {
                return handleError(error, ERROR_MESSAGE_ON_SEARCHING);
            }
        };

        handleGetCategorias()
    }, [])

    return (
        <React.Fragment>
            {
            tarefas.length !== 0 ? (
                    <Table
                        dataSource={tarefas}
                        columns={columnsTable}
                        rowKey="id"
                    />

                
            ) : (
                <RenderEmpty title="Nenhuma tarefa para exibir" />
            )
        }
        </React.Fragment>
        
    )
}

export default TableTask