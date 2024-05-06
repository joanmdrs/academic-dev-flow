import React, { useState } from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import { FaPlus, FaSearch } from "react-icons/fa";
import {Button, Modal} from 'antd'
import ListaTarefas from "../../components/ListaTarefas/ListaTarefas"
import SelecionarProjeto from "../../components/SelecionarProjeto/SelecionarProjeto";
import FormBuscarTarefa from "../../components/FormBuscarTarefa/FormBuscarTarefa";
import { useContextoTarefa } from "../../context/ContextoTarefa";
import { 
    atualizarTarefa, 
    criarTarefa, 
    excluirTarefas, 
    filtrarTarefasPeloNomeEPeloProjeto } from "../../../../services/tarefaService";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import { createIssue, updateIssue } from "../../../../services/githubIntegration/issueService";
import FormTarefa from "../../components/FormTarefa/FormTarefa";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";

const GerenciarTarefas = () => {

    const [isFormVisivel, setIsFormVisivel] = useState(false)
    const [isFormBuscarVisivel, setIsFormBuscarVisivel] = useState(false)
    const [acaoForm, setAcaoForm] = useState('criar')

    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()

    const {
        setTarefas,
        dadosTarefa, 
        setDadosTarefa } = useContextoTarefa()

    const handleCancelar = () => {
        setIsFormVisivel(false)
        setDadosTarefa(null)
    }

    const handleReload = () => {
        setIsFormVisivel(false)
        setIsFormBuscarVisivel(false)
        setAcaoForm('criar')
        setTarefas([])
        setDadosProjeto(null)
    }

    const handleFiltrarTarefas = async (dados) => {
        const response = await filtrarTarefasPeloNomeEPeloProjeto(dados.nome_tarefa, dados.id_projeto)
        if (!response.error) {
            setTarefas(response.data)
        }
    }

    const handleBuscarProjeto = async (id) => {
        const response = await buscarProjetoPeloId(id)
        setDadosProjeto(response.data)
    }

    const handleAdicionarTarefa = () => {
        setIsFormVisivel(true)
        setIsFormBuscarVisivel(false)
        setAcaoForm('criar')
        setDadosTarefa(null)
    }

    const handleAtualizarTarefa = async (record) => {
        await handleBuscarProjeto(record.projeto)
        setIsFormVisivel(true)
        setIsFormBuscarVisivel(false)
        setAcaoForm('atualizar')
        setDadosTarefa(record)
    }

    const handleSaveIssue = async (dadosForm) => {
        const dadosEnviar = {
            github_token: dadosProjeto.token,
            repository: dadosProjeto.nome_repo,
            title: dadosForm.nome,
            body: dadosForm.descricao,
            labels: dadosForm.labelsNames,
            assignees: dadosForm.assignees 
        };
    
        const response = acaoForm === 'criar' ?
            await createIssue(dadosEnviar) :
            await updateIssue(dadosTarefa.number_issue, dadosEnviar);
    
        return response;
    };
    
    const handleSalvarTarefa = async (dadosForm) => {
        dadosForm['projeto'] = dadosProjeto.id;
        const resIssue = await handleSaveIssue(dadosForm);
    
        if (acaoForm === 'criar' && !resIssue.error) {
            const dadosIssue = resIssue.data;
            await criarTarefa(dadosForm, dadosIssue);
        } else if (acaoForm === 'atualizar') {
            await atualizarTarefa(dadosTarefa.id, dadosForm);
        }
        
        handleReload();
    };

    const handleExcluirTarefa = async (id) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir este(s) item(s) ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                await excluirTarefas([id])
                handleReload()
            }
        });
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
                    <FormBuscarTarefa onSearch={handleFiltrarTarefas}  />
                </div>
            )}

            <div className="global-div"> 
                {isFormVisivel && (
                    <FormTarefa additionalFields={
                        <SelecionarProjeto />
                    } onSubmit={handleSalvarTarefa} onCancel={handleCancelar}  />
                )}

                {!isFormVisivel  && (
                    <ListaTarefas onEdit={handleAtualizarTarefa} onDelete={handleExcluirTarefa} />
                )}
            </div>
        </React.Fragment>            
    )
}

export default GerenciarTarefas