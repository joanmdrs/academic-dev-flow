import React, { useEffect, useState } from "react"
import {Table, Space, Tooltip} from 'antd'
import Loading from "../../../../components/Loading/Loading"
import { IoMdCreate, IoMdTrash } from "react-icons/io"
import { useFuncaoMembroContexto } from "../../context/FuncaoMembroContexto"
import { listarCategoriaFuncaoMembro } from "../../../../services/funcaoMembroProjetoService"


const TableCategoriaFuncaoMembro = ({onEdit, onDelete}) => {

    const COLUNAS_TABELA = [
        {

            title: 'Nome', 
            dataIndex: 'nome',
            key: 'nome',
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

    const {itemsCategoriaFuncaoMembro, setItemsCategoriaFuncaoMembro } = useFuncaoMembroContexto()
    const [loading, setLoading] = useState(true)


    const handleListarCategorias = async () => {
        const response = await listarCategoriaFuncaoMembro()
        setItemsCategoriaFuncaoMembro(response.data)
    }

    useEffect(() => {
        const fetchData = async () => {

            if (itemsCategoriaFuncaoMembro.length === 0) {
                await handleListarCategorias()
            }
            setLoading(false)
            
        }

        fetchData()

    }, [itemsCategoriaFuncaoMembro])

    if (loading) {
        return <Loading />
    }


    return (
        <Table
            columns={COLUNAS_TABELA}
            dataSource={itemsCategoriaFuncaoMembro}  
        />
    )
}

export default TableCategoriaFuncaoMembro