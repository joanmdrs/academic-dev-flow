import React, { useState } from "react";
import "./flow.css";
import Titulo from "../../components/Titulo/Titulo";
import SearchFlow from "../../components/Flow/SearchFlow/SearchFlow";
import TemplateFlow from "../../components/Flow/TemplateFlow/TemplateFlow";
import { buscarFluxoPeloNome } from "../../services/fluxo_service";

const Flow = () => {

    const [fluxos, setFluxos] = useState([])

    const handleSearchFlow = async (query) => {
        const response = await buscarFluxoPeloNome(query);
        setFluxos(response.data)
    }

    return (
        <div className="flow">
        
            < Titulo 
                titulo="Fluxos de Desenvolvimento" 
                paragrafo=""
            />
            <SearchFlow buscar_fluxos = {handleSearchFlow} />
            <TemplateFlow fluxos={fluxos}/>
        </div>
    )

}

export default Flow; 