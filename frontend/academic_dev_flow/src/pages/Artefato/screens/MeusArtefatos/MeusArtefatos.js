import React, { useEffect, useState } from "react";
import PainelArtefatos from "../PainelArtefatos/PainelArtefatos";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { Form, Result, Select } from "antd";
import { buscarProjetosDoMembro } from "../../../../services/membroProjetoService";
import { buscarProjetoPeloId } from "../../../../services/projetoService";

const MeusArtefatos = () => {
    const {autor, dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()
    const [optionsProjetos, setOptionsProjetos] = useState([])
    const [selectProjeto, setSelectProjeto] = useState('Projeto')

    const handleGetProjetos = async () => {
        const resMembroProjeto = await buscarProjetosDoMembro(autor.id_user);

        const dados = await Promise.all(resMembroProjeto.data.map(async (membroProjeto) => {

            const resProjeto = await buscarProjetoPeloId(membroProjeto.projeto)

            if (!resProjeto.error) {
                return {
                    value: resProjeto.data.id,
                    label: resProjeto.data.nome
                }
            }      
        }))
        setOptionsProjetos(dados)
    }

    const handleSelectProjeto = async (value) => {
        setSelectProjeto(value)

        if (value !== undefined) {
            const response = await buscarProjetoPeloId(value)
            if (!response.error){
                setDadosProjeto(response.data)
            }
        } else {
            setDadosProjeto(null)
        }
    }

    useEffect(() => {
        const fetchData = async () => {

            if (autor && autor.id_user){
                await handleGetProjetos()
            }
        }

        fetchData()
    }, [autor, dadosProjeto])

    return (
        <React.Fragment>
             { dadosProjeto === null ? (
                <Result 
                    style={{margin: '0 auto'}}
                    status="info"
                    title="Artefatos"
                    subTitle="Selecione o projeto para poder exibir os seus artefatos."
                    extra={
                            <Select style={{width: '20%'}} allowClear onChange={handleSelectProjeto} defaultValue="Projeto" options={optionsProjetos} />
                      }
                /> ) : (
                    <div>

                        <div style={{margin: '20px'}}>
                            <h2> Meus Artefatos </h2>  
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

                        <div style={{margin: '20px'}}> 
                            <PainelArtefatos />
                        </div>

                    </div>
                )}
        </React.Fragment>
    )
}

export default MeusArtefatos