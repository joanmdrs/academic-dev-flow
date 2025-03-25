import { Avatar, Empty, Table, Tooltip } from "antd";
import React, { useEffect } from "react";
import { handleError } from "../../../../services/utils";
import { useContextoProjeto } from "../../context/ContextoProjeto";
import { buscarMembrosPorProjeto } from "../../../../services/membroProjetoService";
import { IoMdTrash } from "react-icons/io";

const TableEquipe = ({onDelete}) => {

    const COLLUMS_TABLE_EQUIPE = [
        {
            title: "Nome",
            key: 'nome_membro',
            dataIndex: 'nome_membro'
        },
        {
            title: 'Grupo',
            key: 'nome_grupo',
            dataIndex: 'nome_grupo'
        }, 
        {
            title: 'Ações', 
            key: 'actions',
            dataIndex: 'actions',
            render: (_, record) => (
                <Tooltip title="Excluir">
                    <a onClick={() => onDelete(record.id)}> <IoMdTrash/> </a>
                </Tooltip>
            )
        }
    ]

    const {dadosProjeto, membros, setMembros, setMembrosSelecionados} = useContextoProjeto()

    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto !== null){
                await handleGetMembros()
            }
        }

        fetchData()
    }, [dadosProjeto])

    const handleGetMembros = async () => {
        try {
            const response = await buscarMembrosPorProjeto(dadosProjeto.id)
            if (!response.error){
                setMembros(response.data)
            }
        } catch (error) {
            return handleError(error, 'Falha ao buscar os membros do projeto')
        }
    }

    const rowSelection = {
        onChange: (selectedRowsKeys, selectedRows) => {
            setMembrosSelecionados(selectedRows)
        },
    };

    return (
        <React.Fragment>
            {membros.length === 0 ? 
                <Empty description="Nenhum membro vinculado ao projeto" image={Empty.PRESENTED_IMAGE_SIMPLE}/> :
                    <Table 
                        columns={COLLUMS_TABLE_EQUIPE}
                        dataSource={membros}
                        rowKey="id"
                        rowSelection={rowSelection}
                    />
            }
        </React.Fragment>
    )


}

export default TableEquipe