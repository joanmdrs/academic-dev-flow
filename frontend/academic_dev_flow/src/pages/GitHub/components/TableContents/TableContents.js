import { Space, Table, Tooltip } from "antd";
import React from "react";
import { IoMdOpen, IoMdTrash } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { IoIosCheckmark } from "react-icons/io";

const TableContents = ({contentsData, onLoading, onDelete}) => {

    const COLUNAS_ARQUIVOS = [
        {
            title: "Content",
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: "Path content",
            dataIndex: 'path',
            key: 'path'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (_, record) => (
                <Space>
                    { record.exists ? 
                        <span> <IoIosCheckmark color="green" size="25px"/></span>
                        : <span> <IoIosClose color="red"  size="25px" /></span>
                    }
                </Space>
            )
        },
        {
            title: 'Ações',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Visualizar">
                        <a href={record.url} target="blank"> <IoMdOpen /></a>
                    </Tooltip>
                </Space>
            )
        }
    ]

    return (    
        <Table loading={onLoading} rowKey="sha" columns={COLUNAS_ARQUIVOS} dataSource={contentsData}/>
    )
}

export default TableContents