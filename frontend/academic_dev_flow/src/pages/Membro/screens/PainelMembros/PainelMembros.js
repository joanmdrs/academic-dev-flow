import React, { useState } from "react";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { Table } from "antd";
import { listarMembrosPeloIdProjeto } from "../../../../services/membroProjetoService";

const PainelMembros = () => {

    const COLUNAS_TABELA_MEMBROS = [
        {
            title: 'Nome',
            dataIndex: 'nome_membro',
            key: 'nome_membro'
        },
        {

        }
    ]

    const {dadosProjeto} = useContextoGlobalProjeto()
    const [membros, setMembros] = useState([])

    const handleListarMembrosPorProjeto = async () => {
        const response = await listarMembrosPeloIdProjeto(dadosProjeto.id);

        if (!response.error && response.data) {
            setMembros(response.data)
        }
    };



    return (
        <React.Fragment>

            <Table 
                dataSource={membros}
            />
        </React.Fragment>
    )

}

export default PainelMembros