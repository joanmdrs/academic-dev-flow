import React, { useEffect, useState } from "react";
import { Table, Form, Select, Modal, Button } from "antd";
import { buscarFluxoPeloId, listarFluxos } from "../../../../../services/fluxoService"; 
import { buscarEtapaPeloId, buscarEtapaPeloNome } from "../../../../../services/etapaService";
import BotaoAdicionar from "../../../../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoExcluir from "../../../../../components/Botoes/BotaoExcluir/BotaoExcluir";
import {  desvincularEtapaFluxo, listarEtapasPorFluxo, vincularEtapaFluxo } from "../../../../../services/fluxoEtapaService";
import ModalSelecionarObjetos from "../../../../../components/Modals/ModalSelecionarObjetos/ModalSelecionarObjetos";
import { useContextoFluxo } from "../../../context/ContextoFluxo";
import { handleError, handleInfo } from "../../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../../services/messages";
import { FaLink, FaTrash } from "react-icons/fa";

const TabVincularEtapas = () => {

    const [etapasVinculadas, setEtapasVinculadas] = useState([])
    const [optionsFluxos, setOptionsFluxos] = useState([]);
    const {dadosFluxo, setDadosFluxo} = useContextoFluxo()
    const [isModalVisivel, setIsModalVisivel] = useState(false)
    const [etapasExcluir, setEtapasExcluir] = useState([])
    
    const COLUNAS_TABELA = [
        { title: "Código", dataIndex: "id", key: "id" },
        { title: "Nome", dataIndex: "nome", key: "nome" },
        { title: "Descrição", dataIndex: "descricao", key: "descricao"}
    ];

    const handleExibirModal = () => setIsModalVisivel(true)
    const handleFecharModal = () =>  setIsModalVisivel(false)

    const handleListarFluxos = async () => {
        try {
            const response = await listarFluxos();
            const resultados = response.data.map((item) => ({
                value: item.id,
                label: item.nome,
            }));
            setOptionsFluxos(resultados);
        } catch (error) {
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
        }
    };

    const handleListarEtapasPorFluxo = async (idFluxo) => {
        const response = await listarEtapasPorFluxo(idFluxo);

        if (!response.error) {
            const etapasVinculadas = response.data 

            if (etapasVinculadas.length === 0) {
                setEtapasVinculadas([])

            } else {
                const promisesEtapas = await Promise.all(etapasVinculadas.map(async (fluxoEtapa) => {
                    const resEtapa = await buscarEtapaPeloId(fluxoEtapa.etapa);
                    return {
                        id: fluxoEtapa.id,
                        fluxo: fluxoEtapa.fluxo,
                        etapa: fluxoEtapa.etapa,
                        nome: resEtapa.data.nome,
                        descricao: resEtapa.data.descricao,
                    };
                }));
        
                setEtapasVinculadas(promisesEtapas);
            }
        }
    };
  
    const handleSelecionarFluxo = async (value) => {

        if (value !== undefined) {
            const response = await buscarFluxoPeloId(value)
            if(!response.error){
                setDadosFluxo(response.data);
                await handleListarEtapasPorFluxo(value);
            }
        } else {
            setDadosFluxo(null)
        }    
    };

    const handleBuscarEtapas = async (parametro) => {
        const response = await buscarEtapaPeloNome(parametro)
        return response
    }

    const handleSelecionarEtapas = async (dados) => {
        const dadosEnviar = dados.map((item) => {
            return {
                fluxo: dadosFluxo.id,
                etapa: item.id,
            };
        });

        const response = await vincularEtapaFluxo(dadosEnviar);

        if (!response.error) {
            await handleListarEtapasPorFluxo(dadosFluxo.id);
        }
    };

    const handleExcluirEtapas = async () => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir este(s) item(s) ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {

                if (etapasExcluir.length > 0){
                    const ids = etapasExcluir.map((item) => item.etapa)
                    await desvincularEtapaFluxo(dadosFluxo.id, ids)
                    await handleListarEtapasPorFluxo(dadosFluxo.id)
                } else {
                    return handleInfo(null, "Não há etapas para excluir !")
                }
            }
        });
    };

    useEffect(() => {
        handleListarFluxos();
    }, []);


    const rowSelection = {
        onChange: (selectedRowsKeys, selectedRows) => {
        setEtapasExcluir(selectedRows)
        },
    };

    return (
        <div className="global-form">
            <Form layout="vertical">
                <Form.Item>
                    <Select
                        style={{width: "50%"}}
                        onChange={handleSelecionarFluxo}
                        allowClear
                        defaultValue="Selecione o fluxo"
                        options={optionsFluxos}
                    />
                </Form.Item>
            </Form>

            <div>
                { dadosFluxo !== null ? 
                    (
                        <React.Fragment>
                            <div style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: "10px",
                                margin: "20px"
                            }}> 
                                <Button 
                                    type="primary" 
                                    icon={<FaLink />} 
                                    onClick={() => handleExibirModal()}> 
                                    Vincular etapas 
                                </Button>

                                <Button 
                                    type="primary"
                                    danger
                                    icon={<FaTrash />}
                                    onClick={() => handleExcluirEtapas()}
                                    disabled={etapasExcluir.length === 0 ? true : false}
                                >
                                    Excluir
                                </Button>
                            </div>

                            <ModalSelecionarObjetos
                                title="Buscar etapas" 
                                onOk={handleBuscarEtapas}
                                onCancel={handleFecharModal}
                                onSelect={handleSelecionarEtapas}
                                colunas={COLUNAS_TABELA}
                                status={isModalVisivel}
                            />

                            <Table
                                columns={COLUNAS_TABELA}
                                dataSource={etapasVinculadas}
                                rowSelection={rowSelection}
                                rowKey="id"
                            />
                        </React.Fragment>
                    )

                : null }  
            </div>
        </div>
    );
};

export default TabVincularEtapas;
