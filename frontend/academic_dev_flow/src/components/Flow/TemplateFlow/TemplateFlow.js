import React from "react";
import "./TemplateFlow.css";
import { Button } from "antd";
import {MdAdd} from 'react-icons/md';
import {FcFolder} from 'react-icons/fc';

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
                        <div className="flow-item"> 
                            <Button>
                                <FcFolder className="icon-folder"/>
                            </Button>
                            <h4>{fluxo.nome}</h4>
                        </div>
                        
                    ))}
                </div>      
            )}
            

          

            
        </div>
    )
}

export default TemplateFlow;