import { Button, Space, Input, Spin, Tooltip, Modal, Flex, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { FaFilter, FaPlus } from "react-icons/fa";
import { TbCalendarUp } from "react-icons/tb";
import FormFilterArtefatos from "../../components/FormFilterArtefatos/FormFilterArtefatos";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa6";
import { MdSortByAlpha } from "react-icons/md";
import TableArtifacts from "../../components/TableArtifacts/TableArtifacts";
import GridArtefatos from "../../components/GridArtefatos/GridArtefatos";
import { atualizarArtefato, buscarArtefatoPeloNome, criarArtefato, excluirArtefato, filtrarArtefatosPorProjetoEPorMembro, listarArtefatosDosProjetosDoMembro } from "../../../../services/artefatoService";
import { useContextoGlobalUser } from "../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import { handleError } from "../../../../services/utils";
import { useContextoArtefato } from "../../context/ContextoArtefato";
import FormArtefato from "../../components/FormArtefato/FormArtefato";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { NotificationManager } from "react-notifications";
import { createContent, updateContent } from "../../../../services/githubIntegration";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import SelecionarProjeto from "../../components/SelecionarProjeto/SelecionarProjeto";
import { GoTable } from "react-icons/go";
const {TabPane} = Tabs

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

const { Search } = Input;

const MyArtifacts = () => {
    const [layout, setLayout] = useState('grid');
    const {usuario} = useContextoGlobalUser()
    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()
    const {artefatos, setArtefatos, dadosArtefato, setDadosArtefato} = useContextoArtefato()
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [isGridVisible, setIsGridVisible] = useState(true)
    const [actionForm, setActionForm] = useState('create')
    const [isLoading, setIsLoading] = useState(false)

    const handleBuscarArtefatosDosProjetosDoMembro = async () => {
        const response = await listarArtefatosDosProjetosDoMembro(usuario.id)

        if (!response.error){
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
        console.log(dadosForm)
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

    const handleBuscarPeloNome = async (value) => {
        const response = await buscarArtefatoPeloNome(value)

        if (!response.error){
            setArtefatos(response.data)
        }
    }
    
    
    return (
        <div className="bloco-principal"> 
            <div style={{
                borderBottom: '1px solid #ddd',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between'
            }}> 
                <Space>
                    <h3> ARTEFATOS </h3>
                </Space>

                <Space>
                    <Button onClick={handleAdicionarArtefato} type="primary" ghost icon={<FaPlus />}> Criar Artefato </Button>
                </Space>
            </div>

            <div style={{backgroundColor: "#FFFFFF", height: '100vh'}}>

                { isFormVisible && 
                    <React.Fragment>
                         {isLoading && ( 
                            <div style={StyleSpin}>
                                <Spin size="large" />
                            </div>
                        )}
                        <div className="global-div"> 
                            <FormArtefato 
                                onSubmit={handleSalvarArtefato}
                                selectProjeto={<SelecionarProjeto idMembro={usuario.id} />} 
                                onCancel={handleCancelar} 
                            />

                        </div>
 
                    </React.Fragment>
                }

                {
                    isGridVisible && (
                        <React.Fragment>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'baseline',
                                padding: '20px',
                                border: '1px solid #DDD'
                            }}>
                                <Flex horizontal gap="middle">
                                    <Space>
                                        <span style={{color: '#BDBDBD'}}>  <FaFilter/> Filtros </span>
                                    </Space>
                                    <Space>
                                        <Search 
                                            onSearch={(value) => handleBuscarPeloNome(value)} 
                                            placeholder="pesquise aqui" style={{width: 400}}
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

                           
                            <Tabs
                                style={{paddingTop: '10px'}}
                                size="middle"
                                tabPosition="left"
                                indicator={{align: "center"}}
                                defaultActiveKey="2"
                            > 
                                <TabPane style={{padding: '20px'}} tab={ <BsGrid3X3GapFill /> } key="1"  >
                                    <GridArtefatos 
                                        artefatos={artefatos}
                                        onUpdate={handleAtualizarArtefato}
                                        onDelete={handleExcluirArtefato}
                                    />
                                </TabPane>
                                <TabPane style={{padding: '20px'}} tab={<FaListUl />} key="2" >
                                    <TableArtifacts 
                                        artefatos={artefatos}
                                        onUpdate={handleAtualizarArtefato}
                                        onDelete={handleExcluirArtefato}
                                    />
                                </TabPane>
                                
                            </Tabs>


                        </React.Fragment>        
                    )
                }    
            </div>
        </div>
    );
}

export default MyArtifacts;
