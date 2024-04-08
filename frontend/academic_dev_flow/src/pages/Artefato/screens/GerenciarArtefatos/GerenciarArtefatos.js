import React, { useState } from "react";
import {Button} from 'antd'
import Titulo from "../../../../components/Titulo/Titulo";
import { FaPlus, FaSearch } from "react-icons/fa";
import FormGenericBusca from "../../../../components/Forms/FormGenericBusca/FormGenericBusca";

const GerenciarArtefatos = () => {

    const [isFormVisivel, setIsFormVisivel] = useState(false)
    const [isFormBuscarVisivel, setIsFormBuscarVisivel] = useState(false)
    const [acaoForm, setAcaoForm] = useState('criar')

    return (
        <React.Fragment>
            <Titulo 
                titulo='Artefatos'
                paragrafo='Artefatos > Gerenciar artefatos'
            />

            <div className="button-menu"> 
                <Button
                    icon={<FaSearch />} 
                    type="primary"
                    onClick={() => setIsFormBuscarVisivel(!isFormBuscarVisivel)}
                >
                    Buscar
                </Button>
                <Button 
                    icon={<FaPlus />} 
                    type="primary" 
                >
                    Criar Artefato
                </Button>
            </div>

            {isFormBuscarVisivel && (
                <div className="global-div" style={{width: '50%'}}>   
                    <FormGenericBusca />
                </div>
            )}

            <div className="global-div"> 
                {/* {isFormVisivel && acaoForm === 'criar' && (
                    <React.Fragment> 
                        {step === "0" && <SelecionarProjeto />}
                        {step === "1" && <FormGenericTarefa onSubmit={handleSalvarTarefa} onCancel={handleCancelar}/>}
                    </React.Fragment>
                )} */}

                {/* {isFormVisivel && acaoForm === 'atualizar' && (
                    
                )}

                {!isFormVisivel  && (
                    
                )} */}
            </div>
        </React.Fragment>    
    )
}

export default GerenciarArtefatos