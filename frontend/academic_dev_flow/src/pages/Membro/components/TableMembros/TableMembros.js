import { Empty, Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { listarGrupos } from "../../../../services/membroService";
import { useMembroContexto } from "../../context/MembroContexto";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";

const TableMembros = ({onUpdate, onDelete}) => {

    const {membros, setMembrosSelecionados} = useMembroContexto()
    const [optionsGrupos, setOptionsGrupos] = useState([])
    
    const handleListarGrupos = async () => {

        try {
            const response = await listarGrupos()

            if (!response.error){
                const promises = await response.data.map( async (item) => {
                    return {
                        value: item.id,
                        label: item.name
                    }
                })

                const results = (await Promise.all(promises))
                setOptionsGrupos(results)
            }
            
        } catch (error) {
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            await handleListarGrupos()
        }
        fetchData()
    }, [])

    const columns = [
        
        {
            title: 'ID',
            key: 'id',
            dataIndex: 'id' 
        },
        {
            title: 'Nome',
            key: 'nome',
            dataIndex: 'nome',
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email'
        },
        {
            title: 'Telefone',
            key: 'telefone',
            dataIndex: 'telefone'
        },
        {
            title: 'Grupo',
            key: 'nome_grupo',
            dataIndex: 'nome_grupo',
            filters: optionsGrupos.map(option => ({
                text: option.label,
                value: option.value
            })),
            onFilter: (value, record) => record.grupo === value, 
        },
        {
            title: 'Ações',
            key: 'action',
            dataIndex: 'render',
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
            setMembrosSelecionados(selectedRows)
        },
    };

    return (
        <React.Fragment>
            {membros.length === 0 ? 
                <Empty description="Nenhum membro cadastrado" image={Empty.PRESENTED_IMAGE_SIMPLE}/> :
                <Table 
                    columns={columns}
                    dataSource={membros}
                    rowKey="id"
                    rowSelection={rowSelection}
                />
            }
        </React.Fragment>
    )
}

export default TableMembros