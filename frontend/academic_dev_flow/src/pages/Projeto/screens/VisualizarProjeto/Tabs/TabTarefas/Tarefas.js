import React, { useEffect, useState } from "react";
import ScreenDrawerComments from "../../../../../Tarefa/screens/DrawerComments";
import { Button, Form, Input, Modal, Select, Tabs } from "antd";
import { FaCalendar, FaListUl, FaPlus, FaTasks } from "react-icons/fa";
import SpinLoading from "../../../../../../components/SpinLoading/SpinLoading";
import FormTarefa from "../../../../../Tarefa/components/FormTarefa/FormTarefa";
import TaskBoard from "../../../../../Tarefa/components/TaskBoard/TaskBoard";
import { TbLayoutCards, TbLayoutCardsFilled, TbLayoutList, TbLayoutNavbar } from "react-icons/tb";
import TableTask from "../../../../../Tarefa/components/TableTask/TableTask";
import { LuCalendarDays } from "react-icons/lu";
import FormFiltrarTarefas from "../../../../../Tarefa/components/FormFiltrarTarefas/FormFiltrarTarefas";
import { useContextoGlobalUser } from "../../../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import { useContextoTarefa } from "../../../../../Tarefa/context/ContextoTarefa";
import { atualizarTarefa, criarTarefa, excluirTarefas, iniciarContagemTempo, listarTarefasPorProjeto, pararContagemTempo } from "../../../../../../services/tarefaService";
import { useContextoGlobalProjeto } from "../../../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { buscarMembroProjetoPeloIdMembroEPeloIdProjeto, buscarMembrosPorProjeto } from "../../../../../../services/membroProjetoService";
import { listarCategoriaTarefa } from "../../../../../../services/categoriaTarefaService";
import { handleError } from "../../../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../../../services/messages";
import { NotificationManager } from "react-notifications";
import { createIssue, updateIssue } from "../../../../../../services/githubIntegration/issueService";
import ListTask from "../../../../../Tarefa/components/ListTask/ListTask";
const {TabPane} = Tabs
const {Search} = Input

