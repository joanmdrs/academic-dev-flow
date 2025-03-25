import { Breadcrumb, Modal, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { BsGrid3X3GapFill, BsTable } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { buscarMembrosPorProjeto, criarMembroProjeto, excluirMembroProjeto } from "../../../../services/membroProjetoService";
import { handleError } from "../../../../services/utils";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import ListEquipe from "../../components/ListEquipe/ListEquipe";
import ModalSelectMembros from "../../components/ModalSelectMembros/ModalSelectMembros";
import { atualizarFuncaoMembroProjeto, cadastrarFuncaoMembroProjeto, excluirFuncaoMembroProjeto, listarFuncaoMembroProjetoPorProjeto } from "../../../../services/funcaoMembroProjetoService";
import FormFuncaoMembro from "../../components/FormFuncaoMembro/FormFuncaoMembro";
import { useMembroContexto } from "../../context/MembroContexto";
import GridEquipe from "../../components/GridEquipe/GridEquipe";
import TableFuncoes from "../../components/TableFuncoes/TableFuncoes";
import Section from "../../../../components/Section/Section";
import SectionHeader from "../../../../components/SectionHeader/SectionHeader";
import { HomeOutlined } from "@ant-design/icons";
import SectionContent from "../../../../components/SectionContent/SectionContent";

const {TabPane } = Tabs

const Equipe = ({grupo}) => {
    const location = useLocation();
    const { state } = location;

    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()
    const {dadosMembroProjeto, setDadosMembroProjeto} = useMembroContexto()
    const [membrosEquipe, setMembrosEquipe] = useState([])
    const [funcoesMembro, setFuncoesMembro] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isFormFuncaoMembroVisible, setIsFormFuncaoMembroVisible] = useState(false)

    const handleBuscarProjeto = async () => {
        const response = await buscarProjetoPeloId(state.idProjeto)
        if (!response.error){
            setDadosProjeto(response.data)
        }
    }

    const handleBuscarEquipe = async () => {
        const response = await buscarMembrosPorProjeto(state.idProjeto)

        if (!response.error){
            setMembrosEquipe(response.data)
        }
    }

    const handleListarFuncoes = async () => {
        const response = await listarFuncaoMembroProjetoPorProjeto(state.idProjeto)
        if (!response.error){
            setFuncoesMembro(response.data)
        }

    }

    const handleAtualizarStatusFuncaoMembro = async (id, status) => {
        try {
            const formData = {
                status: status
            }
            await atualizarFuncaoMembroProjeto(id, formData)
            handleReload()
        } catch (error) {
            return handleError(error, 'Falha ao atualizar o status da função do membro!')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (state){
                    await handleBuscarProjeto()
                    await handleBuscarEquipe()
                    await handleListarFuncoes()
                }
            } catch (error) {
                return handleError(error, 'Falha ao tentar buscar os dados da equipe !')
            }
        }
        
        fetchData()
    }, [state])

    const handleCancelar = () => {
        setIsModalVisible(false)
        setIsFormFuncaoMembroVisible(false)
    }

    const handleReload = async () => {
        await handleBuscarEquipe()
        await handleListarFuncoes()
        setIsFormFuncaoMembroVisible(false)
        setDadosMembroProjeto(null)
    }

    const handleAdicionarMembro = async () => {
        setIsModalVisible(true)
    }

    const handleVincularMembros = async (formData) => {
        formData['projeto'] = dadosProjeto.id

        await criarMembroProjeto(formData)
        await handleBuscarEquipe()
        handleCancelar()
    }

    const handleRemoverMembro = async (id) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja remover o membro do projeto ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk:  async () => {
                await excluirMembroProjeto([id])
                await handleBuscarEquipe()
            }
        });
       
    }

    const handleRemoverFuncao = async (id) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja remover a função ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk:  async () => {
                await excluirFuncaoMembroProjeto(id)
                await handleBuscarEquipe()
                await handleListarFuncoes()
            }
        });
    }

    const handleAdicionarFuncao = (record) => {
        setIsFormFuncaoMembroVisible(true)
        setDadosMembroProjeto(record)
    }

    const handleDefinirFuncao = async (formData) => {
        const {categoria_funcao, iteracao} = formData
        const sendData = categoria_funcao.map((item) => {
            return {
                categoria_funcao: item,
                membro_projeto: dadosMembroProjeto.id,
                iteracao: iteracao
            }
        })

        const response = await cadastrarFuncaoMembroProjeto(sendData)
        
        if(!response.error){
            await handleReload()
        }
    }

    return (

        <Section>
            <SectionHeader>
                <Breadcrumb
                    items={[
                        {
                            href: `/academicflow/${grupo}/home`,
                            title: <HomeOutlined />,
                        },
                        {
                            href: `/academicflow/${grupo}/membros/gerenciar`,
                            title: 'Membros',
                        },
                        {
                            href: `/academicflow/${grupo}/membros/equipes`,
                            title: 'Equipes',
                        },
                        {
                            href: '',
                            title: <> {dadosProjeto?.nome} </>,
                        }
                        ,
                        ...(isFormFuncaoMembroVisible ? [{ title: 'Vincular função' }]
                            : [])
                    ]}
                />
            </SectionHeader>

            <SectionContent>
            

                { isFormFuncaoMembroVisible ? (

                    <FormFuncaoMembro onSubmit={handleDefinirFuncao} onCancel={handleCancelar} />
                    
                    ) : (
                        <div>

                            <Tabs
                                size="middle"
                                tabPosition="left"
                                indicator={{align: "center"}}
                                defaultActiveKey="1"
                            > 
                                <TabPane tab={<FaListUl />} key="1" >
                                    <ListEquipe
                                        onAdd={handleAdicionarMembro}
                                        onAddFunction={handleAdicionarFuncao}
                                        data={membrosEquipe} 
                                        onDelete={handleRemoverMembro}
                                        onDeleteFunction={handleRemoverFuncao}
                                        onDisable={handleAtualizarStatusFuncaoMembro}
                                    />
                                </TabPane>

                                <TabPane tab={ <BsTable /> } key="2"  >
                                    <TableFuncoes 
                                        data={funcoesMembro} 
                                        onDelete={handleRemoverFuncao}
                                        onDisable={handleAtualizarStatusFuncaoMembro}
                                    />
                                </TabPane>

                                <TabPane tab={ <BsGrid3X3GapFill /> } key="3"  >
                                    <GridEquipe onAdd={handleAdicionarMembro} onDelete={handleRemoverMembro} data={membrosEquipe} />
                                </TabPane>
                                
                            </Tabs>
                        </div>

                    )

                }
            
                
                <ModalSelectMembros 
                    onSubmit={handleVincularMembros} 
                    onCancel={handleCancelar} 
                    isModalVisible={isModalVisible} 
                />
            </SectionContent>
        </Section>
    )

}

export default Equipe