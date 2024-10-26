import React, { useEffect, useState } from 'react';
import { Button, Flex, Input, Modal, Space } from 'antd';
import { buscarProjetosDoMembro, criarMembroProjeto } from "../../../../services/membroProjetoService";
import { useContextoGlobalUser } from "../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import TableProjetos from "../../components/TableProjetos/TableProjetos";
import { FaPlus } from "react-icons/fa";
import TabsProjeto from '../TabsProjeto';
import { atualizarProjeto, buscarProjetoPeloId, criarProjeto, excluirProjeto } from '../../../../services/projetoService';
import { handleError } from '../../../../services/utils';
import { useContextoProjeto } from '../../context/ContextoProjeto';

const MeusProjetos = () => {
    const { hasProjeto, setHasProjeto } = useContextoProjeto();
    const { usuario } = useContextoGlobalUser();
    const [projetos, setProjetos] = useState([]);
    const [filteredProjetos, setFilteredProjetos] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); 
    const [isTabsVisible, setIsTabsVisible] = useState(false);
    const [isTableVisible, setIsTableVisible] = useState(true);
    const [actionForm, setActionForm] = useState('create');
    const [currentStatusProjeto, setCurrentStatusProjeto] = useState('todos')

    const handleGetProjetosDoMembro = async () => {
        const response = await buscarProjetosDoMembro(usuario.id);
        if (!response.error) {
            setProjetos(response.data)
            setFilteredProjetos(response.data)
        }
    };

    const handleFiltrarProjetoPorStatus = async (status) => {
        const response = await buscarProjetosDoMembro(usuario.id);
        if (!response.error) {
            setProjetos(response.data.filter(projeto => projeto.status_projeto === status));
            setFilteredProjetos(response.data.filter(projeto => projeto.status_projeto === status));
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (usuario && usuario.id) {
                await handleGetProjetosDoMembro();
            }
        };
        fetchData();
        console.log(usuario);
    }, [usuario]);

    const handleSearch = (value) => {
        setSearchTerm(value);
        const filtered = projetos.filter(projeto =>
            projeto.nome_projeto.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProjetos(filtered);
    };

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
        await handleGetProjetosDoMembro()
    }

    const handleReload = async () => {
        setHasProjeto(null)
        setIsTableVisible(true)
        setIsTabsVisible(false)
        await handleGetProjetosDoMembro()
    }

    const handleSalvarProjeto = async (formData) => {
        
        console.log(hasProjeto)
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
            <div>
                <div className="global-space">
                    <Space>
                        <h3> MEUS PROJETOS </h3>
                    </Space>
    
                    <Space>
                        <Input.Search
                            placeholder="insira o texto de pesquisa"
                            enterButton
                            value={searchTerm}
                            onSearch={handleSearch}
                            onChange={e => handleSearch(e.target.value)}
                        />
                    </Space>
    
                    <Space>
                        <Flex wrap gap="small">
                            <Button type="primary" icon={<FaPlus />} onClick={handleAdicionarProjeto} > Criar Projeto </Button>
                            
                            <Button 
                                style={{backgroundColor: `${currentStatusProjeto === 'todos' ? 'red': 'gray'}`}}  
                                onClick={() => setCurrentStatusProjeto('todos')}
                            > Todos </Button>

                            <Button 
                                style={{backgroundColor: `${currentStatusProjeto === 'andamento' ? 'red': 'gray'}`}}  
                                onClick={() => setCurrentStatusProjeto('andamento')}
                            > Em andamento </Button>

                            <Button 
                                style={{backgroundColor: `${currentStatusProjeto === 'concluidos' ? 'red': 'gray'}`}}  
                                onClick={() => setCurrentStatusProjeto('concluidos')}
                            > Concluídos </Button>

                        </Flex>
                    </Space>
                </div>
    
                <div>
                    {isTabsVisible &&
                        <TabsProjeto
                            onSaveProject={handleSalvarProjeto}
                            onCancel={handleCancelar}
                        />}

                    {isTableVisible && (
                        <React.Fragment>
                            {currentStatusProjeto === 'todos' && (
                                <TableProjetos
                                    projetos={filteredProjetos} 
                                    onUpdate={handleAtualizarProjeto}
                                    onDelete={handleExcluirProjeto}
                                    status="todos"
                                />
                            )}

                            {currentStatusProjeto === 'andamento' && (
                                <TableProjetos
                                    projetos={filteredProjetos} 
                                    onUpdate={handleAtualizarProjeto}
                                    onDelete={handleExcluirProjeto}
                                    status="andamento"
                                />
                            )}

                            {currentStatusProjeto === 'concluidos' && (
                                <TableProjetos
                                    projetos={filteredProjetos} 
                                    onUpdate={handleAtualizarProjeto}
                                    onDelete={handleExcluirProjeto}
                                    status="concluido"
                                />
                            )}
                        </React.Fragment>
                    )}

                    

                </div>
            </div>
    );

};

export default MeusProjetos;