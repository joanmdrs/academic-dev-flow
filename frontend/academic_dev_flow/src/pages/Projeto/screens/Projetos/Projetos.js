import React, { useEffect, useState } from 'react';
import { Button, Drawer, Input, Modal, Select, Tabs, Tooltip } from 'antd';
import { buscarProjetosDoMembro, criarMembroProjeto } from "../../../../services/membroProjetoService";
import { useContextoGlobalUser } from "../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import TableProjetos from "../../components/TableProjetos/TableProjetos";
import { FaListUl, FaPlus } from "react-icons/fa";
import TabsProjeto from '../TabsProjeto';
import { atualizarProjeto, buscarProjetoPeloId, criarProjeto, excluirProjeto } from '../../../../services/projetoService';
import { handleError } from '../../../../services/utils';
import { useContextoProjeto } from '../../context/ContextoProjeto';
import { TbLayoutListFilled } from "react-icons/tb";
import ListProjetos from '../../components/ListProjetos/ListProjetos';
import { optionsStatusProjetos } from '../../../../services/optionsStatus';
import { listarFluxos } from '../../../../services/fluxoService';

const { Search } = Input;
const {TabPane} = Tabs 

const Projetos = () => {

    const { hasProjeto, setHasProjeto } = useContextoProjeto();
    const { usuario } = useContextoGlobalUser();
    const [projetos, setProjetos] = useState([]);
    const [isTabsVisible, setIsTabsVisible] = useState(false);
    const [isTableVisible, setIsTableVisible] = useState(true);
    const [actionForm, setActionForm] = useState('create');
    const [optionsFluxo, setOptionsFluxo] = useState([])
    const [isDrawerVisible, setIsDrawerVisible] = useState(false)

    const handleOpenDrawer = () => {
        setIsDrawerVisible(true)
    }

    const handleCloseDrawer = () => {
        setIsDrawerVisible(false)
    }

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
            setHasProjeto(response.data)
        }
    }

    const handleAdicionarProjeto = () => {
        setActionForm('create')
        setHasProjeto(null)
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
        setHasProjeto(null)
        setIsTableVisible(true)
        setIsTabsVisible(false)
        await handleBuscarProjetosDoMembro()
    }

    const handleSalvarProjeto = async (formData) => {        
        try {

            if (actionForm === 'create' && hasProjeto == null){
                const response = await criarProjeto(formData)
                
                if (!response.error){
                    await criarMembroProjeto({
                        membros: [usuario.id],
                        projeto: response.data.id
                    })
                    setHasProjeto(response.data)
    
                }
            }else if(actionForm === 'update'){
                await atualizarProjeto(formData, hasProjeto.id)
            }
        } catch (error) {
            return handleError(error, 'Falha ao tentar salvar os dados do projeto !')
        }
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

            {/* {isDrawerVisible && (
                <Drawer
                    width="80%"
                    onClose={handleCloseDrawer}
                    open={isDrawerVisible}
                    placement="right"
                    maskClosable={false}
                >
                    <TabsProjeto
                        onSaveProject={handleSalvarProjeto}
                        onCancel={handleCancelar}
                    />

                </Drawer>
            )} */}

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
                            borderBottom: '1px solid #ddd',
                            padding: '20px',
                            display: 'flex',
                            justifyContent: 'space-between'
        
                        }}> 
        
                        <div>
                            <Search
                                style={{width: '500px'}}
                                placeholder="pesquise pelo nome"
                                allowClear
                                enterButton="Pesquisar"
                                size="middle"
                                onSearch={handleFiltrarProjetosPeloNome}
                            />
                        </div>
        
                        <div className='df g-10'> 
                            <Select 
                                options={optionsFluxo}
                                allowClear
                                placeholder="Fluxo"
                                popupMatchSelectWidth={false}
                                onChange={(value) => handleFiltrarProjetoPorFluxo(value)}
                        
                            /> 
                            <Select 
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
                <TabsProjeto
                    onSaveProject={handleSalvarProjeto}
                    onCancel={handleCancelar}
                />
            ) }

            
            

            <div style={{
                padding: '20px'
            }}>

                {isTableVisible && (
                    <React.Fragment>

                        <Tabs
                            style={{paddingTop: '10px'}}
                            size="middle"
                            tabPosition="left"
                            indicator={{align: "center"}}
                            defaultActiveKey="1"
                        > 
                            <TabPane 
                                style={{padding: '20px'}} 
                                tab={
                                    <Tooltip title="Lista">
                                        <TbLayoutListFilled />
                                    </Tooltip>
                                } 
                                key="1">
                                    <ListProjetos 
                                        data={projetos} 
                                        onUpdate={handleAtualizarProjeto}
                                        onDelete={handleExcluirProjeto}
                                    />
                            </TabPane>
                            
                            <TabPane 
                                style={{padding: '20px'}} 
                                tab={
                                    <Tooltip title="Tabela">
                                        <FaListUl />
                                    </Tooltip>
                                } 
                                key="2" 
                            >
                                <TableProjetos
                                    projetos={projetos} 
                                    onUpdate={handleAtualizarProjeto}
                                    onDelete={handleExcluirProjeto}
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