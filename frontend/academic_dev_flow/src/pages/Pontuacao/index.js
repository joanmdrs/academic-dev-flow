import React, { useEffect, useState } from "react";
import FormPontuacao from "./FormPontuacao/FormPontuacao";
import { useProjetoContext } from "../../context/ProjetoContext";
import { buscarDocumentoPeloId } from "../../services/documentoService";
import ExibirPontuacao from "./ExibirPontuacao/ExibirPontuacao";
import { buscarPontuacaoPeloId } from "../../services/pontuacaoService";

const GerenciarPontuacao = () => {

    const {dadosDocumento, setDadosPontuacao} = useProjetoContext()
    const [hasScore, setHasScore] = useState(false)

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

    return (
        <div>

            {   hasScore ? (
                    <ExibirPontuacao />

                ) : (
                    <FormPontuacao />

                )

            }
            


        </div>
    )

}

export default GerenciarPontuacao