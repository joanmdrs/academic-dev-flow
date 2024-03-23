import React, { useEffect, useState } from "react";
import FormPontuacao from "./FormPontuacao/FormPontuacao";
import { useProjetoContext } from "../../context/ProjetoContext";
import { atualizarDocumento, buscarDocumentoPeloId } from "../../services/documentoService";
import ExibirPontuacao from "./ExibirPontuacao/ExibirPontuacao";
import { buscarPontuacaoPeloId, registrarPontuacao } from "../../services/pontuacaoService";

const GerenciarPontuacao = () => {

    const {dadosDocumento, setDadosPontuacao, autor} = useProjetoContext()
    const [hasScore, setHasScore] = useState(false)
    const [actionForm, setActionForm] = useState('create')

    useEffect (() => {
        const fetchData = async () => {
            if (dadosDocumento){
                await handleHasScore(dadosDocumento.id)
            }
        }

        fetchData()
    }, [])

    const handleHasScore = async (id) => {
        const response = await buscarDocumentoPeloId(id)
        const idScore = response.data.pontuacao

        if (idScore !== null && idScore !== undefined) { 

            setHasScore(true)
            const response1 = await buscarPontuacaoPeloId(idScore)
            setDadosPontuacao(response1.data)
        }
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