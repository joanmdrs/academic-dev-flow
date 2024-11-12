import { Button, Input, Tooltip, Modal, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { TbCalendarUp } from "react-icons/tb";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa6";
import { MdSortByAlpha } from "react-icons/md";
import { NotificationManager } from "react-notifications";
import { atualizarArtefato, criarArtefato, excluirArtefato, listarArtefatosPorProjeto } from "../../../../../../services/artefatoService";
import SpinLoading from "../../../../../../components/SpinLoading/SpinLoading";
import { useContextoGlobalProjeto } from "../../../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { useContextoArtefato } from "../../../../../Artefato/context/ContextoArtefato";
import { handleError } from "../../../../../../services/utils";
import { createContent, updateContent } from "../../../../../../services/githubIntegration";
import DrawerComments from "../../../../../Artefato/screens/DrawerComments/DrawerComments";
import FormArtefato from "../../../../../Artefato/components/FormArtefato/FormArtefato";
import GridArtefatos from "../../../../../Artefato/components/GridArtefatos/GridArtefatos";
import TableArtefatos from "../../../../../Artefato/components/TableArtefatos/TableArtefatos";

const {TabPane} = Tabs
const { Search } = Input

const Artefatos = () => {

    const {dadosProjeto} = useContextoGlobalProjeto()
    const {artefatos, setArtefatos, dadosArtefato, setDadosArtefato} = useContextoArtefato()
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [isGridVisible, setIsGridVisible] = useState(true)
    const [actionForm, setActionForm] = useState('create')
    const [isLoading, setIsLoading] = useState(false)
    const [isDrawerCommentsVisible, setIsDrawerCommentsVisible] = useState(false)

    const handleShowDrawerComments = () => {
        setIsDrawerCommentsVisible(true)
    }

    const handleCloseDrawerComments = () => {
        setIsDrawerCommentsVisible(false)
    }

    const handleExibirComentarios = (record) => {
        handleShowDrawerComments()
        setDadosArtefato(record)
    }

    const handleBuscarArtefatosPorProjeto = async () => {
        const response = await listarArtefatosPorProjeto(dadosProjeto.id)

        if (!response.error){
            setArtefatos(response.data)
        }
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                if (dadosProjeto){
                    await handleBuscarArtefatosPorProjeto()
                }
            } catch (error) {
                return handleError('Falha ao tentar buscar os artefatos !')
            }
        }

        fetchData()
    }, [dadosProjeto])

    const handleReload = async () => {
        setIsFormVisible(false)
        setIsGridVisible(true)
        await handleBuscarArtefatosPorProjeto()
    }

    const handleCancelar = () => {
        setIsFormVisible(false)
        setIsGridVisible(true)
    }

    const handleAdicionarArtefato = () => {
        setIsFormVisible(true)
        setIsGridVisible(false)
        setDadosArtefato(null)  
        setActionForm('create')
    }

    const handleAtualizarArtefato = async (record) => {
        setIsFormVisible(true)
        setIsGridVisible(false)
        setActionForm('update')
        setDadosArtefato(record)
    }

    const handleSaveContent = async (dadosForm) => {
        if (!dadosProjeto.token || !dadosProjeto.nome_repo) {
            NotificationManager.info('Não é possível sincronizar com o GitHub. O projeto não possui token ou repositório configurado.');
            return { error: 'Projeto sem token ou repositório configurado' };
        }
    
        const dadosEnviar = {
            github_token: dadosProjeto.token,
            repository: dadosProjeto.nome_repo,
            path: dadosForm.path_content,
            content: dadosForm.descricao,
            commit_message: "Criando arquivo"
        };

        if (actionForm === 'create') {
            const response = await createContent(dadosEnviar)
            return response
        } else if (actionForm === 'update' && !dadosArtefato.id_content){
            const response = await createContent(dadosEnviar)
            return response
        } else if (actionForm === 'update' && dadosArtefato.path_content){
            const response = await updateContent(dadosEnviar);
            return response
        }
    }

    const handleSalvarArtefato = async (dadosForm) => {
        setIsLoading(true);
        
        dadosForm.projeto = dadosProjeto.id;
        
        if (dadosForm['sicronizar-github']) {
            const resContent = await handleSaveContent(dadosForm);
    
            if (resContent.error) {
                setIsLoading(false);
                return;
            }
            dadosForm['id_file'] = resContent.data.sha
    
        }
    
        try {
            if (actionForm === 'create') {
                await criarArtefato(dadosForm);
            } else {
                await atualizarArtefato(dadosArtefato.id, dadosForm);
            }
            handleReload();
    
        } catch (error) {
            NotificationManager.error('Erro ao salvar a tarefa');
        }
        
        setIsLoading(false);
    };

    const handleOrdenarArtefatosDeAaZ = () => {
        const artefatosOrdenados = [...artefatos].sort((a, b) => {
            return a.nome.localeCompare(b.nome);
        });
        setArtefatos(artefatosOrdenados);
    };

    const handleOrdenarArtefatosPorData = () => {
        const artefatosOrdenadosPorData = [...artefatos].sort((a, b) => {
            return new Date(a.data_termino) - new Date(b.data_termino);
        });
        setArtefatos(artefatosOrdenadosPorData);
    };


    const handleExcluirArtefato = async (id) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir este artefato ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                setIsLoading(true);
                try {
                    await excluirArtefato([id]);
                    await handleReload()

                } catch (error) {
                    NotificationManager.error('Falha ao tentar excluir o artefato');
                } 
                setIsLoading(false);
            }
        });
    };

    const handleBuscarArtefatosPeloNome = async (value) => {
        if (value){
            const response = await listarArtefatosPorProjeto(dadosProjeto.id);
            const artefatosFiltrados = response.data.filter(artefato =>
                artefato.nome.toLowerCase().includes(value.toLowerCase())
            );
            setArtefatos(artefatosFiltrados)
        } else {
            await handleBuscarArtefatosPorProjeto()
        }
    }
    
    return (
        <div> 
            {isDrawerCommentsVisible && < DrawerComments
                isDrawerVisible={isDrawerCommentsVisible} 
                closeDrawer={handleCloseDrawerComments} 
            />}

            { !isFormVisible && (
                <div className="df jc-between pa-t-20 pa-b-20" style={{borderBottom: '1px solid #ddd'}}> 
                    <div className="df g-10">
                        <Search
                            style={{width: '500px'}}
                            placeholder="pesquise pelo nome"
                            allowClear
                            enterButton="Pesquisar"
                            size="middle"
                            onSearch={handleBuscarArtefatosPeloNome}
                        />

                        <Tooltip title="Ordenar de A a Z">
                            <Button 
                                onClick={() => handleOrdenarArtefatosDeAaZ()}
                            >
                                <MdSortByAlpha />
                            </Button>
                        </Tooltip>

                        <Tooltip title="Ordenar em ordem crescente">
                            <Button onClick={() => handleOrdenarArtefatosPorData()}>
                                <TbCalendarUp />
                            </Button>
                        </Tooltip>
                    </div>

                    <Button
                        onClick={() => handleAdicionarArtefato()} 
                        type="primary" 
                        icon={<FaPlus />}> 
                        Criar Artefato 
                    </Button>
                </div>
            )}

            <div>

                { isFormVisible && 
                    <React.Fragment>
                         {isLoading && ( 
                            <SpinLoading />
                        )}

                        <FormArtefato 
                            onSubmit={handleSalvarArtefato}
                            onCancel={handleCancelar} 
                        />
                    </React.Fragment>
                }

                {
                    isGridVisible && (
                        <div> 
                            <Tabs
                                style={{paddingTop: '10px'}}
                                size="middle"
                                tabPosition="left"
                                indicator={{align: "center"}}
                                defaultActiveKey="2"
                            > 
                                <TabPane style={{padding: '20px'}} tab={ <BsGrid3X3GapFill /> } key="1"  >
                                    <GridArtefatos 
                                        data={artefatos}
                                        onUpdate={handleAtualizarArtefato}
                                        onDelete={handleExcluirArtefato}
                                        onShowComments={handleExibirComentarios}
                                    />
                                </TabPane>
                                <TabPane style={{padding: '20px'}} tab={<FaListUl />} key="2" >
                                    <TableArtefatos 
                                        data={artefatos}
                                        onUpdate={handleAtualizarArtefato}
                                        onDelete={handleExcluirArtefato}
                                        onShowComments={handleExibirComentarios}
                                    />
                                </TabPane>
                                
                            </Tabs>
                        </div>                        
                    )
                }    
            </div>
        </div>
    );
}

export default Artefatos;
