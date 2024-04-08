import React, { useState } from "react";
import {Button} from 'antd'
import Titulo from "../../../../components/Titulo/Titulo";
import { FaPlus, FaSearch } from "react-icons/fa";
import FormGenericBusca from "../../../../components/Forms/FormGenericBusca/FormGenericBusca";
import FormArtefato from "../../components/FormArtefato/FormArtefato";
import ListaArtefatos from "../../components/ListaArtefatos/ListaArtefatos";
import SelectProjeto from "../../components/SelectProjeto/SelectProjeto"
import InputsAdmin from "../../components/InputsAdmin/InputsAdmin"

const GerenciarArtefatos = () => {

    const [isFormVisivel, setIsFormVisivel] = useState(false)
    const [isFormBuscarVisivel, setIsFormBuscarVisivel] = useState(false)
    const [acaoForm, setAcaoForm] = useState('criar')

    const handleCriarArtefato = () => {
        setIsFormVisivel(true)
    }

    const handleSalvarArtefato = (dados) => {
    
        const dadosGit = {
            repository: dados.repository,
            content: dados.descricao,
            commit_message: dados.commit_message,
            path: dados.path_github,
            author_name: dados.author_name,
            author_email: dados.author_email
        }

        console.log(dadosGit)
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