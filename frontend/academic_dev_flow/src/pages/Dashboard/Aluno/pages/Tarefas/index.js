import { Button } from "antd";
import React, { useState } from "react";
import ListaTarefas from "./ListaTarefas/ListaTarefas";
import BotaoBuscar from "../../../../../components/Botoes/BotaoBuscar/BotaoBuscar";
import BotaoAdicionar from "../../../../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoExcluir from "../../../../../components/Botoes/BotaoExcluir/BotaoExcluir";
import FormTarefa from "./FormTarefa/FormTarefa";
import { useFormContext } from "../../context/Provider/Provider";
import { criarTarefa } from "../../../../../services/tarefaService";

const GerenciarTarefas = () => {

    const [exibirForm, setExibirForm] = useState(false)
    const [acaoForm, setAcaoForm] = useState('create')
    const [botaoAdicionarVisivel, setBotaoAdicionarVisivel] = useState(false)
    const [botaoExcluirVisivel, setBotaoExcluirVisivel] = useState(true)
    const {dadosProjeto, setDadosTarefa} = useFormContext()


    const handleExibirForm = () => setExibirForm(true)

    const handleFecharForm = () => setExibirForm(false)

    const handleAddTarefa = () => {
        setDadosTarefa(null)
        handleExibirForm()
        setAcaoForm('create')
    }


    const handleEditTarefa = (dados) => {
        setDadosTarefa(dados)
        handleExibirForm()
        setBotaoAdicionarVisivel(true)
        setAcaoForm('update')
    }

    const handleSaveTarefa = async (dados) => {

        dados['projeto'] = dadosProjeto.id
        if (acaoForm === 'create'){
            await criarTarefa(dados)
        } else if (acaoForm === 'update'){
            return
        }

        handleFecharForm()
        setBotaoAdicionarVisivel(false)
    }


    return (

        <React.Fragment>
            <div>
                <div className="button-menu"> 
                    <BotaoBuscar nome="Buscar tarefas" />
                    <div className="two-buttons"> 
                        <BotaoAdicionar funcao={handleAddTarefa} status={botaoAdicionarVisivel}/>
                        <BotaoExcluir status={botaoExcluirVisivel}  />
                    </div>
                </div>
                 
                { exibirForm ? 
                    (<FormTarefa onCancel={handleFecharForm} onSubmit={handleSaveTarefa}/>) 
                    : <ListaTarefas  onEdit={handleEditTarefa}/> }



                

            </div> 
    </React.Fragment>
    )

}

export default GerenciarTarefas