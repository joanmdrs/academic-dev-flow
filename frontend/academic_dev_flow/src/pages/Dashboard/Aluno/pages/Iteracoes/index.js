import React, { useEffect, useState } from "react";
import Cronograma from "./Cronograma/Cronograma";
import FormIteracao from "./FormIteracao/FormIteracao";
import { useFormContext } from "../../context/Provider/Provider";
import { listarIteracoesPorProjeto } from "../../../../../services/iteracaoService";
import { Button } from "antd";
import { IoAdd, IoClose } from "react-icons/io5";

const CronogramaIteracoes = () => {

    const [mostrarIteracoes, setMostrarIteracoes] = useState(true)
    const {dadosProjeto, setDadosIteracao} = useFormContext()
    const [iteracoes, setIteracoes] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto !== null) {
                await handleGetIteracoes()
            }
        }
        fetchData()
    }, [dadosProjeto])

    const handleGetIteracoes = async () => {
        const response = await listarIteracoesPorProjeto(dadosProjeto.id)
        const iteracoesOrdenadas = response.data.sort((a, b) => a.numero - b.numero);
        setIteracoes(iteracoesOrdenadas)
    }

    const handleCancel = () => {
        setMostrarIteracoes(true)
        setDadosIteracao(null)
    }

    const handleExibirForm = () => {
        setMostrarIteracoes(false)
    }

    const handleReload = async () => {
        handleCancel()
        await handleGetIteracoes()
    }

    return (
        <React.Fragment>
            <div style={{display: "flex", justifyContent: "flex-end"}}>
                { 
                    mostrarIteracoes ? (<Button onClick={handleExibirForm} icon={<IoAdd/>}> Adicionar Iteração </Button>)
                    : (<Button onClick={handleCancel} icon={<IoClose/>}> Cancelar </Button>)
                }
                
            </div> 

            { 
                mostrarIteracoes ? (
                    <Cronograma exibirForm={handleExibirForm}  dados={iteracoes} />
                ) :
                    <FormIteracao onReload={handleReload} />
            }
        </React.Fragment>
    )
}

export default CronogramaIteracoes