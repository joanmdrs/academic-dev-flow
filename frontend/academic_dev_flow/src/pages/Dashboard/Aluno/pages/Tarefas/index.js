import { Button } from "antd";
import React, { useState } from "react";
import ListaTarefas from "./ListaTarefas/ListaTarefas";
import BotaoBuscar from "../../../../../components/Botoes/BotaoBuscar/BotaoBuscar";
import BotaoAdicionar from "../../../../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoExcluir from "../../../../../components/Botoes/BotaoExcluir/BotaoExcluir";
import FormTarefa from "./FormTarefa/FormTarefa";

const GerenciarTarefas = () => {

    const [exibirForm, setExibirForm] = useState(false)
    const [acaoForm, setAcaoForm] = useState('create')

    const handleExibirForm = () => setExibirForm(true)

    const handleFecharForm = () => setExibirForm(false)

    const handleSaveTarefa = async (dados) => {

        if (acaoForm === 'create'){
            console.log(dados)
        }
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
                 
                { exibirForm ? (<FormTarefa onCancel={handleFecharForm} onSubmit={handleSaveTarefa}/>) : <ListaTarefas /> }



                

            </div> 
    </React.Fragment>
    )

}

export default GerenciarTarefas