import React, { useState } from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import { FaFilter, FaPlus, FaTrash } from "react-icons/fa";
import {Button, Modal, Spin} from 'antd'
import SelecionarProjeto from "../../components/SelecionarProjeto/SelecionarProjeto";
import FormBuscarTarefa from "../../components/FormBuscarTarefa/FormBuscarTarefa";
import { useContextoTarefa } from "../../context/ContextoTarefa";
import { 
    atualizarTarefa, 
    BuscarTarefasPeloNomeEPeloProjeto, 
    criarTarefa, 
    excluirTarefas } from "../../../../services/tarefaService";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import { createIssue, updateIssue } from "../../../../services/githubIntegration/issueService";
import FormTarefa from "../../components/FormTarefa/FormTarefa";
import InputsAdminTarefa from "../../components/InputsAdminTarefa/InputsAdminTarefa";
import { NotificationManager } from "react-notifications";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import TableAdminTarefas from "../../components/TableAdminTarefas/TableAdminTarefas";
import SpinLoading from "../../../../components/SpinLoading/SpinLoading";

const GerenciarTarefas = () => {

    const [isFormVisivel, setIsFormVisivel] = useState(false)
    const [isFormBuscarVisivel, setIsFormBuscarVisivel] = useState(false)
    const [isTableVisivel, setIsTableVisivel] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()

    const {
        acaoForm, 
        setAcaoForm,
        setTarefas,
        dadosTarefa, 
        setDadosTarefa,
        tarefasSelecionadas
     } = useContextoTarefa()

    const handleCancelar = () => {
        setIsFormVisivel(false)
        setDadosTarefa(null)
        setDadosProjeto(null)
    }

    const handleReload = () => {
        setIsTableVisivel(true)
        setIsFormVisivel(false)
        setIsFormBuscarVisivel(false)
        setAcaoForm('criar')
        setTarefas([])
        setDadosProjeto(null)
    }

    const handleFiltrarTarefas = async (dados) => {
        const response = await BuscarTarefasPeloNomeEPeloProjeto(dados.nome_tarefa, dados.id_projeto)
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
        
        if (!dadosProjeto.token || !dadosProjeto.nome_repo) {
            NotificationManager.info('Não é possível sincronizar com o GitHub. O projeto não possui token ou repositório configurado.');
            return { error: 'Projeto sem token ou repositório configurado' };
        }
    
        const dadosEnviar = {
            github_token: dadosProjeto.token,
            repository: dadosProjeto.nome_repo,
            title: dadosForm.nome,
            body: dadosForm.descricao,
            assignees: dadosForm.assignees
        };

        if (acaoForm === 'criar') {
            const response = await createIssue(dadosEnviar)
            return response
        } else if (acaoForm === 'atualizar' && !dadosTarefa.number_issue){
            const response = await createIssue(dadosEnviar)
            return response
        } else if (acaoForm === 'atualizar' && dadosTarefa.number_issue){
            const response = await updateIssue(dadosTarefa.number_issue, dadosEnviar);
            return response
        }
    };
    
    
    const handleSalvarTarefa = async (dadosForm) => {
        setIsLoading(true);

        console.log(dadosForm)
        
        dadosForm.projeto = dadosProjeto.id;
        let dadosIssue = null;
        
        console.log(dadosForm['sicronizar-github'])
        if (dadosForm['sicronizar-github']) {
            console.log('estou entrando aqui')
            const resIssue = await handleSaveIssue(dadosForm);
    
            if (resIssue.error) {
                setIsLoading(false);
                return;
            }
    
            // Atribui os dados da issue apenas se a sincronização for bem-sucedida
            dadosIssue = resIssue.data;
        }
    
        // Decide entre criar ou atualizar a tarefa
        try {
            if (acaoForm === 'criar') {
                await criarTarefa(dadosForm, dadosIssue);
            } else {
                await atualizarTarefa(dadosTarefa.id, dadosForm, dadosIssue);
            }
            handleReload();
    
        } catch (error) {
            console.log(error)
            NotificationManager.error('Erro ao salvar a tarefa');
        }
        
        setIsLoading(false);
    };

    const handleExcluirTarefa = async (ids) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir este(s) item(s)?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                setIsTableVisivel(false)
                setIsLoading(true);
                try {
                    await excluirTarefas(ids);
                    handleReload()

                } catch (error) {
                    NotificationManager.error('Erro ao excluir a tarefa');
                } 
                setIsLoading(false);
            }
        });
    };

    const handleExcluirTarefasSelecionadas = async () => {
        const ids = tarefasSelecionadas.map(item => item.id);
        await handleExcluirTarefa(ids);
    };
    
    const handleExcluirTarefaUnica = async (id) => {
        await handleExcluirTarefa([id]);
    };

    return (
        <div className="content">
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
                        onClick={handleExcluirTarefasSelecionadas}
                    >
                        Excluir
                    </Button>
                </div>
                
            </div>

            {isFormBuscarVisivel && (
                <div style={{width: '50%'}}>   
                    <FormBuscarTarefa onSearch={handleFiltrarTarefas}  />
                </div>
            )}

            <div> 
                {isFormVisivel && acaoForm === 'criar' && (
                    <React.Fragment>
                        {isLoading && ( 
                            <SpinLoading />
                        )}

                        <FormTarefa 
                            selectProject={<SelecionarProjeto />} 
                            onSubmit={handleSalvarTarefa} 
                            onCancel={handleCancelar} 
                        />
                    </React.Fragment>
                )}

                {isFormVisivel && acaoForm === 'atualizar' && (
                    <React.Fragment>
                        {isLoading && ( 
                            <SpinLoading />
                        )}

                        <FormTarefa 
                            selectProject={<SelecionarProjeto />} 
                            inputsAdmin={<InputsAdminTarefa />}
                            onSubmit={handleSalvarTarefa} 
                            onCancel={handleCancelar} 
                        />

                    </React.Fragment>
                    
                )}

                {!isFormVisivel  && (
                    <React.Fragment>
                        {isLoading && ( 
                            <SpinLoading />
                        )}
                        {isTableVisivel && (
                            <TableAdminTarefas onEdit={handleAtualizarTarefa} onDelete={handleExcluirTarefaUnica} />
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>            
    )
}

export default GerenciarTarefas