import React, { useEffect, useState } from "react"
import {Table, Space} from 'antd'
import { listarTipos } from "../../../../services/tipoService"
import Loading from "../../../../components/Loading/Loading"


const ListaTipos = () => {

    const COLUNAS_TABELA = [
        {

            title: 'Nome', 
            dataIndex: 'nome',
            key: 'nome',
            render: (_, record) => (
                <a style={{
                    padding: "5px 10px",
                    borderRadius: '10px',
                    backgroundColor: `${record.cor}`,
                    color: '#FFFFFF'
                }}> {record.nome} </a>
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
                    <a>Editar</a>
                    <a>Excluir</a>
                </Space>
            ),
            },

    ]

    const [tipos, setTipos ] = useState([])
    const [loading, setLoading] = useState(true)


    const handleListarTipos = async () => {
        const response = await listarTipos()
        setTipos(response.data)
    }

    useEffect(() => {
        const fetchData = async () => {
            await handleListarTipos()
            setLoading(false)
        }

        fetchData()
    }, [])

    if (loading) {
        return <Loading />
    }


    return (
        <Table
            columns={COLUNAS_TABELA}
            dataSource={tipos}  
        />
    )
}

export default ListaTipos