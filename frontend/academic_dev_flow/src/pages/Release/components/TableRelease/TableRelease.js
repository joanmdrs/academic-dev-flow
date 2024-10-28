import { Empty, Space, Table, Tooltip } from "antd";
import React from "react";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { formatDate } from "../../../../services/utils";
import RenderStatus from "../../../../components/RenderStatus/RenderStatus";
import { optionsStatusReleases } from "../../../../services/optionsStatus";

const TableRelease = ({data, onUpdate, onDelete}) => {

    const columnsTable = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome'
        },
        {
            title: 'Projeto',
            dataIndex: 'projeto',
            key: 'projeto',
            render: (_, record) => (
                <Space> {record.nome_projeto} </Space>
            ),
        },
        
        {
            title: 'Lançamento',
            dataIndex: 'data_lancamento',
            key: 'data_lancamento',
            render: (_, record) => (
                <Space>
                    {formatDate(record.data_lancamento)}
                </Space>
            )
        },
        {
            title: 'Responsável',
            dataIndex: 'responsavel',
            key: 'responsavel',
            render: (_, record) => (
                <Space>
                    {record.nome_responsavel}
                </Space>
            )
        },
        {
            title: 'Etapa',
            dataIndex: 'etapa',
            key: 'etapa',
            render: (_, record) => (
                <Space>
                    {record.nome_etapa}
                </Space>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (_, record) => (
                <RenderStatus optionsStatus={optionsStatusReleases} propStatus={record.status} /> 
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

    const rowSelection = {
        onChange: (selectedRowsKeys, selectedRows) => {
            console.log(selectedRows)
        },
    };

    return (
        <React.Fragment>
            {
            data.length !== 0 ? (
                <Table
                    columns={columnsTable}
                    dataSource={data}
                    rowKey="id"
                    rowSelection={rowSelection}
                
                />

                
            ) : (
                <Empty
                    description="Nenhuma release para exibir"
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    style={{
                        display: 'flex',
                        width: "100%",
                        height: "100%",
                        padding: '40px',
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

export default TableRelease