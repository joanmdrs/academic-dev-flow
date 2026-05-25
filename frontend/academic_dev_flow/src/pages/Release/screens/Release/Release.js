import { Breadcrumb, Button, Modal, Space, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { IoMdCreate, IoMdTrash } from 'react-icons/io'
import { HomeOutlined } from '@ant-design/icons'
import { NotificationManager } from 'react-notifications'

import FormRelease from '../../components/FormRelease/FormRelease'
import TableRelease from '../../components/TableRelease/TableRelease'
import FormFilterReleases from '../../components/FormFilterReleases/FormFilterReleases'
import SelectProject from '../../components/SelectProject/SelectProject'

import { useContextoRelease } from '../../context/ContextoRelease'
import { useContextoGlobalProjeto } from '../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto'

import { useAuth } from '../../../../hooks/AuthProvider'

import {
    atualizarRelease,
    buscarReleasesDosProjetosDoMembro,
    criarRelease,
    excluirReleases
} from '../../../../services/releaseService'

import { buscarProjetoPeloId } from '../../../../services/projetoService'
import { buscarMembroPeloUser } from '../../../../services/membroService'
import { formatDate } from '../../../../services/utils'

import RenderStatus from '../../../../components/RenderStatus/RenderStatus'
import { optionsStatusReleases } from '../../../../services/optionsStatus'

import Section from '../../../../components/Section/Section'
import SectionHeader from '../../../../components/SectionHeader/SectionHeader'
import SectionFilters from '../../../../components/SectionFilters/SectionFilters'
import SectionContent from '../../../../components/SectionContent/SectionContent'


const Release = () => {
    const { dadosProjeto, setDadosProjeto } = useContextoGlobalProjeto()

    const {
        actionForm,
        setActionForm,
        releaseData,
        setReleaseData,
        releases,
        setReleases
    } = useContextoRelease()

    const { user } = useAuth()

    const [membro, setMembro] = useState(null)
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [isTableVisible, setIsTableVisible] = useState(true)

    const handleBuscarReleasesDosProjetosDoMembro = async (idMembro) => {
        if (!idMembro) return

        const response = await buscarReleasesDosProjetosDoMembro(idMembro)

        if (!response.error && !response.empty) {
            setReleases(response.data)
        } else {
            setReleases([])
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user?.id) {
                    const responseMembro = await buscarMembroPeloUser(user.id)

                    if (!responseMembro.error && responseMembro.data) {
                        const membroEncontrado = responseMembro.data

                        setMembro(membroEncontrado)

                        await handleBuscarReleasesDosProjetosDoMembro(
                            membroEncontrado.id
                        )
                    }
                }
            } catch (error) {
                NotificationManager.error('Falha ao buscar os lançamentos')
            }
        }

        fetchData()
    }, [user])

    const handleReload = async () => {
        setIsFormVisible(false)
        setIsTableVisible(true)
        setDadosProjeto(null)
        setReleaseData(null)

        if (membro?.id) {
            await handleBuscarReleasesDosProjetosDoMembro(membro.id)
        }
    }

    const handleCancelar = () => {
        setIsFormVisible(false)
        setIsTableVisible(true)
        setDadosProjeto(null)
        setReleaseData(null)
    }

    const handleBuscarProjeto = async (id) => {
        const response = await buscarProjetoPeloId(id)
        setDadosProjeto(response.data)
    }

    const handleAdicionarRelease = () => {
        setIsFormVisible(true)
        setIsTableVisible(false)
        setReleaseData(null)
        setActionForm('create')
        setDadosProjeto(null)
    }

    const handleAtualizarRelease = async (record) => {
        await handleBuscarProjeto(record.projeto)

        setIsFormVisible(true)
        setIsTableVisible(false)
        setActionForm('update')
        setReleaseData(record)
    }

    const handleSalvarRelease = async (formData) => {
        if (!dadosProjeto?.id) {
            NotificationManager.warning('Selecione um projeto antes de salvar.')
            return
        }

        const dadosEnviar = {
            ...formData,
            projeto: dadosProjeto.id
        }

        if (actionForm === 'create') {
            const response = await criarRelease(dadosEnviar)

            if (!response.error) {
                await handleReload()
            }
        } else if (actionForm === 'update') {
            const response = await atualizarRelease(releaseData.id, dadosEnviar)

            if (!response.error) {
                await handleReload()
            }
        }
    }

    const handleFiltrarReleases = async (formData) => {
        if (!membro?.id) return

        const { nome, projeto } = formData

        if (!nome && !projeto) {
            await handleBuscarReleasesDosProjetosDoMembro(membro.id)
            return
        }

        const response = await buscarReleasesDosProjetosDoMembro(membro.id)

        if (!response.error && response.data) {
            let filteredReleases = response.data

            if (nome) {
                filteredReleases = filteredReleases.filter(release =>
                    release.nome?.toLowerCase().includes(nome.toLowerCase())
                )
            }

            if (projeto) {
                filteredReleases = filteredReleases.filter(release =>
                    release.projeto === projeto
                )
            }

            setReleases(filteredReleases)
        }
    }

    const handleExcluirRelease = async (id) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir este lançamento?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                try {
                    await excluirReleases([id])
                    await handleReload()
                } catch (error) {
                    NotificationManager.error('Falha ao tentar excluir o lançamento')
                }
            }
        })
    }

    const columnsTable = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome'
        },
        {
            title: 'Projeto',
            dataIndex: 'projeto',
            key: 'projeto',
            render: (_, record) => (
                <Space>{record.nome_projeto || 'Não informado'}</Space>
            )
        },
        {
            title: 'Lançamento',
            dataIndex: 'data_lancamento',
            key: 'data_lancamento',
            render: (_, record) => (
                <Space>
                    {record.data_lancamento
                        ? formatDate(record.data_lancamento)
                        : 'Não informado'}
                </Space>
            )
        },
        {
            title: 'Responsável',
            dataIndex: 'responsavel',
            key: 'responsavel',
            render: (_, record) => (
                <Space>{record.nome_responsavel || 'Não definido'}</Space>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => (
                <RenderStatus
                    optionsStatus={optionsStatusReleases}
                    propStatus={record.status}
                />
            )
        },
        {
            title: 'Ações',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Editar">
                        <a onClick={() => handleAtualizarRelease(record)}>
                            <IoMdCreate />
                        </a>
                    </Tooltip>

                    <Tooltip title="Excluir">
                        <a onClick={() => handleExcluirRelease(record.id)}>
                            <IoMdTrash />
                        </a>
                    </Tooltip>
                </Space>
            )
        }
    ]

    return (
        <Section>
            <SectionHeader>
                <Breadcrumb
                    items={[
                        {
                            href: `/academicflow/home`,
                            title: <HomeOutlined />
                        },
                        {
                            href: `/academicflow/cronograma/lancamentos`,
                            title: 'Lançamentos'
                        },
                        ...(isFormVisible && actionForm === 'create'
                            ? [{ title: 'Cadastrar' }]
                            : []),
                        ...(isFormVisible && actionForm === 'update'
                            ? [{ title: 'Atualizar' }]
                            : [])
                    ]}
                />

                {!isFormVisible && (
                    <Space>
                        <Button
                            onClick={handleAdicionarRelease}
                            type="primary"
                            icon={<FaPlus />}
                            disabled={!membro}
                        >
                            Cadastrar Lançamento
                        </Button>
                    </Space>
                )}
            </SectionHeader>

            {!isFormVisible && membro && (
                <SectionFilters>
                    <FormFilterReleases
                        onChange={handleFiltrarReleases}
                        idMembro={membro.id}
                    />
                </SectionFilters>
            )}

            <SectionContent>
                {isFormVisible && membro && (
                    <FormRelease
                        onSubmit={handleSalvarRelease}
                        onCancel={handleCancelar}
                        selectProject={
                            <SelectProject idMembro={membro.id} />
                        }
                    />
                )}

                {isTableVisible && (
                    <TableRelease
                        data={releases}
                        columns={columnsTable}
                    />
                )}
            </SectionContent>
        </Section>
    )
}

export default Release