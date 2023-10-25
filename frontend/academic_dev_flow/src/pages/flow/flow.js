import React from "react";
import "./flow.css";
import Title from "../../components/Title/Title";
import SearchFlow from "../../components/Flow/SearchFlow/SearchFlow";
import TemplateFlow from "../../components/Flow/TemplateFlow/TemplateFlow";

const Flow = () => {

    return (
        <div className="flow">
        
            <Title 
                title="Fluxos de Desenvolvimento" 
                paragraph=""
            />
            <SearchFlow />
            <TemplateFlow />
        </div>
    )

}

export default Flow; 