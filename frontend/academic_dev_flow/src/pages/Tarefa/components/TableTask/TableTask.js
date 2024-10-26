import { Avatar, Button, Empty, Space, Table, Tooltip } from "antd";
import React from "react";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { formatarTempo, formatDate, getRandomColor } from "../../../../services/utils";
import { FaPause, FaPlay, FaRegClock } from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";

const TableTask = ({tarefas, onUpdate, onDelete, onStartTarefa, onPauseTarefa}) => {

    const maxAvatars = 3

    const columnsTable = [
        {
            title: 'Tarefa',
            dataIndex: 'nome',
            key: 'nome',
        },
        {
            title: 'Categoria',
            dataIndex: 'categoria_tarefa',
            key: 'categoria_tarefa',
            render: (_, record) => (
                <span style={{
                    fontSize: '10px',
                    fontWeight: 'bold',
                    color: '#FFFFFF', 
                    backgroundColor: `${record.cor_categoria}`,
                    padding: '10px',
                    borderRadius: '10px',
                    textTransform: 'uppercase'

                }}> {record.nome_categoria} </span>
            )
        },
        {
            title: 'Membros',
            dataIndex: 'nomes_membros',
            key: 'nomes_membros',
            align: 'center',
            render: (_, record) => (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{ display: 'flex', position: 'relative', marginLeft: -8 }}>
                        {
                            record.nomes_membros.slice(0, maxAvatars).map((membro, index) => (
                                <Tooltip title={`${membro}`}>
                                    <Avatar
                                        key={index}
                                        style={{
                                            backgroundColor: getRandomColor(),
                                            zIndex: record.quantidade_membros - index,
                                            marginLeft: index > 0 ? -10 : 0, // Sobreposição
                                        }}
                                    >
                                        {membro[0].toUpperCase()} {/* Mostra a primeira letra do nome */}
                                    </Avatar>
                                </Tooltip>
                                
                            ))
                        }
                        {
                           ( record.quantidade_membros - maxAvatars ) > 0 && 
                                <Avatar
                                    key={record.quantidade_membros - maxAvatars}
                                    style={{
                                        backgroundColor: getRandomColor(),
                                        zIndex: (record.quantidade_membros - maxAvatars),
                                        marginLeft: (record.quantidade_membros - maxAvatars) > 0 ? -10 : 0, // Sobreposição
                                    }}
                                >
                                    { `+${(record.quantidade_membros - maxAvatars)}`}
                                </Avatar>
                        }
                    </div>
                </div>
            )
        },
        {
            title: 'Início',
            dataIndex: 'data_inicio',
            key: 'data_inicio',
            align: 'center',
            render: (_, record) => (
                    <span className="task-start-date"><FaRegClock /> {formatDate(record.data_inicio)}</span>
                    
            )
        },
        {
            title: 'Fim',
            dataIndex: 'data_termino',
            key: 'data_termino',
            align: 'center',
            render: (_, record) => (
                <span className="task-end-date"><FaRegClock /> {formatDate(record.data_termino)}</span>
            )
        },
        {
            title: 'Comentários',
            dataIndex: 'comentarios_tarefa',
            key: 'comentarios_tarefa',
            align: 'center',
            render: (_, record) => (
                <Space>
                     <a><GoCommentDiscussion size="20px" /></a>
                </Space>
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
                    <Tooltip title="Editar">
                        <a onClick={() => onUpdate(record)}><IoMdCreate /></a>
                    </Tooltip>
                    <Tooltip title="Excluir">
                        <a onClick={() => onDelete(record.id)}><IoMdTrash /></a>
                    </Tooltip>
                </Space>
            )
        }
    ]

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
                <Empty
                    description="Nenhuma tarefa para exibir"
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    style={{
                        display: 'flex',
                        width: "100%",
                        height: "100%",
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                </Empty>
            )
        }
        </React.Fragment>
        
    )
}

export default TableTask