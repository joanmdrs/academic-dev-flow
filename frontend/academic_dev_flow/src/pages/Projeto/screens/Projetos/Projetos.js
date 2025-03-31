import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Modal, Space, Tabs, Tooltip } from 'antd';
import { buscarMembrosPorProjeto, buscarProjetosDoMembro, criarMembroProjeto } from "../../../../services/membroProjetoService";
import { useContextoGlobalUser } from "../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import TableProjetos from "../../components/TableProjetos/TableProjetos";
import { FaListUl, FaPlus } from "react-icons/fa";
import TabsProjeto from '../TabsProjeto';
import { atualizarProjeto, buscarProjetoPeloId, criarProjeto, excluirProjeto } from '../../../../services/projetoService';
import { handleError } from '../../../../services/utils';
import { useContextoProjeto } from '../../context/ContextoProjeto';
import { TbLayoutListFilled } from "react-icons/tb";
import ListProjetos from '../../components/ListProjetos/ListProjetos';
import { useNavigate } from 'react-router-dom';
import SpinLoading from '../../../../components/SpinLoading/SpinLoading';
import SectionHeader from '../../../../components/SectionHeader/SectionHeader';
import FilterByName from '../../components/Filters/FilterByName/FilterByName';
import FilterByStatus from '../../components/Filters/FilterByStatus/FilterByStatus';
import FilterByFlow from '../../components/Filters/FilterByFlow/FilterByFlow';
import SectionFilters from '../../../../components/SectionFilters/SectionFilters';
import Section from '../../../../components/Section/Section';
import { MdFilterAlt } from 'react-icons/md';
import { HomeOutlined } from '@ant-design/icons';

const {TabPane} = Tabs 

const Projetos = ({group}) => {
    
    const navigate = useNavigate();
    const { dadosProjeto, setDadosProjeto } = useContextoProjeto();
    const { usuario, grupo } = useContextoGlobalUser();
    const [projetos, setProjetos] = useState([]);
    const [isSaveFormVisible, setIsSaveFormVisible] = useState(false) 
    const [actionForm, setActionForm] = useState('create');
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            if (usuario && usuario.id) {
                const response = await buscarProjetosDoMembro(usuario.id);
                if (!response.error) {
                    setProjetos(response.data)
                }
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

    const handleFiltrarProjetosPorFluxo = async (fluxo) => {
        if (fluxo) {
            const response = await buscarProjetosDoMembro(usuario.id)
            if (!response.error){
                setProjetos(response.data.filter(projeto => projeto.id_fluxo === fluxo))
            }
        } else {
            await handleBuscarProjetosDoMembro()
        }
    }

    const handleFiltrarProjetosPorStatus = async (status) => {
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
        setIsSaveFormVisible(true)
    }

    const handleAtualizarProjeto = async (record) => {
        setActionForm('update')
        await handleBuscarProjeto(record.projeto)
        setIsSaveFormVisible(true)
    }

    const handleCancelar = async () => {
        setIsSaveFormVisible(false)
        await handleBuscarProjetosDoMembro()
    }

    const handleReload = async () => {
        setDadosProjeto(null)
        setIsSaveFormVisible(false)
        await handleBuscarProjetosDoMembro()
    }

    const handleSalvarProjeto = async (formData) => {    
        setIsLoading(true);
        
        try {
            if (actionForm === 'create' && dadosProjeto == null) {
                await criarNovoProjeto(formData);
            } else if (actionForm === 'update') {
                await atualizarProjetoExistente(formData);
            }
        } catch (error) {
            return handleError(error, 'Falha ao tentar salvar os dados do projeto!');
        }
        
        setIsLoading(false);
    };
    
    const criarNovoProjeto = async (formData) => {
        const response = await criarProjeto(formData);
        if (!response || !response.data) {
            throw new Error('Erro ao criar projeto.');
        }
    
        await adicionarMembrosProjeto(response.data.id, [usuario.id, formData.coordenador]);
        setActionForm('update');
        setDadosProjeto(response.data);
    };
    
    const atualizarProjetoExistente = async (formData) => {
        try {
            const response = await atualizarProjeto(formData, dadosProjeto.id);
            if (!response || !response.data) {
                throw new Error('Erro ao atualizar projeto.');
            }
    
            await verificarEAdicionarCoordenador(response.data.id, formData.coordenador);
            setDadosProjeto(response.data);
        } catch (error) {
            console.error('Erro ao atualizar o projeto: ', error);
            return handleError(error, 'Falha ao tentar atualizar os dados do projeto!');
        }
    };
    
    const adicionarMembrosProjeto = async (projetoId, membros) => {
        const membrosFiltrados = membros.filter(Boolean); // Remove valores nulos ou indefinidos
        if (membrosFiltrados.length > 0) {
            await criarMembroProjeto({ membros: membrosFiltrados, projeto: projetoId });
        }
    };
    
    const verificarEAdicionarCoordenador = async (projetoId, coordenadorId) => {
        if (!coordenadorId) return;
    
        const membros = await buscarMembrosPorProjeto(projetoId);
        const membroCoordenador = membros.data.find(item => item.membro === coordenadorId);
    
        if (!membroCoordenador) {
            await criarMembroProjeto({ membros: [coordenadorId], projeto: projetoId });
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
        <Section>
            <SectionHeader>
                <Breadcrumb
                    items={[
                        {
                            href: `/academicflow/${group}/home`,
                            title: <HomeOutlined />,
                        },
                        {
                            href: `/academicflow/${group}/projetos`,
                            title: 'Projetos',
                        },
                        ...(isSaveFormVisible && actionForm === 'create'
                            ? [{ title: 'Cadastrar' }]
                            : []),
                        ...(isSaveFormVisible && actionForm === 'update'
                            ? [{ title: 'Atualizar' }]
                            : []),
                    ]}
                />

                { !isSaveFormVisible && (
                    <Button 
                        type="primary" 
                        icon={<FaPlus/>} 
                        onClick={handleAdicionarProjeto}
                    > Criar Projeto</Button>
                )}
            </SectionHeader>

            { !isSaveFormVisible && (
                <SectionFilters>
                    <Space> 
                        <FilterByName onFilter={handleFiltrarProjetosPeloNome}/>
                    </Space>
                    <Space>
                        <FilterByStatus onFilter={handleFiltrarProjetosPorStatus} />
                    </Space>
                    <Space>
                        <FilterByFlow onFilter={handleFiltrarProjetosPorFluxo} />
                    </Space>
                </SectionFilters>
            )}

            { isSaveFormVisible && (
                <div style={{padding: '20px'}}>
                    {isLoading ? (
                        <SpinLoading />
                    ) : (
                        <TabsProjeto
                            onSubmit={handleSalvarProjeto}
                            onCancel={handleCancelar}
                        />
                    )}
                </div>
            )} 

            {!isSaveFormVisible && (
                <Tabs
                    style={{padding: '20px'}}
                    size="middle"
                    tabPosition="top"
                    indicator={{align: "center"}}
                    defaultActiveKey="1"
                > 
                    <TabPane 
                        style={{padding: '20px 0'}} 
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
                        style={{padding: '20px 0'}} 
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
            )}
        </Section>
    );

};

export default Projetos;