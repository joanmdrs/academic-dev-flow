import { getDataHoraNow, handleError } from "../../../services/utils";
import "./HomeAdmin.css"
import React, { useEffect, useState } from "react";
import { atualizarStatusTarefa, listarTarefas } from "../../../services/tarefaService";
import { useContextoGlobalUser } from "../../../context/ContextoGlobalUser/ContextoGlobalUser";
import { listarArtefatos } from "../../../services/artefatoService";
import { Empty, Splitter } from 'antd';
import MinhasTarefas from "../components/MinhasTarefas/MinhasTarefas";
import MeusArtefatos from "../components/MeusArtefatos/MeusArtefatos";
import MeusProjetos from "../components/Meus Projetos/MeusProjetos";
import { listarProjetos } from "../../../services/projetoService";

const HomeAdmin = () => {

    const {usuario} = useContextoGlobalUser()
    const [tarefas, setTarefas] = useState([])
    const [artefatos, setArtefatos] = useState([])
    const [projetos, setProjetos] = useState([])

    const handleListarTarefas = async () => {
        const response = await listarTarefas()

        if (!response.error){
            setTarefas(response.data)
        } 
    }

    const handleListarArtefatos = async () => {
        const response = await listarArtefatos()

        if (!response.error){
            setArtefatos(response.data)
        }
    }

    const handleListarProjetos = async () => {
        const response = await listarProjetos()
        if (!response.error){
            setProjetos(response.data)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await handleListarProjetos()
            await handleListarArtefatos()
            await handleListarTarefas()
        }
        fetchData()

    }, [usuario])

    const handleAlterarSituacaoTarefa = async (id, status) => {
        try {
            const formData = {
                status: status
            }
            const response = await atualizarStatusTarefa(id, formData)
            if (!response.error){
                await handleListarTarefas()
            }

        } catch (error) {
            return handleError(error, 'Falha ao atualizar o status da tarefa !')
        }
    }

    return (
        <div>
            <Splitter            >
                <Splitter.Panel defaultSize="55%" min="20%" max="70%">
                        <div className="caixa-direita"> 
                            <div>
                                <h2 className="ff-pop"> Hoje </h2>
                                <span className="ff-pop"> {getDataHoraNow()} </span>
                            </div>

                            { tarefas.length !== 0 ? (
                                <MinhasTarefas tarefas={tarefas} atualizarStatus={handleAlterarSituacaoTarefa} />

                            ) : (
                                <Empty
                                    className="box-model"
                                    description="Nenhuma tarefa para exibir"
                                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                    style={{
                                        display: 'flex',
                                        width: "100%",
                                        height: "100%",
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                />
                            )}

                            {artefatos.length !== 0 ? (
                                <MeusArtefatos artefatos={artefatos} />
                            ) : (
                                <Empty
                                    className="box-model"
                                    description="Nenhum artefato para exibir"
                                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                    style={{
                                        display: 'flex',
                                        width: "100%",
                                        height: "100%",
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                />
                                
                            )}


                            
                        </div>
                </Splitter.Panel>

                <Splitter.Panel>
                    <div className="caixa-esquerda"> 

                        { projetos.length !== 0 ? (
                            <MeusProjetos projetos={projetos} />
                        ) : (
                            <Empty
                                className="box-model"
                                description="Nenhum projeto para exibir"
                                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                style={{
                                    display: 'flex',
                                    width: "100%",
                                    height: "100%",
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            />
                        )}
                        
                    </div>
                </Splitter.Panel>
            </Splitter>
            
            
        </div>
    )
}

export default HomeAdmin