import { Button, Modal, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaListUl, FaPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { buscarMembrosPorProjeto, criarMembroProjeto, excluirMembroProjeto } from "../../../../services/membroProjetoService";
import { handleError } from "../../../../services/utils";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import ListEquipe from "../../components/ListEquipe/ListEquipe";
import ModalSelectMembros from "../../components/ModalSelectMembros/ModalSelectMembros";
import { atualizarFuncaoMembroProjeto, cadastrarFuncaoMembroProjeto, excluirFuncaoMembroProjeto } from "../../../../services/funcaoMembroProjetoService";
import FormFuncaoMembro from "../../components/FormFuncaoMembro/FormFuncaoMembro";
import { useMembroContexto } from "../../context/MembroContexto";
import GridEquipe from "../../components/GridEquipe/GridEquipe";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdArrowBackIosNew } from "react-icons/md";

const {TabPane } = Tabs

const Equipe = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()
    const {dadosMembroProjeto, setDadosMembroProjeto} = useMembroContexto()
    const [membrosEquipe, setMembrosEquipe] = useState([])
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
        <div className="content">
            <div style={{
                borderBottom: '1px solid #ddd',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '20px',
                backgroundColor: '#FFFFFF'
            }}> 
                <div style={{}}>
                    <h3 style={{margin: '0', fontFamily: 'Poppins, sans-serif'}}> Sua Equipe </h3>
                    <h4 style={{margin: '0', fontFamily: 'Poppins, sans-serif'}}>
                        {dadosProjeto && dadosProjeto.nome && (
                            dadosProjeto.nome
                        )} 
                    </h4>
                </div>

                <div>
                    <Button
                        onClick={() => navigate(-1)}
                        type="default"
                        icon={<MdArrowBackIosNew />}
                    > Voltar 
                    </Button>
                </div>                    
            </div>

            { isFormFuncaoMembroVisible ? (

                <div className="pa-20"> 
                    <FormFuncaoMembro onSubmit={handleDefinirFuncao} onCancel={handleCancelar} />
                </div>
                ) : (
                    <div>

                        <Tabs
                            style={{paddingTop: '10px'}}
                            size="middle"
                            tabPosition="left"
                            indicator={{align: "center"}}
                            defaultActiveKey="2"
                        > 
                            <TabPane style={{padding: '20px'}} tab={ <BsGrid3X3GapFill /> } key="1"  >
                                <GridEquipe onAdd={handleAdicionarMembro} onDelete={handleRemoverMembro} data={membrosEquipe} />
                            </TabPane>
                            <TabPane style={{padding: '20px'}} tab={<FaListUl />} key="2" >

                                <ListEquipe
                                    onAdd={handleAdicionarMembro}
                                    onAddFunction={handleAdicionarFuncao}
                                    data={membrosEquipe} 
                                    onDelete={handleRemoverMembro}
                                    onDeleteFunction={handleRemoverFuncao}
                                    onDisable={handleAtualizarStatusFuncaoMembro}
                                />
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
        </div>
    )

}

export default Equipe