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
    const {dadosProjeto, dadosTarefa, setDadosTarefa} = useFormContext()

    const handleExibirForm = () => setExibirForm(true)

    const handleFecharForm = () => setExibirForm(false)

    const handleEditTarefa = (dados) => {
        setDadosTarefa(dados)
        handleExibirForm()
        setAcaoForm('update')
        console.log(dados)
    }

    const handleSaveTarefa = async (dados) => {

        dados['projeto'] = dadosProjeto.id
        if (acaoForm === 'create'){
            await criarTarefa(dados)
        } else if (acaoForm === 'update'){
            return
        }

        handleFecharForm()
    }


    return (

        <React.Fragment>
            <div>
                <div className="button-menu"> 
                    <BotaoBuscar nome="Buscar tarefas" />
                    <div className="two-buttons"> 
                        <BotaoAdicionar funcao={handleExibirForm}/>
                        <BotaoExcluir />
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