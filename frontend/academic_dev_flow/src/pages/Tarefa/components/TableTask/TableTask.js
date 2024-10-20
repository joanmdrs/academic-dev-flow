import { Avatar, Empty, Space, Table, Tooltip } from "antd";
import React from "react";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { getRandomColor, limitarCaracteres } from "../../../../services/utils";
import { FaPlay } from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";

const TableTask = ({tasks, onUpdate, onDelete}) => {

    const maxAvatars = 3

    const columnsTable = [
        {
            title: 'Tarefa',
            dataIndex: 'nome_tarefa',
            key: 'nome_tarefa'
        },
        {
            title: 'Membros',
            dataIndex: 'nomes_membros',
            key: 'nomes_membros',
            render: (_, record) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
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
            key: 'data_inicio'
        },
        {
            title: 'Fim',
            dataIndex: 'data_termino',
            key: 'data_termino'
        },
        {
            title: 'Comentários',
            dataIndex: 'comentarios_tarefa',
            key: 'comentarios_tarefa'
        },
        {
            title: 'Categoria',
            dataIndex: 'categoria_tarefa',
            key: 'categoria_tarefa'
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
                        <a onClick={() => onDelete(record.projeto)}><IoMdTrash /></a>
                    </Tooltip>
                </Space>
            )
        }
    ]



    return (
        <React.Fragment>
            {
            tasks.length !== 0 ? (
                <div className="global-div">
                    <Table
                        dataSource={tasks}
                        columns={columnsTable}
                        rowKey="id"
                    />
                </div>

                
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