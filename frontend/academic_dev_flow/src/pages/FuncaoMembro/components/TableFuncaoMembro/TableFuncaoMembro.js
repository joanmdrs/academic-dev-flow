import React, { useEffect } from "react"
import {Table, Space, Tooltip, Switch} from 'antd'
import { IoIosCheckmark, IoIosClose } from "react-icons/io"
import { listarFuncaoMembro } from "../../../../services/funcaoMembroProjetoService"
import { useFuncaoMembroContexto } from "../../context/FuncaoMembroContexto"
import { handleError } from "../../../../services/utils"
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages"
import RenderEmpty from "../../../../components/Empty/Empty"


const TableFuncaoMembro = ({onDisable, onDelete}) => {

    const COLUNAS_TABELA = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Função', 
            dataIndex: 'nome_categoria_funcao',
            key: 'nome_categoria_funcao',
        },
        {
            title: 'Membro',
            dataIndex: 'nome_membro',
            key: 'nome_membro'
        },
        {
            title: 'Projeto',
            dataIndex: 'nome_projeto',
            key: 'nome_projeto',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => (
                <Space>
                    { record.status ? 
                        <span> <Tooltip title="Ativo"><IoIosCheckmark color="green" size="25px"/> </Tooltip></span>
                        : <span> <Tooltip title="Inativo"><IoIosClose color="red"  size="25px" /> </Tooltip></span>
                    }
                </Space>
            )
        },

        {
            title: 'Ações',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Switch
                        checked={record.status}
                        checkedChildren="Desativar"
                        unCheckedChildren="Ativar"
                        onChange={() => onDisable(record.id, !record.status)}
                        
                    />
                </Space>
            ),
        },
    ]

    const handleListarFuncaoMembro = async () => {
        try {
            const response = await listarFuncaoMembro()

            if (!response.error){
                setItemsFuncaoMembro(response.data)
            }
        } catch (error) {
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
        }
    }

    const {itemsFuncaoMembro, setItemsFuncaoMembro} = useFuncaoMembroContexto()

    useEffect(() => {
        const fetchData = async () => {
            if (itemsFuncaoMembro.length === 0){
                await handleListarFuncaoMembro()
            }
        }

        fetchData()
    }, [])


    return (
        <React.Fragment>
            { itemsFuncaoMembro.length !== 0 ? (
                <Table
                    columns={COLUNAS_TABELA}
                    dataSource={itemsFuncaoMembro}  
                    rowKey="id"
                />
            ) : (
                <RenderEmpty title="Nenhum dado para exibir" />
            )}
        </React.Fragment>

    )
}

export default TableFuncaoMembro