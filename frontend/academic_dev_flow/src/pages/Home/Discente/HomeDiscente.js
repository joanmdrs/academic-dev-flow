import { getDataHoraNow, handleError } from "../../../services/utils";
import "./HomeDiscente.css"
import React, { useEffect, useState } from "react";
import { atualizarStatusTarefa, listarTarefasDosProjetosDoMembro } from "../../../services/tarefaService";
import { useContextoGlobalUser } from "../../../context/ContextoGlobalUser/ContextoGlobalUser";
import { listarArtefatosDosProjetosDoMembro } from "../../../services/artefatoService";
import { buscarProjetosDoMembro } from "../../../services/membroProjetoService";
import { Empty, Splitter } from 'antd';
import MinhasTarefas from "../components/MinhasTarefas/MinhasTarefas";
import MeusArtefatos from "../components/MeusArtefatos/MeusArtefatos";
import MeusProjetos from "../components/Meus Projetos/MeusProjetos";
import MinhasEquipes from "../components/MinhasEquipes/MinhasEquipes";
import RenderEmpty from "../../../components/Empty/Empty";

const HomeDiscente = () => {

    const {usuario} = useContextoGlobalUser()
    const [tarefas, setTarefas] = useState([])
    const [artefatos, setArtefatos] = useState([])
    const [projetos, setProjetos] = useState([])

    const handleGetTarefasDoMembro = async () => {
        const response = await listarTarefasDosProjetosDoMembro(usuario.id)

        if (!response.error){
            setTarefas(response.data)
        } else {
            setTarefas([])
        }
    }

    const handleGetArtefatosDoMembro = async () => {
        const response = await listarArtefatosDosProjetosDoMembro(usuario.id)

        if (!response.error){
            setArtefatos(response.data)
        } else {
            setArtefatos([])
        }
    }

    const handleGetProjetosDoMembro = async () => {
        const response = await buscarProjetosDoMembro(usuario.id)
        if (!response.error){
            setProjetos(response.data)
        } else {
            setProjetos([])
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (usuario && usuario.id){
                await handleGetTarefasDoMembro()
                await handleGetArtefatosDoMembro()
                await handleGetProjetosDoMembro()
            }
        }
        fetchData()
        console.log(tarefas)
        console.log(artefatos)
        console.log(projetos)

    }, [usuario])

    const handleAlterarSituacaoTarefa = async (id, status) => {
        try {
            const formData = {
                status: status
            }
            const response = await atualizarStatusTarefa(id, formData)
            if (!response.error){
                await handleGetTarefasDoMembro()
            }

        } catch (error) {
            return handleError(error, 'Falha ao atualizar o status da tarefa !')
        }
    }

    return (
            <div>
                <Splitter>
                    <Splitter.Panel defaultSize="55%" min="20%" max="70%">
                            <div className="caixa-direita"> 
                                <div>
                                    <h2 className="ff-pop"> Hoje </h2>
                                    <span className="ff-pop"> {getDataHoraNow()} </span>
                                </div>
    
                                {tarefas && tarefas.length !== 0 ? (
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
    
                                {artefatos && artefatos.length !== 0 ? (
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
    
                            {projetos && projetos.length !== 0 ? (
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

export default HomeDiscente