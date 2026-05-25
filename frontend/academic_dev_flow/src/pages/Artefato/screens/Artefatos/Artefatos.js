import { Button, Space, Input, Modal, Flex, Tabs, Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import FormFilterArtefatos from "../../components/FormFilterArtefatos/FormFilterArtefatos";
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
import Section from "../../../../components/Section/Section";
import SectionHeader from "../../../../components/SectionHeader/SectionHeader";
import SectionFilters from "../../../../components/SectionFilters/SectionFilters";
import SectionContent from "../../../../components/SectionContent/SectionContent";
import { HomeOutlined } from "@ant-design/icons";
import { useAuth } from "../../../../hooks/AuthProvider";
import { buscarMembroPeloUser } from "../../../../services/membroService";

const {TabPane} = Tabs

const Artefatos = () => {
    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()
    const {artefatos, setArtefatos, dadosArtefato, setDadosArtefato} = useContextoArtefato()
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [actionForm, setActionForm] = useState('create')
    const [isLoading, setIsLoading] = useState(false)
    const [isDrawerCommentsVisible, setIsDrawerCommentsVisible] = useState(false)
    const {user} = useAuth()
    const [membro, setMembro] = useState(null)

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

    const handleBuscarArtefatosDosProjetosDoMembro = async (idMembro) => {
        if (!idMembro) return;

        const response = await listarArtefatosDosProjetosDoMembro(idMembro);

        if (!response.error && !response.empty) {
            setArtefatos(response.data);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user?.id) {
                    const resMembro = await buscarMembroPeloUser(user.id);
                    const membroData = resMembro.data;

                    setMembro(membroData);

                    await handleBuscarArtefatosDosProjetosDoMembro(membroData.id);
                }
            } catch (error) {
                handleError(error, "Falha ao tentar buscar os artefatos!");
            }
        };

        fetchData();
    }, [user]);

    const handleReload = async () => {
        setIsFormVisible(false);

        if (membro?.id) {
            await handleBuscarArtefatosDosProjetosDoMembro(membro.id);
        }
    };

    const handleCancelar = () => {
        setIsFormVisible(false)
    }

    const handleBuscarProjeto = async (id) => {
        const response = await buscarProjetoPeloId(id)
        setDadosProjeto(response.data)
    }

    const handleAdicionarArtefato = () => {
        setIsFormVisible(true)
        setDadosArtefato(null)  
        setActionForm('create')

    }

    const handleAtualizarArtefato = async (record) => {
        await handleBuscarProjeto(record.projeto)
        setIsFormVisible(true)
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

    // const handleOrdenarArtefatosDeAaZ = () => {
    //     const artefatosOrdenados = [...artefatos].sort((a, b) => {
    //         return a.nome.localeCompare(b.nome);
    //     });
    //     setArtefatos(artefatosOrdenados);
    // };

    // const handleOrdenarArtefatosPorData = () => {
    //     const artefatosOrdenadosPorData = [...artefatos].sort((a, b) => {
    //         return new Date(a.data_termino) - new Date(b.data_termino);
    //     });
    //     setArtefatos(artefatosOrdenadosPorData);
    // };
    
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
            const response = await listarArtefatosDosProjetosDoMembro(membro.id);
            const artefatosFiltrados = response.data.filter(artefato =>
                artefato.nome.toLowerCase().includes(value.toLowerCase())
            );
            setArtefatos(artefatosFiltrados)
        } else {
            handleBuscarArtefatosDosProjetosDoMembro(membro.id)
        }
    }
    
    
    return (
        <Section> 

            {isDrawerCommentsVisible && < DrawerComments
                isDrawerVisible={isDrawerCommentsVisible} 
                closeDrawer={handleCloseDrawerComments} 
            />}

            <SectionHeader>
                <Breadcrumb
                    items={[
                        {
                            href: `/academicflow/home`,
                            title: <HomeOutlined />,
                        },
                        {
                            href: `/academicflow/artefatos`,
                            title: 'Artefatos',
                        },
                        ...(isFormVisible && actionForm === 'create'
                            ? [{ title: 'Cadastrar' }]
                            : []),
                        ...(isFormVisible && actionForm === 'update'
                            ? [{ title: 'Atualizar' }]
                            : []),
                    ]}
                />
                {!isFormVisible && (
                    <Button
                        onClick={() => handleAdicionarArtefato()} 
                        type="primary" 
                        icon={<FaPlus />}> 
                        Criar Artefato 
                    </Button>
                )}
            </SectionHeader>

            {!isFormVisible && (
                <SectionFilters>
                    <Space>
                        <Input 
                            style={{width: "500px"}}
                            name="nome"
                            placeholder="Pesquise pelo nome do artefato"
                            onChange={(event) => handleBuscarArtefatosPeloNome(event.target.value)}
                        />
                    </Space>

                    <Space>
                        {membro && (
                            <FormFilterArtefatos
                                idMembro={membro.id}
                                onChange={handleFiltrarArtefatos}
                            />
                        )}
                    </Space>

                </SectionFilters>
            )}

            <SectionContent>
                {isFormVisible && (
                    <>
                        {isLoading && ( 
                            <SpinLoading />
                        )}
                    
                        {membro && (
                            <FormArtefato
                                onSubmit={handleSalvarArtefato}
                                selectProjeto={<SelecionarProjeto idMembro={membro.id} />}
                                onCancel={handleCancelar}
                            />
                        )}
                    </>
                )}
                

                {!isFormVisible && (
                    <Tabs
                        size="middle"
                        tabPosition="top"
                        indicator={{align: "center"}}
                        defaultActiveKey="1"
                    > 
                        <TabPane 
                            tab={<Space> <LuLayout /> Tabela </Space>} 
                            key="1" 
                        >
                            <TableArtefatos 
                                data={artefatos}
                                onUpdate={handleAtualizarArtefato}
                                onDelete={handleExcluirArtefato}
                                onShowComments={handleExibirComentarios}
                            />
                        </TabPane>
                        <TabPane 
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
                            tab={<Space> <LuLayoutGrid /> Grid </Space> } 
                            key="3"
                        >
                            <GridArtefatos 
                                data={artefatos}
                                onCreate={handleAdicionarArtefato}
                                onUpdate={handleAtualizarArtefato}
                                onDelete={handleExcluirArtefato}
                                onShowComments={handleExibirComentarios}
                            />
                        </TabPane>                            
                    </Tabs>
                )}
            </SectionContent>      
        </Section>         
    );
}

export default Artefatos;
