import { Empty, Space, Table, Tooltip } from "antd";
import React from "react";
import { IoIosClose } from "react-icons/io";
import { IoIosCheckmark } from "react-icons/io";
import RenderEmpty from "../../../../components/Empty/Empty";

const TableContents = ({data}) => {

    const columnsTable = [
        {
            title: "Content",
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
                <span>
                    <a href={record.url} target="_blank" rel="noreferrer"> {record.name} </a>
                </span>
            )
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
                        (<Tooltip title="Sicronizado">[
                            <span> <IoIosCheckmark color="green" size="25px"/></span>
                        </Tooltip>)
                        
                        : (<Tooltip title="Não sicronizado">
                            <span> <IoIosClose color="red"  size="25px" /></span>
                        </Tooltip>)
                    }
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
                    columns={columnsTable}
                    rowKey="id"
                />
                
            ) : (
                <RenderEmpty title="Nenhum content para exibir" />
            )
        }
        </React.Fragment>
    )
}

export default TableContents