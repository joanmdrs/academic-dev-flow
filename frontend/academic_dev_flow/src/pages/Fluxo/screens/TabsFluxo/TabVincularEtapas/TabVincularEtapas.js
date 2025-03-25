import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Form, Modal, Select, Space, Tooltip } from "antd";
import { listarFluxos } from "../../../../../services/fluxoService"; 

import { useContextoFluxo } from "../../../context/ContextoFluxo";
import { FaFilter, FaPlus } from "react-icons/fa6";
import FormVincularEtapas from "../../../components/FormVincularEtapas/FormVincularEtapas";
import { atualizarFluxoEtapa, desvincularEtapaFluxo, listarEtapasPorFluxo, listarFluxoEtapas, vincularEtapaFluxo } from "../../../../../services/fluxoEtapaService";
import TableFluxoEtapas from "../../../components/TableFluxoEtapas/TableFluxoEtapas";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { NotificationManager } from "react-notifications";
import { filterOption, limitarCaracteres } from "../../../../../services/utils";
import SectionHeader from "../../../../../components/SectionHeader/SectionHeader";
import SectionContent from "../../../../../components/SectionContent/SectionContent";
import { HomeOutlined } from "@ant-design/icons";

const TabVincularEtapas = ({grupo}) => {

    const [isSaveFormVisible, setIsSaveFormVisible] = useState(false)
    const [isTableVisible, setIsTableVisible] = useState(true)
    const [optionsFluxos, setOptionsFluxos] = useState([])
    const {fluxoEtapas, setFluxoEtapas, dadosFluxoEtapa, setDadosFluxoEtapa} = useContextoFluxo()
    const [actionForm, setActionForm] = useState('create')

    const handleCancelar = async () => {
        await handleReload()
    }

    const handleReload = async () => {
        await handleListarFluxoEtapas()
        setIsSaveFormVisible(false)
        setIsTableVisible(true)
    }

    const handleListarFluxoEtapas = async () => {
        const response = await listarFluxoEtapas()
        if (!response.error){
            setFluxoEtapas(response.data)
        }
    }

    const handleListarEtapasPorFluxo = async (idFluxo) => {

        if (idFluxo) {
            const response = await listarEtapasPorFluxo(idFluxo)
            if (!response.error && response.data.length !== 0){
                setFluxoEtapas(response.data)
                setIsTableVisible(true)
            } else {
                setIsTableVisible(false)
                NotificationManager.info('O fluxo selecionado não possui nenhuma etapa vinculada !')
            }
        } else {
            await handleReload()
        }
        
    }

    const handleVincularEtapaAoFluxo = async () => {
        setIsSaveFormVisible(true)        
        setIsTableVisible(false)
        setDadosFluxoEtapa(null)
        setActionForm('create')
    }

    const handleAtualizarFluxoEtapa = async (record) => {
        setDadosFluxoEtapa(record)
        setIsSaveFormVisible(true)
        setIsTableVisible(false)
        setActionForm('update')
    }

    const handleSalvarFluxoEtapa = async (dataForm) => {

        if (actionForm === 'create'){
            const response = await vincularEtapaFluxo(dataForm)

            if (!response.error){
                await handleReload()
            }
        } else if (actionForm === 'update') {
            const response = await atualizarFluxoEtapa(dadosFluxoEtapa.id, dataForm)
            if (!response.error){
                await handleReload()
            }
        }
    }

    const handleExcluirFluxoEtapa = async (ids) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja desvincular esta etapa do fluxo  ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                await desvincularEtapaFluxo([ids]);
                await handleReload()
            }
        });
    }
    

    useEffect(() => {
        const fetchData = async () => {

            await handleListarFluxoEtapas()

            const response = await listarFluxos()
            if (!response.error){
                const resultados = response.data.map((item) => ({
                    value: item.id,
                    label: item.nome
                }))
                setOptionsFluxos(resultados)
            }
        }

        fetchData()
    }, [])

    const columnsTable = [
        {
            title: 'Fluxo',
            dataIndex: 'nome_fluxo',
            key: 'nome_fluxo'
        },
        {
            title: 'Etapa',
            dataIndex: 'nome_etapa',
            key: 'nome_etapa'
        }, 
        {
            title: 'Ordem',
            dataIndex: 'ordem_no_fluxo',
            key: 'ordem_no_fluxo',
            align: 'center'
        },
        {
            title: 'Descrição',
            dataIndex: 'descricao_etapa',
            key: 'descricao_etapa',
            render: (_, record) => (
                <span> {limitarCaracteres(record.descricao_etapa, 200)}</span>
            )
        }, 
        {
            title: "Ações",
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Editar">
                        <span 
                            style={{color: 'var(--primary-color)', cursor: 'pointer'}}  
                            onClick={() => handleAtualizarFluxoEtapa(record)}
                        ><IoMdCreate /></span>
                    </Tooltip>
                    <Tooltip title="Excluir">
                        <span 
                            style={{color: 'var(--primary-color)', cursor: 'pointer'}} 
                            onClick={() => handleExcluirFluxoEtapa(record.id)}
                        ><IoMdTrash /></span>
                    </Tooltip>
                </Space>
            )
        }
    ]

    return (
        <div>
            <SectionHeader>
                <Breadcrumb
                    items={[
                        {
                            href: `/academicflow/${grupo}/home`,
                            title: <HomeOutlined />,
                        },
                        {
                            href: `/academicflow/${grupo}/fluxos/gerenciar`,
                            title: 'Etapas por fluxo',
                        },
                        ...(isSaveFormVisible && actionForm === 'create'
                            ? [{ title: 'Cadastrar' }]
                            : []),
                        ...(isSaveFormVisible && actionForm === 'update'
                            ? [{ title: 'Atualizar' }]
                            : []),
                    ]}
                />
            </SectionHeader>

            {!isSaveFormVisible && (
                <div 
                    style={{
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        paddingTop: '30px', 
                        paddingBottom: '30px',
                        paddingLeft: '20px',
                        paddingRight: '20px'
                    }}
                > 
                    <Select 
                        style={{width: '250px'}}
                        options={optionsFluxos} 
                        allowClear
                        placeholder="Filtrar pelo fluxo"
                        popupMatchSelectWidth={false}
                        showSearch
                        onChange={handleListarEtapasPorFluxo}
                        filterOption={filterOption}
                    />
                    <Button 
                        icon={<FaPlus />} 
                        type="primary" 
                        onClick={handleVincularEtapaAoFluxo}
                    > 
                        Vincular etapas
                    </Button>
                </div>
            )}

            <SectionContent>
                {isSaveFormVisible ? (
                    <FormVincularEtapas onCancel={handleCancelar} onSubmit={handleSalvarFluxoEtapa} />

                ) : (
                    <TableFluxoEtapas data={fluxoEtapas} columns={columnsTable} />

                )}
            </SectionContent>
        </div>
    );
};

export default TabVincularEtapas;
