import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Select, Tabs, Tooltip } from 'antd';
import { buscarProjetosDoMembro, criarMembroProjeto } from "../../../../services/membroProjetoService";
import { useContextoGlobalUser } from "../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import TableProjetos from "../../components/TableProjetos/TableProjetos";
import { FaListUl, FaPlus } from "react-icons/fa";
import TabsProjeto from '../TabsProjeto';
import { atualizarProjeto, buscarProjetoPeloId, criarProjeto, excluirProjeto } from '../../../../services/projetoService';
import { filterOption, handleError } from '../../../../services/utils';
import { useContextoProjeto } from '../../context/ContextoProjeto';
import { TbLayoutListFilled } from "react-icons/tb";
import ListProjetos from '../../components/ListProjetos/ListProjetos';
import { optionsStatusProjetos } from '../../../../services/optionsStatus';
import { listarFluxos } from '../../../../services/fluxoService';
import { useNavigate } from 'react-router-dom';
import SpinLoading from '../../../../components/SpinLoading/SpinLoading';
import { MdFilterAlt } from "react-icons/md";

const { Search } = Input;
const {TabPane} = Tabs 

const Projetos = () => {
    
    const navigate = useNavigate();
    const { dadosProjeto, setDadosProjeto } = useContextoProjeto();
    const { usuario, grupo } = useContextoGlobalUser();
    const [projetos, setProjetos] = useState([]);
    const [isTabsVisible, setIsTabsVisible] = useState(false);
    const [isTableVisible, setIsTableVisible] = useState(true);
    const [actionForm, setActionForm] = useState('create');
    const [optionsFluxo, setOptionsFluxo] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            if (usuario && usuario.id) {
                const response = await buscarProjetosDoMembro(usuario.id);
                if (!response.error) {
                    setProjetos(response.data)
                }
            }

            const response = await listarFluxos()
            if (!response.error){
                const resultados = response.data.map(item => ({
                    value: item.id,
                    label: item.nome
                }))
                setOptionsFluxo(resultados)
            }
        };
        fetchData();
    }, [usuario]);

    const handleVisualizarProjeto = async (record) => {
        const parametros = {
            idProjeto: record.projeto
        }
        if (grupo === 'Docentes') {
            navigate("/professor/projetos/visualizar", {
                state: parametros
            });
        } else if (grupo === 'Discentes') {
            navigate("/aluno/projetos/visualizar", {
                state: parametros
            });
        } else if (grupo === 'Administradores') {
            navigate("/admin/projetos/visualizar", {
                state: parametros
            });
        }
    }

    const handleBuscarProjetosDoMembro = async () => {
        const response = await buscarProjetosDoMembro(usuario.id);
        if (!response.error) {
            setProjetos(response.data)
        }
    };

    const handleFiltrarProjetoPorFluxo = async (fluxo) => {
        if (fluxo) {
            const response = await buscarProjetosDoMembro(usuario.id)
            if (!response.error){
                setProjetos(response.data.filter(projeto => projeto.id_fluxo === fluxo))
            }
        } else {
            await handleBuscarProjetosDoMembro()
        }
    }

    const handleFiltrarProjetoPorStatus = async (status) => {
        if (status) {
            const response = await buscarProjetosDoMembro(usuario.id);
            if (!response.error) {
                setProjetos(response.data.filter(projeto => projeto.status_projeto === status));
            }
        } else {
            await handleBuscarProjetosDoMembro()
        }
       
    }

    const handleFiltrarProjetosPeloNome = async (value) => {

        if (value){
            const response = await buscarProjetosDoMembro(usuario.id);
            const projetosFiltros = response.data.filter(projeto =>
                projeto.nome_projeto.toLowerCase().includes(value.toLowerCase())
            );
            setProjetos(projetosFiltros)
            
        

        } else {
            await handleBuscarProjetosDoMembro()
        }
    }

    const handleBuscarProjeto = async (id) => {
        const response = await buscarProjetoPeloId(id)
        if (!response.error){
            setDadosProjeto(response.data)
        }
    }

    const handleAdicionarProjeto = () => {
        setActionForm('create')
        setDadosProjeto(null)
        setIsTableVisible(false)
        setIsTabsVisible(true)
    }

    const handleAtualizarProjeto = async (record) => {
        setActionForm('update')
        await handleBuscarProjeto(record.projeto)
        setIsTableVisible(false)
        setIsTabsVisible(true)
    }

    const handleCancelar = async () => {
        setIsTabsVisible(false)
        setIsTableVisible(true)
        await handleBuscarProjetosDoMembro()
    }

    const handleReload = async () => {
        setDadosProjeto(null)
        setIsTableVisible(true)
        setIsTabsVisible(false)
        await handleBuscarProjetosDoMembro()
    }

    const handleSalvarProjeto = async (formData) => {    
        setIsLoading(true)
    
        try {
            if (actionForm === 'create' && dadosProjeto == null){
                const response = await criarProjeto(formData)
                
                if (!response.error){
                    await criarMembroProjeto({
                        membros: [usuario.id],
                        projeto: response.data.id
                    })
                    setActionForm('update')
                    setDadosProjeto(response.data)
    
                }
            }else if(actionForm === 'update'){
                const response = await atualizarProjeto(formData, dadosProjeto.id)
                if (!response.error){
                    setDadosProjeto(response.data)
                }
            }
        } catch (error) {
            return handleError(error, 'Falha ao tentar salvar os dados do projeto !')
        }

        setIsLoading(false)
    };

    const handleExcluirProjeto = async (id) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir o projeto ? Ao fazer isso, todos os membros, tarefas e artefatos serão desvinculados do projeto. ',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                await excluirProjeto(id)
                await handleReload()
            }
        });
    }

    return (
        <div className='content'>
            
            {!isTabsVisible ? (
                <React.Fragment>
                    <div style={{
                        borderBottom: '1px solid #ddd',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        padding: '20px'
                    }}> 
                        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                            <h2 style={{margin: 0, fontFamily: 'Poppins, sans-serif', fontWeight: '600'}}> Projetos </h2>
                        </div>
        
                        <div>
                            <Button 
                                type="primary" 
                                ghost
                                size='large'
                                icon={<FaPlus />} 
                                onClick={handleAdicionarProjeto} 
                            > Criar Projeto </Button>
                        </div>
                    </div>
        
                    <div style={{
                            padding: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            borderBottom: '1px solid #ddd'
        
                        }}> 
                        <div> 
                            <p 
                                style={{
                                    color: "var(--border-color)", 
                                    display: 'flex', 
                                    alignItems: 'center'
                                }}
                            > <MdFilterAlt size={"20px"} /> Filtros </p>
                        </div>

                        <div>
                            <Form 
                                style={{display: 'flex', gap: '10px'}}
                                onValuesChange={(changedValues, allValues) => handleFiltrarProjetosPeloNome(allValues.nome)}
                            >
                                <Form.Item style={{margin: '0', width: '400px'}} name="nome">
                                    <Input name="nome" placeholder="Pesquise pelo nome do projeto" />
                                </Form.Item>
                            </Form>

                            </div>
        
                        <div className='df g-10'> 
                            <Select 
                                style={{minWidth: '150px'}}
                                options={optionsFluxo}
                                allowClear
                                placeholder="Fluxo"
                                showSearch
                                filterOption={filterOption}
                                popupMatchSelectWidth={false}
                                onChange={(value) => handleFiltrarProjetoPorFluxo(value)}
                        
                            /> 
                            <Select 
                                style={{minWidth: '150px'}}
                                options={optionsStatusProjetos}
                                allowClear
                                placeholder="Status"
                                popupMatchSelectWidth={false}
                                onChange={(value) => handleFiltrarProjetoPorStatus(value)}
                        
                            /> 
                        </div>
                    </div>
                </React.Fragment>
                
            ) : (
                <React.Fragment>
                    {isLoading ? (
                        <SpinLoading />
                    ) : (
                        <TabsProjeto
                            onSubmit={handleSalvarProjeto}
                            onCancel={handleCancelar}
                        />
                    )}
                </React.Fragment>
                
                
            ) }

            
            

            <div style={{padding: '20px'}}>

                {isTableVisible && (
                    <React.Fragment>

                        <Tabs
                            style={{paddingTop: '10px'}}
                            size="middle"
                            tabPosition="top"
                            indicator={{align: "center"}}
                            defaultActiveKey="1"
                        > 
                            <TabPane 
                                style={{paddingTop: '20px'}} 
                                tab={
                                    <Tooltip title="Lista">
                                        <TbLayoutListFilled /> Lista
                                    </Tooltip>
                                } 
                                key="1">
                                    <ListProjetos 
                                        data={projetos} 
                                        onUpdate={handleAtualizarProjeto}
                                        onDelete={handleExcluirProjeto}
                                        onOpen={handleVisualizarProjeto}
                                    />
                            </TabPane>
                            
                            <TabPane 
                                style={{paddingTop: '20px'}} 
                                tab={
                                    <Tooltip title="Tabela">
                                        <FaListUl /> Tabela
                                    </Tooltip>
                                } 
                                key="2" 
                            >
                                <TableProjetos
                                    projetos={projetos} 
                                    onUpdate={handleAtualizarProjeto}
                                    onDelete={handleExcluirProjeto}
                                    onOpen={handleVisualizarProjeto}
                                />
                            </TabPane>
                            
                        </Tabs>
                        
                    </React.Fragment>
                )}

            </div>
        </div>
    );

};

export default Projetos;