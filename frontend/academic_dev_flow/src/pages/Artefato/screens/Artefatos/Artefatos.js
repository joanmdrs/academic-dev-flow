import { Button, Space, Input, Tooltip, Modal, Flex, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { TbCalendarUp } from "react-icons/tb";
import FormFilterArtefatos from "../../components/FormFilterArtefatos/FormFilterArtefatos";
import { MdFilterAlt, MdSortByAlpha } from "react-icons/md";
import GridArtefatos from "../../components/GridArtefatos/GridArtefatos";
import { atualizarArtefato, criarArtefato, excluirArtefato, filtrarArtefatosPorProjetoEPorMembro, listarArtefatosDosProjetosDoMembro } from "../../../../services/artefatoService";
import { useContextoGlobalUser } from "../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import { handleError } from "../../../../services/utils";
import { useContextoArtefato } from "../../context/ContextoArtefato";
import FormArtefato from "../../components/FormArtefato/FormArtefato";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { NotificationManager } from "react-notifications";
import { createContent, updateContent } from "../../../../services/githubIntegration";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import SelecionarProjeto from "../../components/SelecionarProjeto/SelecionarProjeto";
import DrawerComments from "../DrawerComments/DrawerComments";
import TableArtefatos from "../../components/TableArtefatos/TableArtefatos";
import SpinLoading from "../../../../components/SpinLoading/SpinLoading";
import { LuLayout, LuLayoutGrid, LuLayoutList } from "react-icons/lu";
import ListArtefatos from "../../components/ListArtefatos/ListArtefatos";

const {TabPane} = Tabs
const { Search } = Input;

const Artefatos = () => {
    const {usuario} = useContextoGlobalUser()
    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()
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

    const handleBuscarArtefatosDosProjetosDoMembro = async () => {
        const response = await listarArtefatosDosProjetosDoMembro(usuario.id)

        if (!response.error && !response.empty){
            setArtefatos(response.data)
        }
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                if (usuario && usuario.id){
                    await handleBuscarArtefatosDosProjetosDoMembro(usuario.id)
                }
            } catch (error) {
                return handleError('Falha ao tentar buscar os artefatos !')
            }
        }

        fetchData()
    }, [usuario])

    const handleReload = async () => {
        setIsFormVisible(false)
        setIsGridVisible(true)
        await handleBuscarArtefatosDosProjetosDoMembro()
    }

    const handleCancelar = () => {
        setIsFormVisible(false)
        setIsGridVisible(true)
    }

    const handleBuscarProjeto = async (id) => {
        const response = await buscarProjetoPeloId(id)
        setDadosProjeto(response.data)
    }

    const handleAdicionarArtefato = () => {
        setIsFormVisible(true)
        setIsGridVisible(false)
        setDadosArtefato(null)  
        setActionForm('create')

    }

    const handleAtualizarArtefato = async (record) => {
        await handleBuscarProjeto(record.projeto)
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
    
    const handleFiltrarArtefatos = async (formData) => {
        const { membroSelect, projetoSelect } = formData;

        if (!membroSelect && !projetoSelect){
            await handleBuscarArtefatosDosProjetosDoMembro()
        } else {
            const response = await filtrarArtefatosPorProjetoEPorMembro(formData)
            if (!response.error){
                setArtefatos(response.data)
            }
        }
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
                    handleReload()

                } catch (error) {
                    NotificationManager.error('Falha ao tentar excluir o artefato');
                } 
                setIsLoading(false);
            }
        });
    };

    const handleBuscarArtefatosPeloNome = async (value) => {
        if (value){
            const response = await listarArtefatosDosProjetosDoMembro(usuario.id);
            const artefatosFiltrados = response.data.filter(artefato =>
                artefato.nome.toLowerCase().includes(value.toLowerCase())
            );
            setArtefatos(artefatosFiltrados)
        } else {
            await handleBuscarArtefatosDosProjetosDoMembro()
        }
    }
    
    
    return (
        <div className="content"> 

            {isDrawerCommentsVisible && < DrawerComments
                isDrawerVisible={isDrawerCommentsVisible} 
                closeDrawer={handleCloseDrawerComments} 
            />}

            <div style={{
                borderBottom: '1px solid #ddd',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between'
            }}> 
               <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <h2 style={{margin: 0, fontFamily: 'Poppins, sans-serif', fontWeight: '600'}}> Artefatos </h2>
                </div>

                <div>
                    <Button
                        size="large" 
                        onClick={() => handleAdicionarArtefato()} 
                        type="primary" 
                        ghost 
                        icon={<FaPlus />}> 
                        Criar Artefato 
                    </Button>
                </div>
            </div>
            
            {isFormVisible && (
                <div className="pa-20"> 
                    {isLoading && ( 
                            <SpinLoading />
                        )}
                    
                        <FormArtefato 
                            onSubmit={handleSalvarArtefato}
                            selectProjeto={<SelecionarProjeto idMembro={usuario.id} />} 
                            onCancel={handleCancelar} 
                        />            

                </div>
            )}

            { isGridVisible && (
                <div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        padding: '20px',
                        borderBottom: '1px solid #DDD'
                    }}>
                        <Flex horizontal gap="middle">
                            <Space>
                                <div> 
                                    <p 
                                        style={{
                                            color: "var(--border-color)", 
                                            display: 'flex', 
                                            alignItems: 'center'
                                        }}
                                    > <MdFilterAlt size={"20px"} /> Filtros </p>
                                </div>
                            </Space>
                            <Space>
                                <Input 
                                    style={{width: "500px"}}
                                    name="nome"
                                    placeholder="Pesquise pelo nome do artefato"
                                    onChange={(event) => handleBuscarArtefatosPeloNome(event.target.value)}
                                />
                            </Space>

                            <Space>
                                <FormFilterArtefatos idMembro={usuario.id} onChange={handleFiltrarArtefatos} />
                            </Space>
                            
                        </Flex>
                        
                        <Flex horizontal gap="middle">
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
                        </Flex>
                    </div>
                    <div style={{padding: '20px'}}> 
                        <Tabs
                            style={{paddingTop: '10px'}}
                            size="middle"
                            tabPosition="top"
                            indicator={{align: "center"}}
                            defaultActiveKey="2"
                        > 
                            <TabPane 
                                style={{padding: '20px'}} 
                                tab={<Space> <LuLayoutGrid /> Grid </Space> } 
                                key="1"
                            >
                                <GridArtefatos 
                                    data={artefatos}
                                    onCreate={handleAdicionarArtefato}
                                    onUpdate={handleAtualizarArtefato}
                                    onDelete={handleExcluirArtefato}
                                    onShowComments={handleExibirComentarios}
                                />
                            </TabPane>

                            <TabPane 
                                style={{padding: '20px'}} 
                                tab={<Space> <LuLayoutList /> Lista </Space> } 
                                key="2"
                            >
                                <ListArtefatos 
                                    data={artefatos}
                                    onUpdate={handleAtualizarArtefato}
                                    onDelete={handleExcluirArtefato}
                                    onShowComments={handleExibirComentarios}
                                />
                            </TabPane>


                            <TabPane 
                                style={{padding: '20px'}} 
                                tab={<Space> <LuLayout /> Tabela </Space>} 
                                key="3" 
                            >
                                <TableArtefatos 
                                    data={artefatos}
                                    onUpdate={handleAtualizarArtefato}
                                    onDelete={handleExcluirArtefato}
                                    onShowComments={handleExibirComentarios}
                                />
                            </TabPane>
                            
                        </Tabs>
                    </div>                        
                </div>
            )}            
        </div>
    );
}

export default Artefatos;
