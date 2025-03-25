import { Empty, Space, Table, Tooltip } from "antd";
import React from "react";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const TableProjetos = ({data, onViewPanel}) => {
    
    const columns = [
        {
            title: 'Projeto',
            dataIndex: 'projeto',
            key: 'projeto',
            render: (_, record) => (
                <Space>
                    <h4 
                        onClick={() => onViewPanel(record)}  
                        style={{ cursor: 'pointer'}}
                    > {record.dados_projeto.nome }
                </h4>
                </Space>
            )
        },
        {
            title: 'Github',
            dataIndex: 'sicronizacao',
            key: 'sicronizacao',
            align: 'center',
            render: (_, record) => (
                <Space>
                    {
                        record.dados_projeto.token ? (
                            <Tooltip title="Sicronizado">
                                <span> 
                                    <FaCheck color="#00FF00" size="20px" />
                                </span>
                            </Tooltip>
                            
                        ) : (
                            <Tooltip title="Não sicronizado">
                                <span> 
                                    <IoClose color="red" size="20px" />
                                </span>
                            </Tooltip>
                            
                        )
                        
                    }
                </Space>
            )
        }, 

    ]
    return (
        <React.Fragment>
            {
            data.length !== 0 ? (
                    <Table
                        style={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', padding: '20px'}}
                        dataSource={data}
                        columns={columns}
                        rowKey="id"
                    />
                
            ) : (
                <Empty
                    description="Nenhum projeto para exibir"
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

export default TableProjetos