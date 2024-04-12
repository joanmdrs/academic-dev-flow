import { Space, Table } from "antd";
import React from "react";

const ListaArquivos = ({dadosArquivos, carregando}) => {

    const COLUNAS_ARQUIVOS = [
        {
            title: "Nome arquivo",
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: "Path do arquivo",
            dataIndex: 'path',
            key: 'path'
        },
        {
            title: 'Ações',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Sicronizar</a>
                </Space>
            )
        }
    ]

    return (    
        <Table className="style-table" loading={carregando} rowKey="sha" columns={COLUNAS_ARQUIVOS} dataSource={dadosArquivos}/>
    )
}

export default ListaArquivos