import { Space, Table } from "antd";
import React from "react";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";

const ListaIssues = ({dadosIssues, carregando}) => {

    const COLUNAS_TABELA_ISSUES = [
        {
            title: "Issue",
            dataIndex: 'issue_name',
            key: 'name'
        },
        {
            title: "Número",
            dataIndex: 'number',
            key: 'number'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (_, record) => (
                <Space>
                    { record.existe ? 
                        <span> <IoCheckmark color="green" size="15px"/></span>
                        : <span> <IoCloseOutline color="red"  size="20px" /></span>
                    }
                </Space>
            )
        },
    ]

    return (    
        <Table 
            className="style-table" 
            loading={carregando} 
            rowKey="sha" 
            columns={COLUNAS_TABELA_ISSUES} 
            dataSource={dadosIssues}
        />
    )
}

export default ListaIssues