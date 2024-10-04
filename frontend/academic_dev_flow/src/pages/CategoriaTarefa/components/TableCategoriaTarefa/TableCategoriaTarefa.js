import React, { useEffect, useState } from "react"
import {Table, Space, Tooltip} from 'antd'
import Loading from "../../../../components/Loading/Loading"
import { useContextoCategoriaTarefa } from "../../context/ContextoCategoriaTarefa"
import { IoMdCreate, IoMdTrash } from "react-icons/io"
import { listarCategoriaTarefa } from "../../../../services/categoriaTarefaService"

const TableCategoriaTarefa = ({onEdit, onDelete}) => {

    const COLUNAS_TABELA = [
        {

            title: 'Nome', 
            dataIndex: 'nome',
            key: 'nome',
            render: (_, record) => (
                <a
                 style={{
                    padding: "5px 10px",
                    borderRadius: '10px',
                    backgroundColor: `${record.cor}`,
                    color: '#FFFFFF'
                }}
        
                > {record.nome} </a>
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
                    <Tooltip title="Editar">
                        <a onClick={() => onEdit(record)}><IoMdCreate /></a>
                    </Tooltip>
                    <Tooltip title="Excluir">
                        <a onClick={() => onDelete(record.id)}><IoMdTrash /></a>
                    </Tooltip>
                </Space>
            ),
            },

    ]

    const {categorias, setCategorias } = useContextoCategoriaTarefa()
    const [loading, setLoading] = useState(true)


    const handleListarCategorias = async () => {
        const response = await listarCategoriaTarefa()
        setCategorias(response.data)
    }

    useEffect(() => {
        const fetchData = async () => {

            if (categorias.length === 0) {
                await handleListarCategorias()
            }
            setLoading(false)
            
        }

        fetchData()

    }, [categorias])

    if (loading) {
        return <Loading />
    }


    return (
        <Table
            columns={COLUNAS_TABELA}
            dataSource={categorias}  
        />
    )
}

export default TableCategoriaTarefa