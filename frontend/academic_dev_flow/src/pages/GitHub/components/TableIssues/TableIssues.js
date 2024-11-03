import { Empty, Space, Table } from "antd";
import React from "react";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";

const TableIssues = ({data}) => {
    const columnsTable = [
        {
            title: 'Issue',
            dataIndex: 'title',
            key: 'title',
            render: (_, record) => (
                <Space style={{display: 'block'}}>
                    <a href={record.url} target="blank"> 
                        {record.title}
                        <span>
                            {
                                record.exists ? 
                                <IoCheckmark color="green" />
                                : <IoCloseOutline color="red" />
                            }
                        </span> 
                    </a>
                    <span style={{fontSize: '10px'}}> #{record.number} </span>
                </Space>
            )
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
            render: (_, record) => (
                <span
                    style={{
                        
                        fontSize: '12px',
                        fontWeight: 'bolder',
                        color: `${record.state === 'open' ? "#0489B1": "#B40404"}`
                    }}
                >
                    {record.state}
                </span>
                
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
                    style={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', padding: '20px'}}
                />
                
            ) : (
                <Empty
                    description="Nenhuma Issue para exibir"
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

export default TableIssues