import { Space, Table, Tooltip } from "antd";
import React from "react";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { optionsStatusFeedback } from "../../../../services/optionsStatus";
import RenderStatus from "../../../../components/RenderStatus/RenderStatus";
import RenderEmpty from "../../../../components/Empty/Empty";
import { limitarCaracteres } from "../../../../services/utils";
import { useContextoFeedback } from "../../context/ContextoFeedback";

const TableFeedbacks = ({data, onUpdate, onDelete}) => {
    
    const columns = [
        {
            title: 'Título',
            dataIndex: 'titulo',
            key: 'titulo',
        },
        {
            title: 'Descrição',
            dataIndex: 'descricao',
            key: 'descricao'
        },
        {
            title: 'Status', 
            dataIndex: 'status', 
            key: 'status',
            render: (_, record) => (
                <RenderStatus optionsStatus={optionsStatusFeedback} propStatus={record.status} />
            )
        },
        {
            title: 'Ações',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
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

    const {setFeedbacksSelecionados} = useContextoFeedback()
    
        const rowSelection = {
            onChange: (selectedRowsKeys, selectedRows) => {
              setFeedbacksSelecionados(selectedRows)
            },
        };
    


    return (
        <React.Fragment>
            {
            data.length !== 0 ? (
                    <Table
                        dataSource={data}
                        columns={columns}
                        rowKey="id"
                        rowSelection={rowSelection}
                    />                
            ) : (
                <RenderEmpty title="Nenhum feedback para exibir" /> 
            )
        }
        </React.Fragment>
    )
}   

export default TableFeedbacks