const Tarefas = () => {

    const {usuario} = useContextoGlobalUser()
    const {dadosProjeto} = useContextoGlobalProjeto()
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [isDrawerCommentsVisible, setIsDrawerCommentsVisible] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isTabsVisible, setIsTabsVisible] = useState(true)
    const {dadosTarefa, setDadosTarefa, tarefas, setTarefas} = useContextoTarefa()
    const [optionsMembros, setOptionsMembros] = useState([])
    const [optionsCategorias, setOptionsCategorias] = useState([])
    const [actionForm, setActionForm] = useState('create')
    
    const handleShowDrawerComments = () => {
        setIsDrawerCommentsVisible(true)
    }

    const handleCloseDrawerComments = () => {
        setIsDrawerCommentsVisible(false)
    }

    const handleListarTarefasPorProjeto = async () => {
        const response = await listarTarefasPorProjeto(dadosProjeto.id)
        if(!response.error){
            setTarefas(response.data)
        }
    }

    const handleBuscarMembrosPorProjeto = async () => {
        const response = await buscarMembrosPorProjeto(dadosProjeto.id)
        if(!response.error){
            const resultados = response.data.map(item => ({
                value: item.id,
                label: `${item.nome_membro} (${item.nome_grupo})`,
                user: item.usuario_github,
            }));
            setOptionsMembros(resultados);
        }
    }
    
    const handleBuscarCategorias = async () => {
        try {
            const response = await listarCategoriaTarefa();
            if (!response.error && response.data) {
                const resultados = response.data.map((item) => ({
                    value: item.id,
                    label: item.nome
                }));
                setOptionsCategorias(resultados);
            }
        } catch (error) {
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto){
                await handleListarTarefasPorProjeto()
                await handleBuscarMembrosPorProjeto()
                await handleBuscarCategorias()
            }
        }

        fetchData()
    }, [dadosProjeto])

    const handleCancelar = () => {
        setIsFormVisible(false)
        setIsTabsVisible(true)
    }


    const handleReload = async () => {
        setIsFormVisible(false)
        setIsTabsVisible(true)
        setDadosTarefa(null)
        await handleListarTarefasPorProjeto()

    }

    const handleFiltrarTarefaPeloNome = async (value) => {
        if (value){
            const response = await listarTarefasPorProjeto(dadosProjeto.id);
            const tarefasFiltradas = response.data.filter(tarefa =>
                tarefa.nome.toLowerCase().includes(value.toLowerCase())
            );
            setTarefas(tarefasFiltradas)
        } else {
            await listarTarefasPorProjeto()
        }
    }

    const handleAdicionarTarefa = () => {
        setIsFormVisible(true)
        setIsTabsVisible(false)
        setActionForm('create')
        setDadosTarefa(null)
    }

    const handleAtualizarTarefa = async (record) => {
        setIsFormVisible(true)
        setIsTabsVisible(false)
        setActionForm('update')
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

        if (actionForm === 'create') {
            const response = await createIssue(dadosEnviar)
            return response
        } else if (actionForm === 'update' && !dadosTarefa.number_issue){
            const response = await createIssue(dadosEnviar)
            return response
        } else if (actionForm === 'update' && dadosTarefa.number_issue){
            const response = await updateIssue(dadosTarefa.number_issue, dadosEnviar);
            return response
        }
    };
    
    
    const handleSalvarTarefa = async (dadosForm) => {
        setIsLoading(true);
        
        dadosForm['projeto'] = dadosProjeto.id;
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
            if (actionForm === 'create') {
                await criarTarefa(dadosForm, dadosIssue);
            } else if (actionForm === 'update') {
                await atualizarTarefa(dadosTarefa.id, dadosForm, dadosIssue);
            }
            handleReload();
    
        } catch (error) {
            return handleError(error, 'Falha ao tentar salvar a tarefa')
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

    const handleIniciarContagemTempoTarefa = async (tarefa) => {
        try {
            const sendData = {
                idMembro: usuario.id,
                idProjeto: dadosProjeto.id
            }

            console.log(sendData)
            const response = await buscarMembroProjetoPeloIdMembroEPeloIdProjeto(sendData.idProjeto, sendData.idMembro)

            if (!response.error){
                console.log(response.data)
                await iniciarContagemTempo({
                    id_membro_projeto: response.data.id,
                    id_tarefa: tarefa.id
                })
                await handleListarTarefasPorProjeto()
            }
        } catch (error) {
            return handleError(error, 'Falha ao tentar iniciar a contagem de tempo da tarefa !')
        }
    }

    const handlePararContagemTempoTarefa = async (tarefa) => {
        try {
            const sendData = {
                idMembro: usuario.id,
                idProjeto: dadosProjeto.id
            }
            console.log(sendData)
            const response = await buscarMembroProjetoPeloIdMembroEPeloIdProjeto(sendData.idProjeto, sendData.idMembro)

            if (!response.error){
                console.log(response.data)
                await pararContagemTempo({
                    id_membro_projeto: response.data.id,
                    id_tarefa: tarefa.id
                })
                await handleListarTarefasPorProjeto()
            }
        } catch (error) {
            return handleError(error, 'Falha ao tentar iniciar a contagem de tempo da tarefa !')
        }
    }

    const handleExibirComentarios = (record) => {
        handleShowDrawerComments()
        console.log(record)
        setDadosTarefa(record)
    }

    const handleFiltrarTarefas = async (filters) => {
        try {
            // Chama a API para listar as tarefas de um projeto
            const response = await listarTarefasPorProjeto(dadosProjeto.id);
    
            if (response && response.data) {
                let tarefasFiltradas = response.data;
    
                // Aplica o filtro por membro, se fornecido
                if (filters.membroSelect) {
                    tarefasFiltradas = tarefasFiltradas.filter(
                        tarefa => tarefa.membros?.some(
                            membro => membro === filters.membroSelect
                        )
                    );
                }
    
                // Aplica o filtro por categoria, se fornecido
                if (filters.categoriaSelect) {
                    tarefasFiltradas = tarefasFiltradas.filter(
                        tarefa => tarefa.categoria === filters.categoriaSelect
                    );
                }
    
                // Atualiza o estado com as tarefas filtradas
                setTarefas(tarefasFiltradas);
            } else {
                // Se não houver dados na resposta, define o estado como uma lista vazia
                setTarefas([]);
            }
        } catch (error) {
            // Lida com erros chamando a função handleError
            return handleError(error, 'Falha ao tentar filtrar tarefas');
        }
    };
    
    


    return (
        <div> 

            {isDrawerCommentsVisible && <ScreenDrawerComments 
                isDrawerVisible={isDrawerCommentsVisible} 
                closeDrawer={handleCloseDrawerComments} 
            />}

            { !isFormVisible && (
                <div className="df jc-between pa-t-20 pa-b-20" style={{borderBottom: '1px solid #ddd'}}>  
                    <div className="df g-20"> 
                        <Search
                            style={{width: '500px'}}
                            placeholder="pesquise pelo nome"
                            allowClear
                            enterButton="Pesquisar"
                            onSearch={handleFiltrarTarefaPeloNome}
                        />

                        <Form 
                            style={{display: 'flex', gap: '10px'}} 
                            onValuesChange={(changedValues, allValues) => handleFiltrarTarefas(allValues)}
                        > 
                            <Form.Item name="membroSelect">
                                <Select
                                    showSearch
                                    allowClear
                                    placeholder="Membro"
                                    optionFilterProp="children"
                                    options={optionsMembros}
                                    popupMatchSelectWidth={false}
                                />
                            </Form.Item>

                            <Form.Item name="categoriaSelect">
                                <Select
                                    showSearch
                                    allowClear
                                    placeholder="Categoria"
                                    optionFilterProp="children"
                                    options={optionsCategorias}
                                    
                                    popupMatchSelectWidth={false}
                                />
                            </Form.Item>                           

                        </Form>

                        
                    </div>
                    <Button
                        onClick={() => handleAdicionarTarefa()} 
                        type="primary" 
                        size="large"
                        icon={<FaPlus />}> 
                        Criar Tarefa 
                    </Button>

                </div>  
            )}
        
            <div>
                 {isFormVisible  && (
                    <React.Fragment>
                        {isLoading && ( 
                            <SpinLoading />
                        )}

                        <FormTarefa 
                            onSubmit={handleSalvarTarefa} 
                            onCancel={handleCancelar} 
                        />

                    </React.Fragment>
                )}
            
                { isTabsVisible && (
                    <Tabs
                        size="middle"
                        indicator={{align: "center"}}
                    > 
                        <TabPane tab={<span><TbLayoutCards /> Quadro</span>} key="1" >
                            <TaskBoard 
                                onCreate={handleAdicionarTarefa}
                                onUpdate={handleAtualizarTarefa} 
                                onDelete={handleExcluirTarefa}
                                onPauseTarefa={handlePararContagemTempoTarefa}
                                onStartTarefa={handleIniciarContagemTempoTarefa}
                                onShowComments={handleExibirComentarios}
                            />
                        </TabPane>

                        <TabPane tab={<span><TbLayoutList /> Quadro</span>} key="2" >
                            <ListTask  
                                onUpdate={handleAtualizarTarefa} 
                                onDelete={handleExcluirTarefa}
                                onPauseTarefa={handlePararContagemTempoTarefa}
                                onStartTarefa={handleIniciarContagemTempoTarefa}
                                onShowComments={handleExibirComentarios}
                            />
                        </TabPane>

                        
                        <TabPane tab={<span> <TbLayoutNavbar /> Tabela </span>} key="3" >
                            <TableTask 
                                onUpdate={handleAtualizarTarefa} 
                                onDelete={handleExcluirTarefa}
                                onPauseTarefa={handlePararContagemTempoTarefa}
                                onStartTarefa={handleIniciarContagemTempoTarefa}
                                onShowComments={handleExibirComentarios}
                            />
                        </TabPane>
                       
                    </Tabs>
                )}



            </div>
        </div>
    )
}

export default Tarefas