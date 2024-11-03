import { Avatar, Empty, Space, Table } from "antd";
import React from "react";
import RenderMembers from "../../../../components/RenderMembers/RenderMembers";
import { getRandomColor } from "../../../../services/utils";
import { FaUsers } from "react-icons/fa";

const TableProjetoEquipe = ({data, onOpen}) => {

    const columnsTable = [
        {
            title: 'Projeto',
            dataIndex: 'nome_projeto',
            key: 'nome_projeto',
            render: (_, record) => (
                <Space>
                    <Avatar style={{backgroundColor: `${getRandomColor()}`}} icon={<FaUsers />} />
                    <h4 
                        onClick={() => onOpen(record)}
                        style={{
                            fontFamily: 'Poppins, sans-serif', 
                            color: 'var(--primary-color)', 
                            fontWeight: '400', 
                            cursor: 'pointer'
                        }}> 
                        {record.dados_projeto.nome }</h4>
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