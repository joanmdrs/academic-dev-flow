import React, { useEffect, useState } from "react";
import FormPontuacao from "./FormPontuacao/FormPontuacao";
import { useProjetoContext } from "../../context/ProjetoContext";
import { atualizarDocumento, buscarDocumentoPeloId } from "../../services/documentoService";
import ExibirPontuacao from "./ExibirPontuacao/ExibirPontuacao";
import { buscarPontuacaoPeloId, registrarPontuacao } from "../../services/pontuacaoService";
import Loading from "../../components/Loading/Loading";

const GerenciarPontuacao = () => {

    const {dadosDocumento, setDadosPontuacao, autor} = useProjetoContext()
    const [hasScore, setHasScore] = useState(false)
    const [actionForm, setActionForm] = useState('create')
    const [loading, setLoading] = useState(true)

    const handleHasScore = async () => {
        const response = await buscarDocumentoPeloId(dadosDocumento.id)
        const idScore = response.data.pontuacao

        console.log(idScore)
        if (idScore !== null && idScore !== undefined) { 

            const response1 = await buscarPontuacaoPeloId(idScore)
            console.log(response1.data)
            setDadosPontuacao(response1.data)
            setHasScore(true)
        }
    }

    useEffect (() => {
        const fetchData = async () => {
            if (dadosDocumento){
                await handleHasScore()
                setLoading(false)
            }
        }
        fetchData()
    }, [dadosDocumento])

    if (loading) {
        return <Loading />
    }

    const handleCreateScore = async (dados) => {
        const response = await registrarPontuacao(dados)
        return response
    }

    const handleSavePontuacao = async (dados) => {
        dados['autor'] = autor 
        if (actionForm === 'create'){
            const response = await handleCreateScore(dados)
            const newData = { pontuacao: response.data.id }
            await atualizarDocumento(dadosDocumento.id, newData)
        } 

        await handleHasScore()
    }

    return (
        <div>

            {   hasScore ? (
                    <ExibirPontuacao />

                ) : (
                    <FormPontuacao onSubmit={handleSavePontuacao}/>

                )
            }
            
        </div>
    )

}

export default GerenciarPontuacao