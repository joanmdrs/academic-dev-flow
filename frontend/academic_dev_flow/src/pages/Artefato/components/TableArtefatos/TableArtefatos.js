import { Empty, Space, Table, Tooltip } from "antd";
import React from "react";
import { GoCommentDiscussion } from "react-icons/go";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";
import { optionsStatusArtefatos } from "../../../../services/optionsStatus";
import RenderMembers from "../../../../components/RenderMembers/RenderMembers";
import RenderDate from "../../../../components/RenderDate/RenderDate";
import RenderStatus from "../../../../components/RenderStatus/RenderStatus";

const TableArtefatos = ({data, onUpdate, onDelete, onShowComments}) => {
    
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
            dataIndex: 'membros',
            key: 'membros',
            align: 'center',
            render: (_, record) => (
                <RenderMembers membros={record.membros_info} maxAvatars={3} quantMembros={(record.membros_info).length} />
            )
        },
        {
            title: 'Criação',
            dataIndex: 'data_criacao',
            key: 'data_criacao',
            align: 'center',
            render: (_, record) => (
                <RenderDate dateType="inicio" dateValue={record.data_criacao} />
                    
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
            title: 'Status', 
            dataIndex: 'status', 
            key: 'status',
            align: 'center',
            render: (_, record) => (
                <RenderStatus optionsStatus={optionsStatusArtefatos} propStatus={record.status} />
            )
        },
        {
            title: 'Comentários',
            dataIndex: 'comentarios_artefato',
            key: 'comentarios_artefato',
            align: 'center',
            render: (_, record) => (
                <Space>
                     <a onClick={() => onShowComments(record)}><GoCommentDiscussion size="20px" /></a>
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
            data.length !== 0 ? (
                    <Table
                        dataSource={data}
                        columns={columns}
                        rowKey="id"
                        style={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', padding: '20px'}}
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

export default TableArtefatos