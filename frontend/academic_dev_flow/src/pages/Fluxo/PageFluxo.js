import React, { useState } from "react";
import "./PageFluxo.css";
import Titulo from "../../components/Titulo/Titulo";
import { buscarFluxoPeloNome } from "../../services/fluxo_service";
import InputBuscarFluxo from "./components/InputBuscarFluxo/InputBuscarFluxo";
import BotaoNovoFluxo from "./components/BotaoNovoFluxo/BotaoNovoFluxo";
import TabsFluxo from "./components/Tabs/TabsFluxo";

const PageFluxo = () => {

    const [hasDadosFluxo, setHasDadosFluxo] = useState([])
    const [isFormVisivel, setIsFormVisivel] = useState(false)

    const handleBuscarFluxo = async (parametro) => {
        const response = await buscarFluxoPeloNome(parametro);
        setHasDadosFluxo(response.data)
    }

    const handleCliqueBotaoNovoFluxo = () => {
        setIsFormVisivel(true)
    }

    const handleCliqueBotaoVoltar = () => {
        setIsFormVisivel(false)
    }

    return (

        <div>
            < Titulo 
                titulo="Fluxos de Desenvolvimento" 
                paragrafo="Gerenciar fluxos de desenvolvimento"
            />

            { isFormVisivel ? (
                <TabsFluxo funcaoBotaoVoltar={handleCliqueBotaoVoltar}/>
            ) : (

                <div className="div-input-buscar-fluxo-e-botao-novo-fluxo">
                    <InputBuscarFluxo  funcao={handleBuscarFluxo}/>
                    <BotaoNovoFluxo funcao={handleCliqueBotaoNovoFluxo} />
                </div>                
            )}
           
        </div>
    )

}

export default PageFluxo; 