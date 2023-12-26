import React, { useState } from "react";
import "./flow.css";
import Title from "../../components/Title/Title";
import SearchFlow from "../../components/Flow/SearchFlow/SearchFlow";
import TemplateFlow from "../../components/Flow/TemplateFlow/TemplateFlow";
import { buscar_fluxo } from "../../services/flow_service";

const Flow = () => {

    const [fluxos, setFluxos] = useState([])

    const handleSearchFlow = async (query) => {
        const response = await buscar_fluxo(query);
        setFluxos(response.data)
    }

    return (
        <div className="flow">
        
            <Title 
                title="Fluxos de Desenvolvimento" 
                paragraph=""
            />
            <SearchFlow buscar_fluxos = {handleSearchFlow} />
            <TemplateFlow fluxos={fluxos}/>
        </div>
    )

}

export default Flow; 