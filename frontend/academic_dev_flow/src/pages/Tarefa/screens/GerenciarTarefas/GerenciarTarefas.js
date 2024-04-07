import React, { useState } from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import { FaPlus, FaSearch } from "react-icons/fa";
import {Button} from 'antd'
import ListaTarefas from "../../components/ListaTarefas/ListaTarefas"
import SelecionarProjeto from "../../components/SelecionarProjeto/SelecionarProjeto";
import FormBuscarTarefa from "../../components/FormBuscarTarefa/FormBuscarTarefa";
import { useContextoTarefa } from "../../context/ContextoTarefa";
import { atualizarTarefa, criarTarefa } from "../../../../services/tarefaService";
import FormGenericTarefa from "../../components/FormGenericTarefa/FormGenericTarefa";
import { buscarProjetoPeloId } from "../../../../services/projetoService";

const GerenciarTarefas = () => {

    const [isFormVisivel, setIsFormVisivel] = useState(false)
    const [isFormBuscarVisivel, setIsFormBuscarVisivel] = useState(false)
    const [acaoForm, setAcaoForm] = useState('criar')
    const {dadosProjeto, setDadosProjeto, dadosTarefa, setDadosTarefa, step} = useContextoTarefa()

    const handleAdicionarTarefa = () => {
        setIsFormVisivel(true)
        setIsFormBuscarVisivel(false)
        setAcaoForm('criar')
        setDadosTarefa(null)
    }

    const handleBuscarProjeto = async (id) => {
        const response = await buscarProjetoPeloId(id)
        setDadosProjeto(response.data)
    }

    const handleAtualizarTarefa = async (record) => {
        await handleBuscarProjeto(record.projeto)
        setIsFormVisivel(true)
        setIsFormBuscarVisivel(false)
        setAcaoForm('atualizar')
        setDadosTarefa(record)
    }

    const handleSalvarTarefa = async (dados) => {
        dados['projeto'] = dadosProjeto.id
        if (acaoForm === 'criar'){
            await criarTarefa(dados)
        } else if (acaoForm === 'atualizar'){
            await atualizarTarefa(dadosTarefa.id, dados)
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
                {isFormVisivel && acaoForm === 'criar' && (
                    <React.Fragment> 
                        {step === "0" && <SelecionarProjeto />}
                        {step === "1" && <FormGenericTarefa onSubmit={handleSalvarTarefa} />}
                    </React.Fragment>
                )}

                {isFormVisivel && acaoForm === 'atualizar' && (
                    <FormGenericTarefa onSubmit={handleSalvarTarefa} />
                )}

                {!isFormVisivel  && (
                    <ListaTarefas onEdit={handleAtualizarTarefa} />
                )}
            </div>

        
        
        </React.Fragment>            
    )
}

export default GerenciarTarefas