import { Form, Result, Select, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import QuadroTarefas from "../QuadroTarefas/QuadroTarefas";
import { buscarProjetosDoMembro } from "../../../../services/membroProjetoService";
import { useContextoTarefa } from "../../context/ContextoTarefa";
import Loading from "../../../../components/Loading/Loading";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";

const MinhasTarefas = () => {

    const {autor, dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()
    const {handleGetTarefas} = useContextoTarefa()
    const [optionsProjetos, setOptionsProjetos] = useState([])
    const [selectProjeto, setSelectProjeto] = useState('Projeto')
    const [loading, setLoading] = useState(false)

    const handleGetProjetos = async () => {
        const resMembroProjeto = await buscarProjetosDoMembro(autor.id_user);
 
        if (!resMembroProjeto.error){
            const dados = await Promise.all(resMembroProjeto.data.map(async (membroProjeto) => {

                const resProjeto = await buscarProjetoPeloId(membroProjeto.id)
    
                if (!resProjeto.error) {
                    return {
                        value: resProjeto.data.id,
                        label: resProjeto.data.nome
                    }
                }      
            }))
            setOptionsProjetos(dados)
        }
    
    }

    const handleSelectProjeto = async (value) => {
        setLoading(true)
        setSelectProjeto(value)

        if (value !== undefined) {
            const response = await buscarProjetoPeloId(value)
            if (!response.error){
                setDadosProjeto(response.data)
                await handleGetTarefas(response.data.id)

            }
        } else {
            setDadosProjeto(null)
        }
        setLoading(false)
    }

    


    useEffect(() => {
        const fetchData = async () => {

            if (autor && autor.id_user){
                await handleGetProjetos()
            }
        }

        fetchData()
    }, [autor])

    return (
        <div>
            { dadosProjeto === null ? (
                <Result 
                    style={{margin: '0 auto'}}
                    status="info"
                    title="Tarefas"
                    subTitle="Selecione o projeto para poder exibir as tarefas."
                    extra={
                            <Select style={{width: '20%'}} allowClear onChange={handleSelectProjeto} defaultValue="Projeto" options={optionsProjetos} />
                      }
                /> ) : (
                    <div>

                        <div style={{margin: '20px'}}>
                            <h2> Minhas Tarefas </h2>  
                        </div>

                        <div style={{margin: '20px'}}>

                            <div style={{display: 'flex', gap: '10px',justifyContent: 'flex-end'}}> 
                                <Form.Item>
                                    <Select
                                        allowClear
                                        onChange={handleSelectProjeto}
                                        value={selectProjeto}
                                        options={optionsProjetos}
                                    />

                                </Form.Item>
                            </div>
                        </div>

                        { loading ? 
                            <Loading />
                            : 
                            <div style={{margin: '20px'}}> 
                                <QuadroTarefas />
                            </div>
                        }

                    </div>
                )}
        </div>

            
    )
}

export default MinhasTarefas