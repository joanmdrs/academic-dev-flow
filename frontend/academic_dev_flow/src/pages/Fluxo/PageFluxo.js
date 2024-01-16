import React, { useState } from "react";
import Titulo from "../../components/Titulo/Titulo";
import { buscarFluxoPeloNome } from "../../services/fluxo_service";
import InputBuscarFluxo from "./components/InputBuscarFluxo/InputBuscarFluxo";
import BotaoNovoFluxo from "./components/BotaoNovoFluxo/BotaoNovoFluxo";
import EtapasCriarFluxo from "./components/EtapasCriarFluxo/EtapasCriarFluxo";

const PageFluxo = () => {

    const [hasDadosFluxo, setHasDadosFluxo] = useState([])
    const [isFormVisivel, setIsFormVisivel] = useState(true)

    const handleBuscarFluxo = async (parametro) => {
        const response = await buscarFluxoPeloNome(parametro);
        setHasDadosFluxo(response.data)
    }

    return (

        <div>
            < Titulo 
                titulo="Fluxos de Desenvolvimento" 
                paragrafo="Gerenciar os fluxos de desenvolvimento"
            />
            { isFormVisivel ? (
                <EtapasCriarFluxo />
            ) : (<div> </div>)

            }
           
        </div>
    )

}

export default PageFluxo; 