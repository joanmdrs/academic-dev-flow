import { getDataHoraNow, handleError } from "../../../services/utils";
import "./DashboardDiscente.css"
import React, { useEffect, useState } from "react";
import { atualizarStatusTarefa, listarTarefasDosProjetosDoMembro } from "../../../services/tarefaService";
import { useContextoGlobalUser } from "../../../context/ContextoGlobalUser/ContextoGlobalUser";
import { listarArtefatosDosProjetosDoMembro } from "../../../services/artefatoService";
import { buscarProjetosDoMembro } from "../../../services/membroProjetoService";
import { Splitter } from 'antd';
import MinhasTarefas from "../components/MinhasTarefas/MinhasTarefas";
import MeusArtefatos from "../components/MeusArtefatos/MeusArtefatos";
import MeusProjetos from "../components/Meus Projetos/MeusProjetos";

const DashboardDiscente = () => {

    const {usuario} = useContextoGlobalUser()
    const [tarefas, setTarefas] = useState([])
    const [artefatos, setArtefatos] = useState([])
    const [projetos, setProjetos] = useState([])

    const handleGetTarefasDoMembro = async () => {
        const response = await listarTarefasDosProjetosDoMembro(usuario.id)

        if (!response.error){
            setTarefas(response.data)
        } 
    }

    const handleGetArtefatosDoMembro = async () => {
        const response = await listarArtefatosDosProjetosDoMembro(usuario.id)

        if (!response.error){
            setArtefatos(response.data)
        }
    }

    const handleGetProjetosDoMembro = async () => {
        const response = await buscarProjetosDoMembro(usuario.id)
        if (!response.error){
            setProjetos(response.data)
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
        <div className="bloco-principal">
            <Splitter            >
                <Splitter.Panel defaultSize="55%" min="20%" max="70%">
                    
                        <div className="caixa-direita"> 
                            <div>
                                <h2> Hoje </h2>
                                <span> {getDataHoraNow()} </span>
                            </div>

                            <MinhasTarefas tarefas={tarefas} atualizarStatus={handleAlterarSituacaoTarefa} /> 
                            <MeusArtefatos artefatos={artefatos} />
                            
                        </div>
                </Splitter.Panel>

                <Splitter.Panel>
                    <div className="caixa-esquerda"> 
                        <MeusProjetos projetos={projetos} />
                    </div>
                </Splitter.Panel>
            </Splitter>
            
            
        </div>
    )
}

export default DashboardDiscente