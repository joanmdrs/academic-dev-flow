import { Avatar, Empty, Space, Table, Tooltip } from "antd";
import React from "react";
import { FaRegClock } from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";
import { formatDate, getRandomColor } from "../../../../services/utils";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";
import { optionsStatusArtefatos } from "../../../../services/optionsStatus";

const TableArtifacts = ({artefatos, onUpdate, onDelete}) => {
    
    const maxAvatars = 3
    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: (_, record) => (
                <Space>
                    <span style={{color: 'var(--primary-color'}}> <IoDocumentText /> </span>
                    <span style={{color: 'var(--primary-color'}}> {record.nome }</span>
                </Space>
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
            title: 'Criação',
            dataIndex: 'data_criacao',
            key: 'data_criacao',
            align: 'center',
            render: (_, record) => (
                    <span className="task-start-date"><FaRegClock /> {formatDate(record.data_criacao)}</span>
                    
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
            title: 'Status', 
            dataIndex: 'status', 
            key: 'status',
            render: (_, record) => {
                const statusOption = optionsStatusArtefatos.find(option => option.value === record.status);
                return (
                    <Space style={{
                        width: '100px',         
                        height: '30px',  
                        fontSize: '10px',
                        fontWeight: 'bold',
                        color: '#FFFFFF', 
                        backgroundColor: `${statusOption.color}`,
                        padding: '10px',       
                        borderRadius: '5px',
                        textTransform: 'uppercase',
                        textAlign: 'center',    
                    }}> 
                        {statusOption.label} 
                    </Space>
                )
            }
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
            artefatos.length !== 0 ? (
                    <Table
                        dataSource={artefatos}
                        columns={columns}
                        rowKey="id"
                    />

                
            ) : (
                <Empty
                    description="Nenhum artefato para exibir"
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    style={{
                        display: 'flex',
                        width: "100%",
                        height: "100%",
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                    }}
                >
                </Empty>
            )
        }
        </React.Fragment>
    )
}   

export default TableArtifacts