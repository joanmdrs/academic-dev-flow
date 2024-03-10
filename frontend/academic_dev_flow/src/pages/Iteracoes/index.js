import React, { useEffect, useState } from "react";
import Cronograma from "./Cronograma/Cronograma";
import FormIteracao from "./FormIteracao/FormIteracao";
import { Button } from "antd";
import { IoAdd, IoClose } from "react-icons/io5";
import { useProjetoContext } from "../../context/ProjetoContext";
import { listarIteracoesPorProjeto } from "../../services/iteracaoService";
import Loading from "../../components/Loading/Loading";

const CronogramaIteracoes = () => {

    const [mostrarIteracoes, setMostrarIteracoes] = useState(true)
    const {dadosProjeto, setDadosIteracao} = useProjetoContext()
    const [iteracoes, setIteracoes] = useState(null)
    const [tarefas, setTarefas] = useState([])
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

        // const promises = (response.data).map(async (iteracao) => {
        //     const response1 = await listarTarefasPorIteracao(iteracao.id)
        
        //     if (response1.data.length > 0) {
        //         return {
        //             idIteracao: iteracao.id,
        //             tarefas: response1.data
        //         };
        //     }
        
        //     return null; // Se não houver tarefas, retorne null
        // });
        
        // const resultados = await Promise.all(promises);
        // const tarefasComTarefas = resultados.filter((item) => item !== null);
        
        // setTarefas(tarefasComTarefas);
    }

    if (loading) {
        return <Loading />
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
                    <Cronograma exibirForm={handleExibirForm} iteracoes={iteracoes} />
                ) :
                    <FormIteracao onReload={handleReload} />
            }
        </React.Fragment>
    )
}

export default CronogramaIteracoes