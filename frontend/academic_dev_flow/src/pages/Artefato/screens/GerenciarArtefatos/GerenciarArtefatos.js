import React, { useState } from "react";
import {Button} from 'antd'
import Titulo from "../../../../components/Titulo/Titulo";
import { FaPlus, FaSearch } from "react-icons/fa";
import FormGenericBusca from "../../../../components/Forms/FormGenericBusca/FormGenericBusca";
import FormArtefato from "../../components/FormArtefato/FormArtefato";
import SelecionarProjeto from "../../components/SelecionarProjeto/SelecionarProjeto";
import ListaArtefatos from "../../components/ListaArtefatos/ListaArtefatos";

const GerenciarArtefatos = () => {

    const [isFormVisivel, setIsFormVisivel] = useState(false)
    const [isFormBuscarVisivel, setIsFormBuscarVisivel] = useState(false)
    const [acaoForm, setAcaoForm] = useState('criar')

    const handleCriarArtefato = () => {
        setIsFormVisivel(true)

    }

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
                    onClick={handleCriarArtefato}
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
                {isFormVisivel ? (
                    <FormArtefato additionalInputs={<SelecionarProjeto />} /> 
                ) : (<ListaArtefatos />)}

            </div>
        </React.Fragment>    
    )
}

export default GerenciarArtefatos