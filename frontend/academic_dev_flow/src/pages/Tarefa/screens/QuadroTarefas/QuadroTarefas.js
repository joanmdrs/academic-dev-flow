import { Button, Modal, Spin, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { FaPlus, FaLink, FaTrash } from "react-icons/fa";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import FormTarefa from "../../components/FormTarefa/FormTarefa";
import { createIssue, updateIssue } from "../../../../services/githubIntegration/issueService";
import { useContextoTarefa } from "../../context/ContextoTarefa";
import { atualizarTarefa, criarTarefa, excluirTarefas, iniciarContagemTempo, pararContagemTempo, vincularIteracaoAsTarefas } from "../../../../services/tarefaService";
import { BsQuestionCircle } from "react-icons/bs";
import Aviso from "../../../../components/Aviso/Aviso";
import ModalVincularIteracao from "../../components/ModalVincularIteracao/ModalVincularIteracao";
import { useNavigate } from "react-router-dom";
import { buscarMembroProjetoPeloIdMembro } from "../../../../services/membroProjetoService";
import TableTarefasSelect from "../../components/TableTarefasSelect/TableTarefasSelect";

const { TabPane } = Tabs;

const QuadroTarefas = () => {

    const {dadosProjeto, grupo, autor} = useContextoGlobalProjeto()

    const {
        tarefas, 
        reload,
        tasksCriadas,
        tasksEmAndamento,
        tasksPendentesRevisao,
        tasksConcluidas,
        tasksAtrasadas,
        tasksCanceladas,
        dadosTarefa, 
        setDadosTarefa, 
        tarefasSelecionadas,
        setTarefasSelecionadas,
        handleGetTarefas
    } = useContextoTarefa()


    const [isFormSalvarVisivel, setIsFormSalvarVisivel] = useState(false)
    const [isBtnPlusDisabled, setIsBtnPlusDisabled] = useState(false)
    const isBtnTrashDisabled = tarefasSelecionadas.length === 0
    const [acaoForm, setAcaoForm] = useState('criar')
    const [isAvisoVisivel, setIsAvisoVisivel] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isModalVincularIteracaoVisivel, setIsModalVincularIteracaoVisivel] = useState(false)
    const [membroProjeto, setMembroProjeto] = useState(null)

    const navigate = useNavigate();


    const handleDuvidaClick = () => {
        setIsAvisoVisivel(true);
    };

    const handleAvisoClose = () => {
        setIsAvisoVisivel(false);
    };

    const handleCancelar = () => {
        setIsFormSalvarVisivel(false)
        setIsBtnPlusDisabled(false)
        setAcaoForm('criar')
        setIsModalVincularIteracaoVisivel(false)
    }

    const handleReload = async () => {
        setIsFormSalvarVisivel(false)
        setIsBtnPlusDisabled(false)
        setAcaoForm('criar')
        setTarefasSelecionadas([])
        setIsModalVincularIteracaoVisivel(false)
        await handleGetTarefas(dadosProjeto.id)
    }

    const handleAdicionarTarefa = () => {
        setDadosTarefa(null)
        setIsFormSalvarVisivel(true)
        setIsBtnPlusDisabled(true)
        setAcaoForm('criar')
    }

    const handleAtualizarTarefa = (record) => {
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
        setIsSaving(true);
        dadosForm['projeto'] = dadosProjeto.id;
        const resIssue = await handleSaveIssue(dadosForm);
    
        if (acaoForm === 'criar' && !resIssue.error) {
            const dadosIssue = resIssue.data;
            await criarTarefa(dadosForm, dadosIssue);
        } else if (acaoForm === 'atualizar' && !resIssue.error) {
            await atualizarTarefa(dadosTarefa.id, dadosForm);
        }
        
        await handleReload();
        setIsSaving(false);
    };

    const handleExcluirTarefas = () => {
  
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Tem certeza que deseja excluir este(s) item(s) ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                if (tarefasSelecionadas !== null) {
                    const ids = tarefasSelecionadas.map((item) => item.id)
                    await excluirTarefas(ids)
                    await handleReload() 
                    
                }
            }
        });
    };

    const handleExcluirTarefa = (idTarefa) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Tem certeza que deseja excluir esta tarefa ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                if (idTarefa !== null) {
                    const ids = [idTarefa]
                    await excluirTarefas(ids)
                    await handleReload() 
                    
                }
            }
        });
    }

    const handleVincularIteracaoAsTarefas = async (idIteracao) => {
        if (tarefasSelecionadas !== null) {
            const ids = tarefasSelecionadas.map((item) => item.id)
            const dados = {
                ids_tarefas: ids,
                id_iteracao: idIteracao
            }
            await vincularIteracaoAsTarefas(dados)
            handleReload()
        }
    }

    const handleVisualizarTarefa = (record) => {
        const parametros = {
            id: record.id,
            idProjeto: dadosProjeto.id
        }

        if (grupo === 'Docentes') {
            navigate("/professor/tarefas/visualizar", {
                state: parametros
            });
        } else if (grupo === 'Discentes') {
            navigate("/aluno/tarefas/visualizar", {
                state: parametros
            });
        } else if (grupo === 'Administradores') {
            navigate("/admin/tarefas/visualizar", {
                state: parametros
            });
        }
    }

    const handleStartTarefa = async (idTask) => {
        const parametros = {
            tarefa_id: idTask,
            membro_projeto_id: membroProjeto.id
        }
        await iniciarContagemTempo(parametros)
        await handleReload() 

    }

    const handlePauseTarefa = async (idTask) => {
       
        const parametros = {
            tarefa_id: idTask,
            membro_projeto_id: membroProjeto.id
        }
        await pararContagemTempo(parametros)
        await handleReload()
    }

    const handleGetMembroProjeto = async () => {

        const parametros = {
            id_membro: autor.id_membro,
            id_projeto: dadosProjeto.id
        }
        const response = await buscarMembroProjetoPeloIdMembro(parametros)
        if (!response.error){
            setMembroProjeto(response.data)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await handleGetMembroProjeto()    
            await handleGetTarefas(dadosProjeto.id);        
        }

        fetchData()
    }, [reload])

    return (
        <div>

            {isAvisoVisivel && (
                <Aviso
                    titulo="AVISO"
                    descricao="Ao cadastrar uma nova tarefa, uma issue correspondente será automaticamente criada no GitHub para acompanhamento e organização. Certifique-se de preencher todos os campos necessários com as informações relevantes antes de salvar a tarefa."
                    visible={isAvisoVisivel}
                    onClose={handleAvisoClose}
                />
            )}

            <div style={{display:'flex', justifyContent: 'space-between'}}> 

                <div>
                    <Button 
                        type="primary"
                        icon={<FaLink />}
                        ghost
                        onClick={() => setIsModalVincularIteracaoVisivel(true)}
                        disabled={tarefasSelecionadas.length > 0 ? false : true}
                    > 
                        Vincular Iteração
                    </Button>

                </div>

                <div style={{display:'flex', justifyContent: 'flex-end', gap: '10px'}}> 
                    <Button 
                        icon={<FaPlus />}
                        type="primary"
                        onClick={handleAdicionarTarefa}
                        disabled={isBtnPlusDisabled}
                    >
                        Criar Tarefa
                    </Button>

                    <Button
                        icon={<FaTrash />}
                        type="primary"
                        danger
                        disabled={isBtnTrashDisabled}
                        onClick={handleExcluirTarefas}
                    >
                        Excluir
                    </Button>

                    <Button
                        icon={<BsQuestionCircle />}
                        onClick={handleDuvidaClick}
                    />
                </div>
            </div>


            { isFormSalvarVisivel ? (
                <div className="global-div">
                    {isSaving && ( 
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Spin size="large" />
                        </div>
                    )}
                    <FormTarefa onSubmit={handleSalvarTarefa} onCancel={handleCancelar}  />
                </div>
            ) : (
                <div> 
                    <Tabs defaultActiveKey="1" tabPosition="left" style={{ marginTop: '50px' }}>
                        <TabPane tab="Criadas" key="1">
                            <TableTarefasSelect 
                                tasks={tasksCriadas} 
                                onEdit={handleAtualizarTarefa} 
                                onDelete={handleExcluirTarefa} 
                                onView={handleVisualizarTarefa}
                                onPause={handlePauseTarefa} 
                                onStart={handleStartTarefa}
                            />
                        </TabPane>
                        <TabPane tab="Em andamento" key="2">
                            <TableTarefasSelect 
                                tasks={tasksEmAndamento} 
                                onEdit={handleAtualizarTarefa} 
                                onDelete={handleExcluirTarefa} 
                                onView={handleVisualizarTarefa} 
                                onPause={handlePauseTarefa} 
                                onStart={handleStartTarefa}
                            />
                        </TabPane>
                        <TabPane tab="Em revisão" key="3">
                            <TableTarefasSelect 
                                tasks={tasksPendentesRevisao} 
                                onEdit={handleAtualizarTarefa} 
                                onDelete={handleExcluirTarefa} 
                                onView={handleVisualizarTarefa}
                                onPause={handlePauseTarefa} 
                                onStart={handleStartTarefa} 
                            />
                        </TabPane>
                        <TabPane tab="Concluídas" key="4">
                            <TableTarefasSelect 
                                tasks={tasksConcluidas} 
                                onEdit={handleAtualizarTarefa} 
                                onDelete={handleExcluirTarefa} 
                                onView={handleVisualizarTarefa}
                                onPause={handlePauseTarefa} 
                                onStart={handleStartTarefa}  
                            />
                        </TabPane>
                        <TabPane tab="Atrasadas" key="5">
                            <TableTarefasSelect 
                                tasks={tasksAtrasadas} 
                                onEdit={handleAtualizarTarefa} 
                                onDelete={handleExcluirTarefa} 
                                onView={handleVisualizarTarefa}
                                onPause={handlePauseTarefa} 
                                onStart={handleStartTarefa}  
                            />
                        </TabPane>
                        <TabPane tab="Todas" key="6">
                            <TableTarefasSelect 
                                tasks={tarefas} 
                                onEdit={handleAtualizarTarefa} 
                                onDelete={handleExcluirTarefa} 
                                onView={handleVisualizarTarefa}
                                onPause={handlePauseTarefa} 
                                onStart={handleStartTarefa}
                            />
                        </TabPane>
                    </Tabs>
                </div>

            )}

            <ModalVincularIteracao
                visible={isModalVincularIteracaoVisivel}
                onCancel={handleCancelar}
                onUpdate={handleVincularIteracaoAsTarefas}
            />
        </div>
    )
}   

export default QuadroTarefas;
