import React from "react"
import {Table, Space, Tooltip} from 'antd'
import { IoMdCreate, IoMdTrash } from "react-icons/io"
import RenderEmpty from "../../../../components/Empty/Empty"
import { useContextoTag } from "../../context/ContextoTag"
import RenderTag from "../../../../components/RenderTag/RenderTag"

const TableTags = ({data, onEdit, onDelete}) => {

    const columnsTable = [
        {

            title: 'Nome', 
            dataIndex: 'nome',
            key: 'nome',
            render: (_, record) => (
                <RenderTag item={record} />
            ),  
        },
        {
            title: 'Descrição',
            dataIndex: 'descricao',
            key: 'descricao'
        },
        {

            title: 'Ações',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Editar">
                        <a onClick={() => onEdit(record)}><IoMdCreate /></a>
                    </Tooltip>
                    <Tooltip title="Excluir">
                        <a onClick={() => onDelete(record.id)}><IoMdTrash /></a>
                    </Tooltip>
                </Space>
            ),
            },

    ]

    const  {setTagsSelect } = useContextoTag()
    const rowSelection = {
        onChange: (selectedRowsKeys, selectedRows) => {
          setTagsSelect(selectedRows)
        },
    };

    return (
        <React.Fragment>
            { data.length !== 0 ? (
                <Table
                    className="bs-1 pa-20"
                    rowKey="id"
                    columns={columnsTable}
                    dataSource={data}  
                    rowSelection={rowSelection}
                />
            ) : (
                <RenderEmpty title="Nenhuma tag para exibir" />
            )}
        </React.Fragment>
    )
}

export default TableTags