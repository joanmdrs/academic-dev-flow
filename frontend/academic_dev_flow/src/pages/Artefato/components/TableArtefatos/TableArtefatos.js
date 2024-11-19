import { Space, Table, Tooltip } from "antd";
import React from "react";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { optionsStatusArtefatos } from "../../../../services/optionsStatus";
import RenderMembers from "../../../../components/RenderMembers/RenderMembers";
import RenderDate from "../../../../components/RenderDate/RenderDate";
import RenderStatus from "../../../../components/RenderStatus/RenderStatus";
import RenderEmpty from "../../../../components/Empty/Empty";
import { IoChatbubblesOutline } from "react-icons/io5";

const TableArtefatos = ({data, onUpdate, onDelete, onShowComments}) => {
    
    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: (_, record) => (
                <Space>
                    <span className="ff-pop"> {record.nome }</span>
                </Space>
            )
        }, 
        {
            title: 'Membros',
            dataIndex: 'membros',
            key: 'membros',
            render: (_, record) => (
                <RenderMembers membros={record.membros_info} maxAvatars={3} quantMembros={(record.membros_info).length} />
            )
        },
        {
            title: 'Entrega',
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
            title: 'Ações',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Comentários">
                        <span style={{cursor: 'pointer'}} onClick={() => onShowComments(record)}><IoChatbubblesOutline size="20px" /></span>
                    </Tooltip>
                    <Tooltip title="Editar">
                        <span style={{cursor: 'pointer'}} onClick={() => onUpdate(record)}><IoMdCreate /></span>
                    </Tooltip>
                    <Tooltip title="Excluir">
                        <span style={{cursor: 'pointer'}} onClick={() => onDelete(record.id)}><IoMdTrash /></span>
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
                <RenderEmpty title="Nenhum artefato para exibir" /> 
            )
        }
        </React.Fragment>
    )
}   

export default TableArtefatos