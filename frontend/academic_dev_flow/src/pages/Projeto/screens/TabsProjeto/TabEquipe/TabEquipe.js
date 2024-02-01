import React, { useState } from "react";
import "./TabEquipe.css"
import ListaDados from "../../../../../components/Listas/ListaDados/ListaDados";
import BotaoAdicionar from "../../../../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoExcluir from "../../../../../components/Botoes/BotaoExcluir/BotaoExcluir";
import { Col, Input, Table } from "antd";
import ModalSelecionarMembros from "../../../components/ModalSelecionarMembros/ModalSelecionarMembros";
import { buscarMembroPeloId, buscarMembroPeloNome } from "../../../../../services/membro_service";
import { NotificationManager } from "react-notifications";
import { criarMembroProjeto, listarMembrosPorProjeto } from "../../../../../services/membro_projeto_service";

const TabEquipe = () => {

    const [isBotaoAdicionarVisivel, setIsBotaoAdicionarVisivel] = useState(false)
    const [isBotaoExcluirVisivel, setIsBotaoExcluirVisivel] = useState(true)
    const [isModalVisivel, setIsModalVisivel] = useState(false)
    const [alunos, setAlunos] = useState([])
    const idProjeto = "2"

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
            title: "Função",
            dataIndex: "funcao",
            key: "funcao",
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

    const handleListarMembrosPorProjeto = async (parametro) => {
        try {
            const resposta = await listarMembrosPorProjeto(parametro)

            if(resposta.status === 200){
                const membrosVinculados = resposta.data 

                if (membrosVinculados.length === 0) {
                  setAlunos([])
        
                } else {
        
                  const promisesAlunos = membrosVinculados.map(async (membroProjeto) => {
                    const respostaMembro = await buscarMembroPeloId(membroProjeto.membro);
                    return {
                      id: membroProjeto.id,
                      projeto: idProjeto,
                      membro: respostaMembro.data.id,
                      nome: respostaMembro.data.nome,
                      funcao: membroProjeto.funcao,
                    };
                  });
          
                  const resultados = await Promise.all(promisesAlunos);
                  
                  setAlunos(resultados);
                }
            }
        } catch (error) {
            
        }
    }

    const handleSelecionarMembros = async (dados) => {

        try {
            const dadosEnviar = dados.map((item) => {
                return {
                    projeto: idProjeto,
                    membro: item.id
                };
            });
            const resposta = await criarMembroProjeto(dadosEnviar)

            if (resposta.status === 200){
                NotificationManager.success("Alunos vinculados ao projeto com sucesso !")
                await handleListarMembrosPorProjeto(idProjeto)
            } else {
                NotificationManager.error('Falha ao vincular os alunos ao projeto, contate o suporte!')
            }
        } catch (error) {
            console.log(error)
            NotificationManager.error("Ocorreu um problema durante a operação, contate o suporte!")
        }

    }   

    return (

        <div className="box"> 

            {isModalVisivel && 
                < ModalSelecionarMembros 
                    onCancel={handleFecharModal}
                    colunas={COLUNAS_LISTA}
                    status={isModalVisivel}
                    onOk={handleBuscarMembro}
                    onSelect={handleSelecionarMembros}
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
                        dataSource={alunos}
                        rowKey="id"
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