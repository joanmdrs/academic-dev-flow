import React, { useState } from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import { FaFilter, FaPlus, FaTrash } from "react-icons/fa";
import {Button, Modal, Spin} from 'antd'
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
import InputsAdminTarefa from "../../components/InputsAdminTarefa/InputsAdminTarefa";

const StyleSpin = {
    position: 'fixed', 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '100%', 
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
    zIndex: 9999, 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center'
};

const GerenciarTarefas = () => {

    const [isFormVisivel, setIsFormVisivel] = useState(false)
    const [isFormBuscarVisivel, setIsFormBuscarVisivel] = useState(false)
    const [acaoForm, setAcaoForm] = useState('criar')
    const [isLoading, setIsLoading] = useState(false)

    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()

    const {
        setTarefas,
        dadosTarefa, 
        setDadosTarefa,
        tarefasSelecionadas
     } = useContextoTarefa()

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
        setIsLoading(true)
        dadosForm['projeto'] = dadosProjeto.id;
        const resIssue = await handleSaveIssue(dadosForm);
    
        if (acaoForm === 'criar' && !resIssue.error) {
            const dadosIssue = resIssue.data;
            await criarTarefa(dadosForm, dadosIssue);
        } else if (acaoForm === 'atualizar') {
            await atualizarTarefa(dadosTarefa.id, dadosForm);
        }
        
        handleReload();
        setIsLoading(false)
    };

    const handleExcluirTarefas = async () => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir este(s) item(s) ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                if (tarefasSelecionadas !== null) {
                    const ids = tarefasSelecionadas.map((item) => item.id)
                    await excluirTarefas(ids)
                    handleReload() 
                }
            }
        });
    }

    const handleExcluirTarefa = async (id) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir este(s) item(s) ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                setIsLoading(true)
                await excluirTarefas([id])
                handleReload()
                setIsLoading(false)
            }
        });
    }

    return (
        <React.Fragment>
            <Titulo 
                titulo='Tarefas'
                paragrafo='Tarefas > Gerenciar tarefas'
            />

            <div style={{display: 'flex', justifyContent: 'space-between', margin: '20px'}}> 
                <div> 
                    <Button
                        icon={<FaFilter />} 
                        type="primary"
                        onClick={() => setIsFormBuscarVisivel(!isFormBuscarVisivel)}
                    >
                        Filtrar
                    </Button>
                </div>

                <div style={{display: 'flex', gap: '10px'}}> 
                    <Button 
                        icon={<FaPlus />} 
                        type="primary" 
                        onClick={handleAdicionarTarefa} 
                    >
                        Criar Tarefa
                    </Button>
                    <Button 
                        icon={<FaTrash />} 
                        type="primary" 
                        disabled={tarefasSelecionadas.length === 0 ? true : false}
                        danger
                        onClick={handleExcluirTarefas}
                    >
                        Excluir
                    </Button>
                </div>
                
            </div>

            {isFormBuscarVisivel && (
                <div className="global-div" style={{width: '50%'}}>   
                    <FormBuscarTarefa onSearch={handleFiltrarTarefas}  />
                </div>
            )}

            <div className="global-div"> 
                {isFormVisivel && acaoForm === 'criar' && (
                    <React.Fragment>
                        {isLoading && ( 
                            <div style={StyleSpin}>
                                <Spin size="large" />
                            </div>
                        )}

                        <FormTarefa 
                            additionalFields={                <SelecionarProjeto />
                        } 
                            onSubmit={handleSalvarTarefa} 
                            onCancel={handleCancelar} 
                        />
                    </React.Fragment>
                )}

                {isFormVisivel && acaoForm === 'atualizar' && (
                    <React.Fragment>
                        {isLoading && ( 
                            <div style={StyleSpin}>
                                <Spin size="large" />
                            </div>
                        )}

                        <FormTarefa 
                            additionalFields={                <SelecionarProjeto />
                        } 
                            inputsAdmin={<InputsAdminTarefa />}
                            onSubmit={handleSalvarTarefa} 
                            onCancel={handleCancelar} 
                        />

                    </React.Fragment>
                    
                )}

                

                {!isFormVisivel  && (
                    <React.Fragment>
                        {isLoading && ( 
                            <div style={StyleSpin}>
                                <Spin size="large" />
                            </div>
                        )}
                        <ListaTarefas onEdit={handleAtualizarTarefa} onDelete={handleExcluirTarefa} />
                    </React.Fragment>
                )}
            </div>
        </React.Fragment>            
    )
}

export default GerenciarTarefas