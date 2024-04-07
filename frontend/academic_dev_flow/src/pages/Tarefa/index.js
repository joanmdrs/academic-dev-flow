import { Button } from "antd";
import React, { useState } from "react";
import ListaTarefas from "./ListaTarefas/ListaTarefas";
import FormTarefa from "./FormTarefa/FormTarefa";
import { IoAdd, IoClose } from "react-icons/io5";
import { useProjetoContext } from "../../context/ProjetoContext";
import { atualizarTarefa, criarTarefa } from "../../services/tarefaService";

const GerenciarTarefas = () => {

    const [acaoForm, setAcaoForm] = useState('create')
    const [formVisivel, setFormVisivel] = useState(false)
    const {dadosProjeto, setDadosTarefa, setTarefasSelecionadas} = useProjetoContext()


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
                    { formVisivel ? (<Button type="primary" danger  onClick={handleCancelar} icon={<IoClose/>}> Cancelar </Button>) 
                    : ( <Button type="primary" onClick={handleAddTarefa} icon={<IoAdd/>}> Adicionar Tarefa </Button>)}
                  
                </div>
                 
                { formVisivel ? 
                    (<FormTarefa onCancel={handleCancelar} onSubmit={handleSaveTarefa}/>) 
                    : <ListaTarefas  onEdit={handleEditTarefa} />}



                

            </div> 
    </React.Fragment>
    )

}

export default GerenciarTarefas