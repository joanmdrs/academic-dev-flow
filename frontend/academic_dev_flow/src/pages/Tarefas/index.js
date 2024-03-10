import { Button } from "antd";
import React, { useState } from "react";
import ListaTarefas from "./ListaTarefas/ListaTarefas";
import BotaoBuscar from "../../../../../components/Botoes/BotaoBuscar/BotaoBuscar";
import BotaoAdicionar from "../../../../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoExcluir from "../../../../../components/Botoes/BotaoExcluir/BotaoExcluir";
import FormTarefa from "./FormTarefa/FormTarefa";
import { useFormContext } from "../../context/Provider/Provider";
import { atualizarTarefa, criarTarefa, excluirTarefas } from "../../../../../services/tarefaService";
import { atualizarIteracao } from "../../../../../services/iteracaoService";
import { IoAdd, IoClose, IoCloseCircle } from "react-icons/io5";

const GerenciarTarefas = () => {

    const [acaoForm, setAcaoForm] = useState('create')
    const [formVisivel, setFormVisivel] = useState(false)
    const {dadosProjeto, setDadosTarefa, setTarefasSelecionadas} = useFormContext()


    const handleCancelar = () => {
        setDadosTarefa(null)
        setAcaoForm('create')
        setTarefasSelecionadas([])
        setFormVisivel(false)
    }

    const handleAddTarefa = () => {
        setFormVisivel(true)
        setDadosTarefa(null)
        setAcaoForm('create')
        setTarefasSelecionadas([])
    }

    const handleEditTarefa = (dados) => {
        setFormVisivel(true)
        setDadosTarefa(dados)
        setAcaoForm('update')
        setTarefasSelecionadas([])
    }

    const handleSaveTarefa = async (dados) => {
        dados['projeto'] = dadosProjeto.id

        if (acaoForm === 'create'){
            await criarTarefa(dados)
        } else if (acaoForm === 'update'){
            await atualizarTarefa(dadosProjeto.id, dados)
        }
        handleCancelar()
    }

    return (
        <React.Fragment>
            <div>
                <div className="button-menu" style={{marginBottom: "40px"}}> 
                    { formVisivel ? (<Button onClick={handleCancelar} icon={<IoClose/>}> Cancelar </Button>) 
                    : ( <Button onClick={handleAddTarefa} icon={<IoAdd/>}> Adicionar Tarefa </Button>)}
                  
                </div>
                 
                { formVisivel ? 
                    (<FormTarefa onCancel={handleCancelar} onSubmit={handleSaveTarefa}/>) 
                    : <ListaTarefas  onEdit={handleEditTarefa} />}



                

            </div> 
    </React.Fragment>
    )

}

export default GerenciarTarefas