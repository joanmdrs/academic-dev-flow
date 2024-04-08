import React, { useState } from "react";
import {Button} from 'antd'
import Titulo from "../../../../components/Titulo/Titulo";
import { FaPlus, FaSearch } from "react-icons/fa";
import FormGenericBusca from "../../../../components/Forms/FormGenericBusca/FormGenericBusca";
import FormArtefato from "../../components/FormArtefato/FormArtefato";
import ListaArtefatos from "../../components/ListaArtefatos/ListaArtefatos";
import SelectProjeto from "../../components/SelectProjeto/SelectProjeto"
import InputsAdmin from "../../components/InputsAdmin/InputsAdmin"
import { useContextoArtefato } from "../../context/ContextoArtefato";
import { createContent } from "../../../../services/githubIntegration";

const GerenciarArtefatos = () => {

    const [isFormVisivel, setIsFormVisivel] = useState(false)
    const [isFormBuscarVisivel, setIsFormBuscarVisivel] = useState(false)
    const [acaoForm, setAcaoForm] = useState('criar')
    const {dadosProjeto} = useContextoArtefato()

    const handleCriarArtefato = () => {
        setIsFormVisivel(true)
    }

    const handleSalvarArtefato = async (dados) => {
        dados['projeto'] = dadosProjeto.id
        dados['github_token'] = dadosProjeto.token

        await createContent(dados)
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
                    <FormArtefato onSubmit={handleSalvarArtefato} selectProjeto={<SelectProjeto />} inputsAdmin={<InputsAdmin/>} /> 
                ) : (<ListaArtefatos />)}

            </div>
        </React.Fragment>    
    )
}

export default GerenciarArtefatos