import React from "react";
import "./TemplateFlow.css";
import { Button } from "antd";
import {MdAdd} from 'react-icons/md';

const TemplateFlow = ({fluxos}) => {

    const handleGoBack = () => {
        window.location.href = '/fluxos/novo';
    };
    return (

        <div className="templates">
            <div className="template-item">
                <Button onClick={handleGoBack}>
                    <MdAdd className="icon-gr-add"/>
                </Button>
                <h4>Novo Fluxo</h4>
            </div>

            
            { fluxos.length > 0 && (
                
                <div className="flow-list">
                    {fluxos.map((fluxo, index) => (
                        <div className="flow-item"> {fluxo.nome}</div>
                        
                    ))}
                </div>      
            )}
            

          

            
        </div>
    )
}

export default TemplateFlow;