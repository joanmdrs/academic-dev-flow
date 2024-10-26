import { Button, Modal, Space, Spin, Tabs } from "antd";
import Item from "antd/es/list/Item";
import React, { useEffect, useState } from "react";
import { FaPlus, FaTasks } from "react-icons/fa";
import TableTask from "../../components/TableTask/TableTask";
import TaskBoard from "../../components/TaskBoard/TaskBoard";
import { useContextoTarefa } from "../../context/ContextoTarefa";
import FormTarefa from "../../components/FormTarefa/FormTarefa";
import SelecionarProjeto from "../../components/SelecionarProjeto/SelecionarProjeto";
import { useContextoGlobalUser } from "../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import { atualizarTarefa, criarTarefa, excluirTarefas, filtrarTarefasPorProjetoEPorMembro, iniciarContagemTempo, listarTarefasDosProjetosDoMembro, pararContagemTempo } from "../../../../services/tarefaService";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import { NotificationManager } from "react-notifications";
import { createIssue, updateIssue } from "../../../../services/githubIntegration/issueService";
import FormFiltrarTarefas from "../../components/FormFiltrarTarefas/FormFiltrarTarefas";
import { buscarMembroProjetoPeloIdMembroEPeloIdProjeto } from "../../../../services/membroProjetoService";
import { handleError } from "../../../../services/utils";
import { GoColumns } from "react-icons/go";
import { GoTable } from "react-icons/go";
import { GoCalendar } from "react-icons/go";

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

const MinhasTarefas = () => {

    const [isFormVisible, setIsFormVisible] = useState(false)   
    const [isTabsVisible, setIsTabsVisible] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const {dadosTarefa, setDadosTarefa, tarefas, setTarefas, acaoForm, setAcaoForm} = useContextoTarefa()
    const {usuario} = useContextoGlobalUser()
    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()

    const handleBuscarTarefasDosProjetosDoMembro = async () => {
        const response = await listarTarefasDosProjetosDoMembro(usuario.id)
        if(!response.error){
            setTarefas(response.data)
        }
    }

    const handleCancelar = () => {
        setIsFormVisible(false)
        setIsTabsVisible(true)
        setDadosProjeto(null)
    }

    const handleReload = async () => {
        setDadosProjeto(null)
        setIsFormVisible(false)
        setIsTabsVisible(true)
        setDadosTarefa(null)
        await handleBuscarTarefasDosProjetosDoMembro()

    }

    const handleBuscarProjeto = async (id) => {
        const response = await buscarProjetoPeloId(id)
        setDadosProjeto(response.data)
    }

    const handleAdicionarTarefa = () => {
        setIsFormVisible(true)
        setIsTabsVisible(false)
        setAcaoForm('criar')
        setDadosTarefa(null)
    }

    const handleAtualizarTarefa = async (record) => {
        await handleBuscarProjeto(record.projeto)
        setIsFormVisible(true)
        setIsTabsVisible(false)
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
    
            dadosIssue = resIssue.data;
        }
    
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

    const handleExcluirTarefa = async (id) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir esta tarefa ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                setIsLoading(true);
                try {
                    await excluirTarefas([id]);
                    handleReload()

                } catch (error) {
                    NotificationManager.error('Falha ao tentar excluir a tarefa');
                } 
                setIsLoading(false);
            }
        });
    };

    const handleFiltrarTarefas = async (formData) => {
        const { membroSelect, projetoSelect } = formData;

        if (!membroSelect && !projetoSelect){
            await handleBuscarTarefasDosProjetosDoMembro()
        } else {
            const response = await filtrarTarefasPorProjetoEPorMembro(formData)
            if (!response.error){
                setTarefas(response.data)
            }
        }

    };
    

    const handleIniciarContagemTempoTarefa = async (tarefa) => {
        try {
            const sendData = {
                idMembro: usuario.id,
                idProjeto: tarefa.projeto
            }
            const response = await buscarMembroProjetoPeloIdMembroEPeloIdProjeto(sendData.idProjeto, sendData.idMembro)

            if (!response.error){
                await iniciarContagemTempo({
                    id_membro_projeto: response.data.id,
                    id_tarefa: tarefa.id
                })
                await handleBuscarTarefasDosProjetosDoMembro()
            }
        } catch (error) {
            return handleError(error, 'Falha ao tentar iniciar a contagem de tempo da tarefa !')
        }
    }

    const handlePararContagemTempoTarefa = async (tarefa) => {
        try {
            const sendData = {
                idMembro: usuario.id,
                idProjeto: tarefa.projeto
            }
            const response = await buscarMembroProjetoPeloIdMembroEPeloIdProjeto(sendData.idProjeto, sendData.idMembro)

            if (!response.error){
                await pararContagemTempo({
                    id_membro_projeto: response.data.id,
                    id_tarefa: tarefa.id
                })
                await handleBuscarTarefasDosProjetosDoMembro()
            }
        } catch (error) {
            return handleError(error, 'Falha ao tentar iniciar a contagem de tempo da tarefa !')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (usuario && usuario.id){
                await handleBuscarTarefasDosProjetosDoMembro()
            }
        }

        fetchData()
    }, [usuario])

    return (
        <div className="bloco-principal"> 
            <div style={{
                borderBottom: '1px solid #ddd',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                padding: '20px'
            }}> 
                <Space>
                    <h3> TAREFAS </h3>
                </Space>

                <Space>
                    <Button onClick={() => handleAdicionarTarefa()} type="primary" ghost icon={<FaPlus />}> Criar Tarefa </Button>
                </Space>

            </div>

            <div style={{
                backgroundColor: '#FFFFFF',
                padding: '20px',
                minHeight: '100vh'
            }}>
                 {isFormVisible  && (
                    <React.Fragment>
                        {isLoading && ( 
                            <div style={StyleSpin}>
                                <Spin size="large" />
                            </div>
                        )}

                        <div className="global-div">
                            <FormTarefa 
                                selectProject={<SelecionarProjeto />} 
                                onSubmit={handleSalvarTarefa} 
                                onCancel={handleCancelar} 
                            />
                        </div>

                    </React.Fragment>
                )}

            

            
                { isTabsVisible && (
                    <Tabs
                        tabBarExtraContent={
                            <FormFiltrarTarefas idMembro={usuario.id} onChange={handleFiltrarTarefas}/>
                        }
                        size="middle"
                        indicator={{align: "center"}}
                    > 
                        <Item tab={<span><GoColumns /> Quadro</span>} key="1"  >
                            <TaskBoard 
                                tarefas={tarefas} 
                                onCreate={handleAdicionarTarefa}
                                onUpdate={handleAtualizarTarefa} 
                                onDelete={handleExcluirTarefa}
                                onPauseTarefa={handlePararContagemTempoTarefa}
                                onStartTarefa={handleIniciarContagemTempoTarefa}
                            />
                        </Item>
                        <Item tab={<span> <GoTable /> Tabela </span>} key="2" >
                            <TableTask 
                                tarefas={tarefas} 
                                onUpdate={handleAtualizarTarefa} 
                                onDelete={handleExcluirTarefa}
                                onPauseTarefa={handlePararContagemTempoTarefa}
                                onStartTarefa={handleIniciarContagemTempoTarefa}
                            />
                        </Item>
                        <Item tab={<span> <GoCalendar /> Calendário </span>} key="3" >
                           {/* <CalendarTask tarefas={tarefas} /> */}
                        </Item>
                    </Tabs>
                )}



            </div>
        </div>
    )
}

export default MinhasTarefas