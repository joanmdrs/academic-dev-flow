import { Button, Modal, Space, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

import { IoMdCreate, IoMdTrash } from "react-icons/io";

import { NotificationManager } from "react-notifications";
import { formatDate } from "../../../../../../services/utils";
import RenderStatus from "../../../../../../components/RenderStatus/RenderStatus";
import { optionsStatusReleases } from "../../../../../../services/optionsStatus";
import { useContextoGlobalProjeto } from "../../../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { useContextoRelease } from "../../../../../Release/context/ContextoRelease";
import { atualizarRelease, criarRelease, excluirReleases, listarReleasesPorProjeto } from "../../../../../../services/releaseService";
import FormRelease from "../../../../../Release/components/FormRelease/FormRelease";
import TableRelease from "../../../../../Release/components/TableRelease/TableRelease"

const Releases = () => {

    const columnsTableReleases = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome'
        },
        
        {
            title: 'Lançamento',
            dataIndex: 'data_lancamento',
            key: 'data_lancamento',
            render: (_, record) => (
                <Space>
                    {formatDate(record.data_lancamento)}
                </Space>
            )
        },
        {
            title: 'Responsável',
            dataIndex: 'responsavel',
            key: 'responsavel',
            render: (_, record) => (
                <Space>
                    {record.nome_responsavel}
                </Space>
            )
        },
        {
            title: 'Etapa',
            dataIndex: 'etapa',
            key: 'etapa',
            render: (_, record) => (
                <Space>
                    {record.nome_etapa}
                </Space>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (_, record) => (
                <RenderStatus optionsStatus={optionsStatusReleases} propStatus={record.status} /> 
            )
        },
        {
            title: 'Ações',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Editar">
                        <a onClick={() => handleAtualizarRelease(record)}><IoMdCreate /></a>
                    </Tooltip>
                    <Tooltip title="Excluir">
                        <a onClick={() => handleExcluirRelease(record.id)}><IoMdTrash /></a>
                    </Tooltip>
                </Space>
            )
        }
    ]

    const [isFormReleaseVisible, setIsFormReleaseVisible] = useState(false)
    const [releases, setReleases] = useState([])
    const {dadosProjeto} = useContextoGlobalProjeto()
    const [actionForm, setActionForm] = useState("create")
    const {releaseData, setReleaseData} = useContextoRelease()

    const handleBuscarReleases = async () => {
        const response = await listarReleasesPorProjeto(dadosProjeto.id)
        if (!response.error){
            setReleases(response.data)
        }
    }
    
    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto){
                await handleBuscarReleases()
            }
        }

        fetchData()
    }, [dadosProjeto])

    const handleCancelar = () => {
        setIsFormReleaseVisible(false)
    }

    const handleReload = async () => {
        setIsFormReleaseVisible(false)
        await handleBuscarReleases()
    }

    const handleAdicionarRelease = () => {
        setIsFormReleaseVisible(true)
        setActionForm('create')
        setReleaseData(null)
    }

    const handleAtualizarRelease = async (record) => {
        setIsFormReleaseVisible(true)
        setActionForm('update')
        setReleaseData(record)
    }
    
    const handleSalvarRelease = async (formData) => {

        formData['projeto'] = dadosProjeto.id
        if (actionForm === 'create') {
            const response = await criarRelease(formData)
            if (!response.error){
                await handleReload()
            }
        } else if (actionForm === 'update'){
            const response = await atualizarRelease(releaseData.id, formData)
            if (!response.error){
                await handleReload()
            }
        }
    }

    const handleExcluirRelease = async (id) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir esta release ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                try {
                    await excluirReleases([id]);
                    await handleReload()

                } catch (error) {
                    NotificationManager.error('Falha ao tentar excluir o artefato');
                } 
            }
        });
    };


    return (
        <div>
            
            <div className="df jc-end w-100 mt-10 mb-10">
                <Button onClick={() => handleAdicionarRelease()} type="primary" icon={<FaPlus />}> Criar Release </Button>
            </div>

            { isFormReleaseVisible ? (
                <FormRelease onSubmit={handleSalvarRelease} onCancel={handleCancelar} />
            ) : <TableRelease columns={columnsTableReleases} data={releases} /> }

        </div>
    )
}

export default Releases