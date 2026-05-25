import { Breadcrumb, Button, Modal, Space, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { IoMdCreate, IoMdTrash } from 'react-icons/io'
import { HomeOutlined } from '@ant-design/icons'
import { NotificationManager } from 'react-notifications'

import { useAuth } from '../../../../hooks/AuthProvider'

import { useContextoGlobalProjeto } from '../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto'
import { useContextoIteracao } from '../../context/contextoIteracao'

import {
    atualizarIteracao,
    buscarIteracoesDosProjetosDoMembro,
    criarIteracao,
    excluirIteracoes
} from '../../../../services/iteracaoService'

import { buscarProjetoPeloId } from '../../../../services/projetoService'
import { buscarMembroPeloUser } from '../../../../services/membroService'

import SelectProject from '../../components/SelectProject/SelectProject'
import FormFilterIteracoes from '../../components/FormFilterIteracoes/FormFilterIteracoes'
import FormIteracao from '../../components/FormIteracao/FormIteracao'
import TableIteracoes from '../../components/TableIteracoes/TableIteracoes'

import RenderStatus from '../../../../components/RenderStatus/RenderStatus'
import RenderEtapas from '../../../../components/RenderEtapas/RenderEtapas'
import RenderDate from '../../../../components/RenderDate/RenderDate'

import { optionsStatusIteracoes } from '../../../../services/optionsStatus'

import Section from '../../../../components/Section/Section'
import SectionHeader from '../../../../components/SectionHeader/SectionHeader'
import SectionFilters from '../../../../components/SectionFilters/SectionFilters'
import SectionContent from '../../../../components/SectionContent/SectionContent'


const Iteracoes = () => {

    const { user } = useAuth()

    const [membro, setMembro] = useState(null)

    const { dadosProjeto, setDadosProjeto } = useContextoGlobalProjeto()

    const {
        actionForm,
        setActionForm,
        dadosIteracao,
        setDadosIteracao,
        iteracoes,
        setIteracoes
    } = useContextoIteracao()

    const [isFormVisible, setIsFormVisible] = useState(false)
    const [isTableVisible, setIsTableVisible] = useState(true)

    const handleBuscarIteracoesDosProjetosDoMembro = async (idMembro) => {

        if (!idMembro) return

        const response = await buscarIteracoesDosProjetosDoMembro(idMembro)

        if (!response.error && !response.empty) {
            setIteracoes(response.data)
        } else {
            setIteracoes([])
        }
    }

    useEffect(() => {

        const fetchData = async () => {

            try {

                if (user?.id){

                    const responseMembro = await buscarMembroPeloUser(user.id)

                    if (!responseMembro.error && responseMembro.data){

                        const membroEncontrado = responseMembro.data

                        setMembro(membroEncontrado)

                        await handleBuscarIteracoesDosProjetosDoMembro(
                            membroEncontrado.id
                        )
                    }
                }

            } catch (error){
                NotificationManager.error(
                    'Falha ao buscar as iterações'
                )
            }
        }

        fetchData()

    }, [user])

    const handleReload = async () => {

        setIsFormVisible(false)
        setIsTableVisible(true)

        setDadosProjeto(null)
        setDadosIteracao(null)

        if (membro?.id){
            await handleBuscarIteracoesDosProjetosDoMembro(
                membro.id
            )
        }
    }

    const handleCancelar = () => {

        setIsFormVisible(false)
        setIsTableVisible(true)

        setDadosProjeto(null)
        setDadosIteracao(null)
    }

    const handleBuscarProjeto = async (id) => {

        const response = await buscarProjetoPeloId(id)

        if (!response.error){
            setDadosProjeto(response.data)
        }
    }

    const handleAdicionarIteracao = () => {

        setIsFormVisible(true)
        setIsTableVisible(false)

        setDadosIteracao(null)
        setDadosProjeto(null)

        setActionForm('create')
    }

    const handleAtualizarIteracao = async (record) => {

        await handleBuscarProjeto(record.projeto)

        setIsFormVisible(true)
        setIsTableVisible(false)

        setActionForm('update')
        setDadosIteracao(record)
    }

    const handleSalvarIteracao = async (formData) => {

        if (!dadosProjeto?.id){
            NotificationManager.warning(
                'Selecione um projeto'
            )
            return
        }

        const dadosEnviar = {
            ...formData,
            projeto: dadosProjeto.id
        }

        if (actionForm === 'create') {

            const response = await criarIteracao(
                dadosEnviar
            )

            if (!response.error){
                await handleReload()
            }

        } else if (actionForm === 'update'){

            const response = await atualizarIteracao(
                dadosIteracao.id,
                dadosEnviar
            )

            if (!response.error){
                await handleReload()
            }
        }
    }

    const handleFiltrarIteracoes = async (formData) => {

        if (!membro?.id) return

        const { nome, projeto } = formData

        if (!nome && !projeto){

            await handleBuscarIteracoesDosProjetosDoMembro(
                membro.id
            )

            return
        }

        const response = await buscarIteracoesDosProjetosDoMembro(
            membro.id
        )

        if (!response.error && response.data){

            let filteredIteracoes = response.data

            if (nome){

                filteredIteracoes = filteredIteracoes.filter(
                    iteracao =>
                        iteracao.nome
                            ?.toLowerCase()
                            .includes(nome.toLowerCase())
                )
            }

            if (projeto){

                filteredIteracoes = filteredIteracoes.filter(
                    iteracao =>
                        iteracao.projeto === projeto
                )
            }

            setIteracoes(filteredIteracoes)
        }
    }

    const handleExcluirIteracao = async (id) => {

        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir esta iteração?',
            okText: 'Sim',
            cancelText: 'Não',

            onOk: async () => {

                try {

                    await excluirIteracoes([id])

                    await handleReload()

                } catch (error){

                    NotificationManager.error(
                        'Falha ao tentar excluir a iteração'
                    )
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
                <Space>
                    {record.nome_projeto || 'Não informado'}
                </Space>
            ),
        },

        {
            title: 'Início',
            dataIndex: 'data_inicio',
            key: 'data_inicio',

            render: (_, record) => (
                <RenderDate
                    dateType="inicio"
                    dateValue={record.data_inicio}
                />
            )
        },

        {
            title: 'Término',
            dataIndex: 'data_termino',
            key: 'data_termino',

            render: (_, record) => (
                <RenderDate
                    dateType="termino"
                    dateValue={record.data_termino}
                />
            )
        },

        {
            title: 'Responsável',
            dataIndex: 'nome_responsavel',
            key: 'nome_responsavel',

            render: (_, record) => (
                <Space>
                    {record.nome_responsavel || 'Não definido'}
                </Space>
            )
        },

        {
            title: 'Etapas',
            dataIndex: 'etapas',
            key: 'etapas',

            render: (_, record) => (
                <RenderEtapas data={record.dados_etapas || []} />
            )
        },

        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',

            render: (_, record) => (
                <RenderStatus
                    optionsStatus={optionsStatusIteracoes}
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
                        <a onClick={() =>
                            handleAtualizarIteracao(record)
                        }>
                            <IoMdCreate />
                        </a>
                    </Tooltip>

                    <Tooltip title="Excluir">
                        <a onClick={() =>
                            handleExcluirIteracao(record.id)
                        }>
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
                            title: <HomeOutlined />,
                        },

                        {
                            href: `/academicflow/cronograma/iteracoes`,
                            title: 'Iterações',
                        },

                        ...(isFormVisible && actionForm === 'create'
                            ? [{ title: 'Cadastrar' }]
                            : []),

                        ...(isFormVisible && actionForm === 'update'
                            ? [{ title: 'Atualizar' }]
                            : []),
                    ]}
                />

                {!isFormVisible && (
                    <Space>

                        <Button
                            onClick={handleAdicionarIteracao}
                            type="primary"
                            icon={<FaPlus />}
                            disabled={!membro}
                        >
                            Criar Iteração
                        </Button>

                    </Space>
                )}

            </SectionHeader>

            {!isFormVisible && membro && (
                <SectionFilters>

                    <FormFilterIteracoes
                        onChange={handleFiltrarIteracoes}
                        idMembro={membro.id}
                    />

                </SectionFilters>
            )}

            <SectionContent>

                {isFormVisible && membro && (

                    <FormIteracao
                        onSubmit={handleSalvarIteracao}
                        onCancel={handleCancelar}
                        selectProject={
                            <SelectProject
                                idMembro={membro.id}
                            />
                        }
                    />
                )}

                {isTableVisible && (

                    <TableIteracoes
                        columns={columnsTable}
                        data={iteracoes}
                    />
                )}

            </SectionContent>

        </Section>
    )
}

export default Iteracoes