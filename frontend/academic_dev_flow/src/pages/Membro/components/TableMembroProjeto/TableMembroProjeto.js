import React, { useEffect } from "react";
import {Table, Space, Tooltip} from 'antd'
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { listarMembroProjeto } from "../../../../services/membroProjetoService";
import { useMembroContexto } from "../../context/MembroContexto";
import { handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";
import RenderEmpty from "../../../../components/Empty/Empty";

const TableMembroProjeto = ({onEdit, onDelete}) => {

    const COLUNAS_TABELA_MEMBRO_PROJETO = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Nome',
            dataIndex: 'nome_membro',
            key: 'nome_membro',
        },
        {
            title: 'Projeto',
            dataIndex: 'nome_projeto',
            key: 'nome_projeto'
        },
        // {
        //     title: 'Ações',
        //     dataIndex: 'action',
        //     key: 'action',
        //     render: (_, record) => (
        //         <Space size="middle">
        //             <Tooltip title="Editar">
        //                 <a onClick={() => onEdit(record)}><IoMdCreate /></a>
        //             </Tooltip>
        //             <Tooltip title="Excluir">
        //                 <a onClick={() => onDelete(record.id)}><IoMdTrash /></a>
        //             </Tooltip>
        //         </Space>
        //     )
        // }
    ]

    const {objsMembroProjeto, setObjsMembroProjeto, setObjsMembroProjetoSelecionados} = useMembroContexto()

    useEffect(() => {
        const fetchData = async () => {
            if (objsMembroProjeto.length === 0){
                await handleListarMembroProjeto()
            }
        }

        fetchData()
    }, [])

    const handleListarMembroProjeto = async () => {
        try {
            const response = await listarMembroProjeto();
    
            if (!response.error) { 
                setObjsMembroProjeto(response.data)
            } 
        } catch (error) {
            setObjsMembroProjeto([])
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
        }
    }

    const rowSelection = {
        onChange: (selectedRowsKeys, selectedRows) => {
            setObjsMembroProjetoSelecionados(selectedRows)
        },
    };

    return (
        <React.Fragment>
            { objsMembroProjeto.length !== 0 ? (
                <Table
                    rowKey="id"
                    dataSource={objsMembroProjeto}
                    columns={COLUNAS_TABELA_MEMBRO_PROJETO}
                    rowSelection={rowSelection}
                />
            ) : (
                <RenderEmpty title="Nenhum dado para exibir " />
            )}
        </React.Fragment>
    )
}

export default TableMembroProjeto