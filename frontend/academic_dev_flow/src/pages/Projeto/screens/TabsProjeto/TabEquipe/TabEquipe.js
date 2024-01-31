import React, { useState } from "react";
import "./TabEquipe.css"
import ListaDados from "../../../../../components/Listas/ListaDados/ListaDados";
import BotaoAdicionar from "../../../../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoExcluir from "../../../../../components/Botoes/BotaoExcluir/BotaoExcluir";
import { Col, Input, Table } from "antd";
import ModalSelecionarMembros from "../../../components/ModalSelecionarMembros/ModalSelecionarMembros";
import { buscarMembroPeloNome } from "../../../../../services/membro_service";
import { NotificationManager } from "react-notifications";

const TabEquipe = () => {

    const [isBotaoAdicionarVisivel, setIsBotaoAdicionarVisivel] = useState(false)
    const [isBotaoExcluirVisivel, setIsBotaoExcluirVisivel] = useState(true)
    const [isModalVisivel, setIsModalVisivel] = useState(false)

    const COLUNAS_LISTA = [ 
        {
            title: "ID",
            key: "id",
            dataIndex: "id",
        },
        {
            title: "Nome",
            dataIndex: "nome",
            key: "nome",
        },
        {
            title: "CPF",
            dataIndex: "cpf",
            key: "cpf",
        },
    ];

    const handleExibirModal = () => setIsModalVisivel(true)
    const handleFecharModal = () => setIsModalVisivel(false)

    const handleBuscarMembro = async (parametro) => {
        try {
            const resposta = await buscarMembroPeloNome(parametro);
            if(resposta.status !== 200){
                NotificationManager.error("Ocorreu um problema ao buscar os dados, contate o suporte!")
            } else {
            return resposta
            }
        } catch (error) {
            NotificationManager.error("Ocorreu um problema ao buscar os dados, contate o suporte!")
        } 
    }

    const handleVincularMembroAoProjeto = () => {

    }
    return (

        <div className="box"> 

            {isModalVisivel && 
                < ModalSelecionarMembros 
                    onCancel={handleFecharModal}
                    colunas={COLUNAS_LISTA}
                    status={isModalVisivel}
                    onOk={handleBuscarMembro}

                />
            }

            <div> 
                <div className="box" style={{cursor: "pointer"}}> 
                    <h4> VINCULAR ALUNO(S) </h4>
                </div>
                
                <div> 
                    <div className="group-buttons" style={{width: "100%", display: "flex", justifyContent: "flex-end"}}> 
                        <BotaoAdicionar status={isBotaoAdicionarVisivel} funcao={handleExibirModal}/>
                        <BotaoExcluir status={isBotaoExcluirVisivel}/>
                    </div>

                    <Table
                        className="tab-equipe"
                        columns={COLUNAS_LISTA} 
                        rowSelection={{
                            type: "checkbox"
                        }}
                    />
                </div>
            </div>


            <div> 
                <div className="box"> 
                    <h4> VINCULAR PROFESSOR(ES)</h4>
                </div>

                <div> 
                    <div className="group-buttons" style={{width: "100%", display: "flex", justifyContent: "flex-end"}}> 
                        <BotaoAdicionar />
                        <BotaoExcluir />
                    </div>

                    <ListaDados 
                        colunas={COLUNAS_LISTA}
                    />
                </div>

            </div>
        </div>
    )
}

export default TabEquipe;