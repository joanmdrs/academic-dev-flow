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
import { criarArtefato } from "../../../../services/artefatoService";

const GerenciarArtefatos = () => {

    const [isFormVisivel, setIsFormVisivel] = useState(false)
    const [isFormBuscarVisivel, setIsFormBuscarVisivel] = useState(false)
    const [acaoForm, setAcaoForm] = useState('criar')
    const {dadosProjeto, setDadosProjeto, setArtefatos} = useContextoArtefato()

    const handleCancelar = () => {
        setIsFormVisivel(false)
    }

    const handleReload = () => {
        setIsFormVisivel(false)
        setIsFormBuscarVisivel(false)
        setDadosProjeto(null)
        setArtefatos([])
    }

    const handleCriarArtefato = () => {
        setIsFormVisivel(true)
        setDadosProjeto(null)
    }

    const handleSalvarArtefato = async (dados) => {
        dados['projeto'] = dadosProjeto.id
        dados['github_token'] = dadosProjeto.token


        if (acaoForm === 'criar') {
            const response = await createContent(dados)
            if (!response.error){
                dados['id_file'] = response.data.sha
                await criarArtefato(dados)
                handleReload()
            } 
        } else if (acaoForm === 'atualizar'){
        
        }


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
                    <FormArtefato 
                        onSubmit={handleSalvarArtefato} 
                        onCancel={handleCancelar}
                        selectProjeto={<SelectProjeto />} 
                        inputsAdmin={<InputsAdmin/>} /> 
                ) : (<ListaArtefatos />)}

            </div>
        </React.Fragment>    
    )
}

export default GerenciarArtefatos