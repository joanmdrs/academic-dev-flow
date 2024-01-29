import React from "react";
import BotaoVoltar from "../../../../components/Botoes/BotaoVoltar/BotaoVoltar";
import BotaoAdicionar from "../../../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoAtualizar from "../../../../components/Botoes/BotaoAtualizar/BotaoAtualizar";
import BotaoExcluir from "../../../../components/Botoes/BotaoExcluir/BotaoExcluir";
import ListaDados from "../../../../components/Listas/ListaDados/ListaDados";

const VisualizarEtapas = () => {

    const COLUNAS_TABELA = [
        {
            title: "ID",
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
        },
        {
            title: 'Situação',
            dataIndex: 'situacao',
            key: 'situacao'
        },
        {
            title: 'Data de início',
            dataIndex: 'data_inicio',
            key: 'data_inicio'
        },
        {
            title: 'Data de término', 
            dataIndex: 'data_termino', 
            key: 'data_termino'
        },
        {
            title: 'Descrição',
            dataIndex: 'descricao',
            key: 'descricao',
        },

    ];

    return (

        <div> 
            <div>
                <BotaoVoltar />
                <BotaoAdicionar />
                <BotaoAtualizar />
                <BotaoExcluir />
            </div>

            <div>

                <ListaDados  />
            </div>
        </div>
    )
}

export default VisualizarEtapas;