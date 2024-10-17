import { Empty, Table } from "antd";
import React, { useEffect, useState } from "react";
import { handleError } from "../../../../services/utils";
import { useContextoProjeto } from "../../context/ContextoProjeto";
import { buscarMembrosPorProjeto } from "../../../../services/membroProjetoService";

const TableEquipe = () => {

    const COLLUMS_TABLE_EQUIPE = [
        {
            title: "ID",
            key: "id",
            dataIndex: "id",
        },
        {
            title: "Nome",
            key: 'nome_membro',
            dataIndex: 'nome_membro'
        },
        {
            title: 'Grupo',
            key: 'nome_grupo',
            dataIndex: 'nome_grupo'
        }
    ]

    const {hasProjeto, hasMembros, setHasMembros, setMembrosSelecionados} = useContextoProjeto()

    useEffect(() => {
        const fetchData = async () => {
            if (hasProjeto !== null){
                await handleGetMembros()
            }
        }

        fetchData()
    }, [hasProjeto])

    const handleGetMembros = async () => {
        try {
            const response = await buscarMembrosPorProjeto(hasProjeto.id)
            if (!response.error){
                setHasMembros(response.data)
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
            {hasMembros.length === 0 ? 
                    <Empty description="Nenhum membro vinculado ao projeto" image={Empty.PRESENTED_IMAGE_SIMPLE}/> :
                    <div style={{border: '1px solid #ddd', padding: '10px', borderRadius: '10px'}}>
                        <Table 
                            columns={COLLUMS_TABLE_EQUIPE}
                            dataSource={hasMembros}
                            rowKey="id"
                            rowSelection={rowSelection}
                        />
                    </div>
                    
            }
        </React.Fragment>
    )


}

export default TableEquipe