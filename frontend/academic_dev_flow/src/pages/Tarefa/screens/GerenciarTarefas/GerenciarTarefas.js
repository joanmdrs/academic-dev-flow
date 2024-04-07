import React, { useState } from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import { FaPlus, FaSearch } from "react-icons/fa";
import {Button} from 'antd'
import ListaTarefas from "../../components/ListaTarefas/ListaTarefas"
import SelecionarProjeto from "../../components/SelecionarProjeto/SelecionarProjeto";
import FormBuscarTarefa from "../../components/FormBuscarTarefa/FormBuscarTarefa";
import { useContextoTarefa } from "../../context/ContextoTarefa";
import { criarTarefa } from "../../../../services/tarefaService";
import FormGenericTarefa from "../../components/FormGenericTarefa/FormGenericTarefa";

const GerenciarTarefas = () => {

    const [isFormVisivel, setIsFormVisivel] = useState(false)
    const [isFormBuscarVisivel, setIsFormBuscarVisivel] = useState(true)
    const [acaoForm, setAcaoForm] = useState('criar')
    const {dadosProjeto, setDadosTarefa, step} = useContextoTarefa()

    const handleAdicionarTarefa = () => {
        setIsFormVisivel(true)
        setIsFormBuscarVisivel(false)
        setAcaoForm('criar')
        setDadosTarefa(null)
    }

    const handleSalvarTarefa = async (dados) => {
        dados['projeto'] = dadosProjeto.id
        if (acaoForm === 'criar'){
            await criarTarefa(dados)
        } 
    }

    return (

        <React.Fragment>
            <Titulo 
                titulo='Tarefas'
                paragrafo='Tarefas > Gerenciar tarefas'
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
                    onClick={handleAdicionarTarefa} 
                >
                    Criar Tarefa
                </Button>
            </div>

            {isFormBuscarVisivel && (
                <div className="global-div" style={{width: '50%'}}>   
                    <FormBuscarTarefa  />
                </div>
            )}

            <div className="global-div"> 
                {
                    isFormVisivel && acaoForm === 'criar' ? 
                    ( 

                        <React.Fragment> 
                            { step === "0" && <SelecionarProjeto /> }
                            { step === "1" && <FormGenericTarefa onSubmit={handleSalvarTarefa} />}
                
                        </React.Fragment>
                    )
                    : (<ListaTarefas />)
                }
            </div>

        
        
        </React.Fragment>            
    )
}

export default GerenciarTarefas