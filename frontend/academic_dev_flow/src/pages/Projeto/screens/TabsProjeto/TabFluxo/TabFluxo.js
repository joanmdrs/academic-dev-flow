import React, { useEffect, useState } from "react";
import { useContextoProjeto } from "../../../context/ContextoProjeto";
import { Button, Empty, Form, List, Modal, Select, Typography } from "antd";
import { FaLink, FaTrash } from "react-icons/fa";
import { listarFluxos } from "../../../../../services/fluxoService";
import { handleError } from "../../../../../services/utils";
import { atualizarFluxoProjeto, buscarProjetoPeloId } from "../../../../../services/projetoService";
import { NotificationManager } from "react-notifications";
const { Text } = Typography;

const TabFluxo = () => {

    const {hasProjeto, setHasProjeto} = useContextoProjeto()
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [isFluxoVisible, setIsFluxoVisible] = useState(true)
    const [optionsFluxo, setOptionsFluxo] = useState([])
    const [dataFluxo, setDataFluxo] = useState([{id: null, nome: null}])

    const handleCancelar = () => {
        setIsFormVisible(false)
        setIsFluxoVisible(true)
    }

    const handleReload = async () => {
        setIsFluxoVisible(true)
        setIsFormVisible(false)
        await handleUpdateProjeto()
    }

    const handleUpdateProjeto = async () => {
        try {
            const response = await buscarProjetoPeloId(hasProjeto.id)

            if (!response.error){
                setHasProjeto(response.data)
            }
        } catch (error) {
            return handleError(error, 'Falha ao tentar atualizar as informações do projeto')
        }
    }

    const handleGetFluxos = async () => {
        try {
            const response = await listarFluxos()
            if (!response.error){
                const resultados = response.data.map((item) => {
                    return {
                        value: item.id,
                        label: item.nome
                    }
                })
                setOptionsFluxo(resultados)
            }
        } catch (error) {
            return handleError('Falha ao tentar listar os fluxos')
        }
    }

    const handleAdicionarFluxo = async () => {
        await handleGetFluxos()
        setIsFormVisible(true)
        setIsFluxoVisible(false)
    }

    const handleVincularFluxo = async (formData) => {
        try {
            console.log(formData)
            const response = await atualizarFluxoProjeto(formData.fluxo, hasProjeto.id)
            if (!response.error){
                NotificationManager.success('Fluxo vinculado ao projeto com sucesso! ')
                handleReload()
            }
        } catch (error) {
            return handleError(error, 'Falha ao tentar vincular o fluxo ao projeto')
        }
    }

    const handleRemoverFluxo = async () => {

        Modal.confirm({
            title: 'Confirmar remoção',
            content: 'Você está seguro de que deseja desvincular o fluxo do projeto ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                await handleDesvincularFluxo()
            }
        });
    }

    const handleDesvincularFluxo = async () => {
        try {
            const response = await atualizarFluxoProjeto(0, hasProjeto.id)
    
            if (!response.error){
                NotificationManager.success('Fluxo desvinculado do projeto com sucesso !')
                await handleReload()
            }
        } catch (error) {
            return handleError(error, 'Falha ao tentar desvincular o fluxo do projeto !')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (hasProjeto !== null && hasProjeto.nome_fluxo !== null){
                    setDataFluxo([{
                        id: hasProjeto.fluxo,
                        nome: hasProjeto.nome_fluxo
                    }])
                }
            } catch (error) {
                return handleError(error, 'Falha ao tentar renderizar os dados do fluxo')
            }
        }
        fetchData()
    }, [hasProjeto])

    return (
        <React.Fragment>
            {hasProjeto && (
                <React.Fragment>
                    <div style={{display: 'flex', justifyContent: 'space-between', margin: '20px'}}> 
                        <div style={{display: 'flex', gap: '20px'}}>
                        </div>

                        <div style={{display: 'flex', gap: '10px'}}> 
                            {hasProjeto.nome_fluxo !== null ? (
                                <Button 
                                    icon={<FaTrash />} 
                                    danger
                                    onClick={handleRemoverFluxo}
                                >
                                    Remover
                                </Button>
                            ) : (
                                <Button 
                                    icon={<FaLink />} 
                                    type="primary" 
                                    onClick={handleAdicionarFluxo}
                                >
                                    Vincular Fluxo
                                </Button>
                            )}
                        </div>
                    </div>

                    <div>
                        {isFormVisible && (
                            <Form onFinish={handleVincularFluxo}>
                                <Form.Item label="Selecione o fluxo" name="fluxo">
                                    <Select
                                        options={optionsFluxo}
                                        showSearch
                                        allowClear
                                        placeholder="Pesquise ou selecione o membro"
                                        filterOption={
                                            (input, option) => option?.label.toLowerCase().includes(input.toLowerCase())
                                        }
                                    />
                                </Form.Item>

                                <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Salvar
                                </Button>
                                <Button type="primary" style={{ marginLeft: "10px" }} danger onClick={handleCancelar}>
                                    Cancelar
                                </Button>
                                </Form.Item>
                            </Form>
                        )}

                        {dataFluxo[0].nome !== null && isFluxoVisible ? (

                            <List
                                header={<div>Fluxo</div>}
                                bordered
                                dataSource={dataFluxo}
                                renderItem={(item) => (
                                    <List.Item>
                                       <Text style={{color: "var(--primary-color)"}}>{item.nome} </Text>
                                    </List.Item>
                                )}
                            />

                        ) : (
                            <Empty description="Nenhum fluxo vinculado ao projeto" image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                        )}

                    </div>

                </React.Fragment>
            )}
        </React.Fragment>
    )
}   

export default TabFluxo