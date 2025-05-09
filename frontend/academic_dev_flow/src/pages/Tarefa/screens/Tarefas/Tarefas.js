import { Breadcrumb, Button, Input, Modal, Space, Spin, Tabs } from "antd";
import Item from "antd/es/list/Item";
import React, { useEffect, useState } from "react";
import { FaCalendar, FaListUl, FaPlus, FaTasks } from "react-icons/fa";
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
import { TbLayoutCards, TbLayoutCardsFilled, TbLayoutList, TbLayoutNavbar, TbSettingsAutomation } from "react-icons/tb";
import { LuCalendarDays } from "react-icons/lu";
import ScreenDrawerComments from "../DrawerComments";
import SpinLoading from "../../../../components/SpinLoading/SpinLoading";
import ListTask from "../../components/ListTask/ListTask";
import { MdFilterAlt, MdViewKanban } from "react-icons/md";
import Section from "../../../../components/Section/Section";
import SectionHeader from "../../../../components/SectionHeader/SectionHeader";
import SectionFilters from "../../../../components/SectionFilters/SectionFilters";
import SectionContent from "../../../../components/SectionContent/SectionContent";
import { HomeOutlined } from "@ant-design/icons";

const {Search} = Input 

const Tarefas = ({grupo}) => {

    const [isFormVisible, setIsFormVisible] = useState(false)   
    const [isTabsVisible, setIsTabsVisible] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const {dadosTarefa, setDadosTarefa, tarefas, setTarefas, acaoForm, setAcaoForm} = useContextoTarefa()
    const {usuario} = useContextoGlobalUser()
    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()
    const [isDrawerCommentsVisible, setIsDrawerCommentsVisible] = useState(false)

    const handleShowDrawerComments = () => {
        setIsDrawerCommentsVisible(true)
    }

    const handleCloseDrawerComments = () => {
        setIsDrawerCommentsVisible(false)
    }

    const handleExibirComentarios = (record) => {
        setDadosTarefa(record)
        handleShowDrawerComments()
        
    }

    const handleBuscarTarefasDosProjetosDoMembro = async () => {
        const response = await listarTarefasDosProjetosDoMembro(usuario.id)

        if(!response.error && !response.empty){
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

    const handleFiltrarTarefaPeloNome = async (value) => {
        if (value){
            const response = await listarTarefasDosProjetosDoMembro(usuario.id);
            const tarefasFiltradas = response.data.filter(tarefa =>
                tarefa.nome.toLowerCase().includes(value.toLowerCase())
            );
            setTarefas(tarefasFiltradas)
        } else {
            await handleBuscarTarefasDosProjetosDoMembro(usuario.id)
        }
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
        
        if (dadosForm['sicronizar-github']) {
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
                    await handleReload()

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
        <Section>
            {isDrawerCommentsVisible && <ScreenDrawerComments 
                isDrawerVisible={isDrawerCommentsVisible} 
                closeDrawer={handleCloseDrawerComments} 
            />}

            <SectionHeader>
                
                <Breadcrumb
                    items={[
                        {
                            href: `/academicflow/${grupo}/home`,
                            title: <HomeOutlined />,
                        },
                        {
                            href: `/academicflow/${grupo}/tarefas`,
                            title: 'Tarefas',
                        },
                        ...(isFormVisible && acaoForm === 'criar'
                            ? [{ title: 'Cadastrar' }]
                            : []),
                        ...(isFormVisible && acaoForm === 'atualizar'
                            ? [{ title: 'Atualizar' }]
                            : []),
                    ]}
                />

                {!isFormVisible && (
                    <Button
                        onClick={() => handleAdicionarTarefa()} 
                        type="primary" 
                        icon={<FaPlus />}> 
                        Criar Tarefa 
                    </Button>
                )}
            </SectionHeader>

            {!isFormVisible && (
                <SectionFilters>
                    <Input
                        style={{width: '500px'}}
                        placeholder="pesquise pelo nome"
                        name="nome"
                        onChange={(event) => handleFiltrarTarefaPeloNome(event.target.value)}
                    />
                    <FormFiltrarTarefas idMembro={usuario.id} onChange={handleFiltrarTarefas}/>
                </SectionFilters>
            )}
            

            <SectionContent>
                { isFormVisible && (
                    <div> 
                        {isLoading && ( 
                            <SpinLoading />
                        )}
                        
                        <FormTarefa 
                            selectProject={<SelecionarProjeto idMembro={usuario.id}/>} 
                            onSubmit={handleSalvarTarefa} 
                            onCancel={handleCancelar} 
                        />
                    </div>
                )}

                { isTabsVisible && (
                    <Tabs
                        size="middle"
                        indicator={{align: "center"}}
                    > 
                        <Item tab={<span> <TbLayoutNavbar /> Tabela </span>} key="1" >
                            <TableTask 
                                onUpdate={handleAtualizarTarefa} 
                                onDelete={handleExcluirTarefa}
                                onPauseTarefa={handlePararContagemTempoTarefa}
                                onStartTarefa={handleIniciarContagemTempoTarefa}
                                onShowComments={handleExibirComentarios}
                            />
                        </Item>

                        <Item tab={<span><TbLayoutCards /> Quadro</span>} key="2" >
                            <TaskBoard 
                                onCreate={handleAdicionarTarefa}
                                onUpdate={handleAtualizarTarefa} 
                                onDelete={handleExcluirTarefa}
                                onPauseTarefa={handlePararContagemTempoTarefa}
                                onStartTarefa={handleIniciarContagemTempoTarefa}
                                onShowComments={handleExibirComentarios}
                            />
                        </Item>
                        <Item tab={<span> <TbLayoutList /> Lista </span>} key="3" >
                            <ListTask 
                                onUpdate={handleAtualizarTarefa} 
                                onDelete={handleExcluirTarefa}
                                onPauseTarefa={handlePararContagemTempoTarefa}
                                onStartTarefa={handleIniciarContagemTempoTarefa}
                                onShowComments={handleExibirComentarios}
                            />
                        </Item>
                        
                    </Tabs>

                )}
            </SectionContent>
        </Section>
    )
}

export default Tarefas