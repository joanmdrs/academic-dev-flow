import { Button, Form, Modal, Result, Select, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { buscarProjetosDoMembro } from "../../../../services/membroProjetoService";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import { atualizarTarefa, criarTarefa, excluirTarefas, iniciarContagemTempo, listarTarefasPorProjeto, pararContagemTempo } from "../../../../services/tarefaService";
import ListTarefas from "../../components/ListTarefas/ListTarefas";
import { FaPlus } from "react-icons/fa";
import { useContextoTarefa } from "../../context/ContextoTarefa";
import FormTarefa from "../../components/FormTarefa/FormTarefa";
import { createIssue, updateIssue } from "../../../../services/githubIntegration/issueService";
import { useNavigate } from "react-router-dom";

const {TabPane} = Tabs

const MinhasTarefas = () => {

    const {autor} = useContextoGlobalProjeto()
    const {dadosProjeto, setDadosProjeto, grupo} = useContextoGlobalProjeto()
    const {dadosTarefa, setDadosTarefa} = useContextoTarefa()
    const [optionsProjetos, setOptionsProjetos] = useState([])
    const [selectProjeto, setSelectProjeto] = useState('Projeto')
    const [tarefasParaFazer, setTarefasParaFazer] = useState([])
    const [tarefasEmAndamento, setTarefasEmAndamento] = useState([])
    const [tarefasEmRevisao, setTarefasEmRevisao] = useState([])
    const [tarefasConcluidas, setTarefasConcluidas] = useState([])
    const [isFormSalvarVisivel, setIsFormSalvarVisivel] = useState(false)
    const [acaoForm, setAcaoForm] = useState('criar')
    const navigate = useNavigate();


    const handleGetProjetos = async () => {
        const resMembroProjeto = await buscarProjetosDoMembro(autor.id_user);

        const dados = await Promise.all(resMembroProjeto.data.map(async (membroProjeto) => {

            const resProjeto = await buscarProjetoPeloId(membroProjeto.projeto)

            if (!resProjeto.error) {
                return {
                    value: resProjeto.data.id,
                    label: resProjeto.data.nome
                }
            }      
        }))
        setOptionsProjetos(dados)
    }

    const handleGetTarefas = async () => {
        const response = await listarTarefasPorProjeto(dadosProjeto.id);
        if (!response.error) {
            const tasks = response.data;

            setTarefasParaFazer(tasks.filter(task => task.status === 'criada'));
            setTarefasEmAndamento(tasks.filter(task => task.status === 'andamento'));
            setTarefasEmRevisao(tasks.filter(task => task.status === 'pendente de revisão'));
            setTarefasConcluidas(tasks.filter(task => task.status === 'concluida'));
        }
    };

    const handleSelectProjeto = async (value) => {
        setSelectProjeto(value)

        if (value !== undefined) {
            const response = await buscarProjetoPeloId(value)
            if (!response.error){
                setDadosProjeto(response.data)
            }
        } else {
            setDadosProjeto(null)
        }
    }

    const handleStartTarefa = async (idTask) => {
        const parametros = {
            tarefa_id: idTask,
            membro_projeto_id: autor.id_membro_projeto
        }
        await iniciarContagemTempo(parametros)
        await handleGetTarefas()

    }

    const handlePauseTarefa = async (idTask) => {
        const parametros = {
            tarefa_id: idTask,
            membro_projeto_id: autor.id_membro_projeto
        }
        await pararContagemTempo(parametros)
        await handleGetTarefas()
    }

    const handleCancelar = () => {
        setIsFormSalvarVisivel(false)
        setDadosTarefa(null)
    }

    const handleReload = async () => {
        setIsFormSalvarVisivel(false)
        setAcaoForm('criar')
        await handleGetTarefas()
    }

    const handleAdicionarTarefa = () => {
        setIsFormSalvarVisivel(true)
        setAcaoForm('criar')
        setDadosTarefa(null)
    }

    const handleAtualizarTarefa = async (record) => {
        setIsFormSalvarVisivel(true)
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
        
        await handleReload();
    };


    const handleExcluirTarefa = async (id) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir este(s) item(s) ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                await excluirTarefas([id])
                await handleReload()
            }
        });
    }

    const handleVisualizarComentarios = (idTarefa) => {
        navigate(`/professor/tarefas/${idTarefa}/comentarios`)
    }

    useEffect(() => {
        const fetchData = async () => {

            if (autor && autor.id_user){
                await handleGetProjetos()
            }
            if (dadosProjeto) {
                await handleGetTarefas()
            }
        }

        fetchData()
    }, [autor, dadosProjeto])

    return (
        <div>

            { dadosProjeto === null ? (
                <Result 
                    style={{margin: '0 auto'}}
                    status="info"
                    title="Tarefas"
                    subTitle="Selecione o projeto para poder exibir as suas tarefas."
                    extra={
                            <Select style={{width: '20%'}} allowClear onChange={handleSelectProjeto} defaultValue="Projeto" options={optionsProjetos} />
                      }
                />) : (
                
                <div>

                    <div style={{margin: '20px'}}>
                        <h2> Minhas Tarefas </h2>  
                    </div>

                    <div style={{margin: '20px'}}>

                        <div style={{display: 'flex', gap: '10px',justifyContent: 'flex-end'}}> 
                            <Button 
                                icon={<FaPlus />}
                                type="primary"
                                onClick={handleAdicionarTarefa}
                            >
                                Adicionar Tarefa
                            </Button>
                            <Form.Item>
                                <Select
                                    allowClear
                                    onChange={handleSelectProjeto}
                                    value={selectProjeto}
                                    options={optionsProjetos}
                                />

                            </Form.Item>
                        </div>
                    </div>

                    { isFormSalvarVisivel ? (
                        <div className="global-div">
                            <FormTarefa onCancel={handleCancelar} onSubmit={handleSalvarTarefa} />
                        </div>
                    ) : (
                        <div style={{margin: '20px'}}>
                            <Tabs>
                                <TabPane tab="Para fazer" key="1" style={{marginTop: '50px'}}>
                                    <ListTarefas 
                                        dados={tarefasParaFazer} 
                                        onStart={handleStartTarefa}
                                        onPause={handlePauseTarefa}
                                        onOpen={handleAtualizarTarefa}
                                        onDelete={handleExcluirTarefa}
                                        onViewComments={handleVisualizarComentarios}

                                    />
                                </TabPane>

                                <TabPane tab="Em andamento" key="2">
                                    <ListTarefas 
                                        dados={tarefasEmAndamento} 
                                        onStart={handleStartTarefa}
                                        onPause={handlePauseTarefa}
                                        onOpen={handleAtualizarTarefa}
                                        onDelete={handleExcluirTarefa}
                                        onViewComments={handleVisualizarComentarios}
                                    />
                                </TabPane>

                                <TabPane tab="Em revisão" key="3">
                                    <ListTarefas dados={tarefasEmRevisao} />
                                </TabPane>

                                <TabPane tab="Concluídas" key="4">
                                    <ListTarefas dados={tarefasConcluidas} />
                                </TabPane>

                            </Tabs>

                    </div>
                    )
                
                    }

                </div>)}
        </div>
    )
}

export default MinhasTarefas