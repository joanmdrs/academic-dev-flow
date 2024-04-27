import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { IoAdd, IoClose } from "react-icons/io5";
import { useProjetoContext } from "../../context/ProjetoContext";
import { listarIteracoesPorProjeto } from "../../services/iteracaoService";
import Loading from "../../components/Loading/Loading";
import Cronograma from "./components/Cronograma/Cronograma";
import FormIteracao from "./components/FormIteracao/FormIteracao";

const CronogramaIteracoes = () => {

    const [mostrarIteracoes, setMostrarIteracoes] = useState(true)
    const {dadosProjeto, setDadosIteracao} = useProjetoContext()
    const [iteracoes, setIteracoes] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto !== null) {
                await handleGetIteracoes()
            }
            setLoading(false)
        }
        fetchData()
    }, [dadosProjeto, loading])


    const handleGetIteracoes = async () => {
        const response = await listarIteracoesPorProjeto(dadosProjeto.id)
        const iteracoesOrdenadas = response.data.sort((a, b) => a.numero - b.numero);
        setIteracoes(iteracoesOrdenadas)
    }

    if (loading) {
        return <Loading />
    }

    const handleCancel = () => {
        setMostrarIteracoes(true)
        setDadosIteracao(null)
    }

    const handleShowForm = () => {
        setMostrarIteracoes(false)
    }

    const handleReload = async () => {
        handleCancel()
        await handleGetIteracoes()
    }

    return (
        <React.Fragment>
            <div style={{display: "flex", justifyContent: "flex-end", marginBottom: "20px"}}>
                { 
                    mostrarIteracoes ? (
                        <Button type="primary" ghost onClick={handleShowForm} shape="round" icon={<IoAdd/>}> Adicionar Iteração </Button>
                    ) : (
                    <Button  type="primary" danger onClick={handleCancel} icon={<IoClose/>}> Cancelar </Button>
                    )
                }
                
            </div> 

            { 
                mostrarIteracoes ? (
                    <Cronograma onShow={handleShowForm} onReload={handleReload} iteracoes={iteracoes} />
                ) : (
                    <FormIteracao onReload={handleReload} />
                )
            }
        </React.Fragment>
    )
}

export default CronogramaIteracoes