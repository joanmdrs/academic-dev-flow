import { Modal, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { useContextoGlobalProjeto } from "../../../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { useMembroContexto } from "../../../../../Membro/context/MembroContexto";
import { buscarMembrosPorProjeto, criarMembroProjeto, excluirMembroProjeto } from "../../../../../../services/membroProjetoService";
import { handleError } from "../../../../../../services/utils";
import { cadastrarFuncaoMembroProjeto, excluirFuncaoMembroProjeto } from "../../../../../../services/funcaoMembroProjetoService";
import FormFuncaoMembro from "../../../../../Membro/components/FormFuncaoMembro/FormFuncaoMembro";
import GridEquipe from "../../../../../Membro/components/GridEquipe/GridEquipe";
import ListEquipe from "../../../../../Membro/components/ListEquipe/ListEquipe";
import ModalSelectMembros from "../../../../../Membro/components/ModalSelectMembros/ModalSelectMembros";


const {TabPane } = Tabs

const Membros = () => {

    const {dadosProjeto} = useContextoGlobalProjeto()
    const {dadosMembroProjeto, setDadosMembroProjeto} = useMembroContexto()
    const [membrosEquipe, setMembrosEquipe] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isFormFuncaoMembroVisible, setIsFormFuncaoMembroVisible] = useState(false)


    const handleBuscarMembrosPorProjeto = async () => {
        const response = await buscarMembrosPorProjeto(dadosProjeto.id)

        if (!response.error){
            setMembrosEquipe(response.data)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (dadosProjeto){
                    await handleBuscarMembrosPorProjeto()
                }
            } catch (error) {
                return handleError(error, 'Falha ao tentar buscar os dados da equipe !')
            }
        }
        
        fetchData()
    }, [dadosProjeto])

    const handleCancelar = () => {
        setIsModalVisible(false)
        setIsFormFuncaoMembroVisible(false)
    }

    const handleReload = async () => {
        await handleBuscarMembrosPorProjeto()
        setIsFormFuncaoMembroVisible(false)
        setDadosMembroProjeto(null)
    }

    const handleAdicionarMembro = async () => {
        setIsModalVisible(true)
    }

    const handleVincularMembros = async (formData) => {
        formData['projeto'] = dadosProjeto.id

        await criarMembroProjeto(formData)
        await handleBuscarMembrosPorProjeto()
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
                await handleBuscarMembrosPorProjeto()
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
                await handleBuscarMembrosPorProjeto()
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
        <div>


            { isFormFuncaoMembroVisible ? (
                <FormFuncaoMembro onSubmit={handleDefinirFuncao} onCancel={handleCancelar} />
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
                                />
                            </TabPane>
                            
                        </Tabs>
                    </div>

                )

            }
            
            
            <ModalSelectMembros 
                idProjeto={dadosProjeto.id}
                onSubmit={handleVincularMembros} 
                onCancel={handleCancelar} 
                isModalVisible={isModalVisible} 
            />
        </div>
    )

}

export default Membros