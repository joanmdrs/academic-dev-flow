import { Button, Empty, Space, Table } from "antd";
import React from "react";
import RenderMembers from "../../../../components/RenderMembers/RenderMembers";

const TableProjetoEquipe = ({data, onOpen}) => {

    const columnsTable = [
        {
            title: 'Projeto',
            dataIndex: 'nome_projeto',
            key: 'nome_projeto',
            render: (_, record) => (
                <Space>
                    {record.nome_projeto}
                </Space>
            )
        }, 
        {
            title: 'Membros',
            dataIndex: 'nomes_membros',
            key: 'nomes_membros',
            render: (_, record) => (
                <RenderMembers 
                    membros={record.equipe} 
                    quantMembros={record.quantidade_membros} 
                    maxAvatars={3} 
                />
            )
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space> 
                    <Button onClick={() => onOpen(record)} type="primary"> Abrir </Button>
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
                <Empty
                    description="Você ainda não está vinculado a nenhum projeto"
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

export default TableProjetoEquipe