import { Button, Flex, Modal, Space, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useContextoGlobalUser } from '../../../../context/ContextoGlobalUser/ContextoGlobalUser'
import SelectProject from '../../components/SelectProject/SelectProject'
import { useContextoGlobalProjeto } from '../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto'
import { buscarProjetoPeloId } from '../../../../services/projetoService'
import { NotificationManager } from 'react-notifications'
import { useContextoIteracao } from '../../context/contextoIteracao'
import { atualizarIteracao, buscarIteracoesDosProjetosDoMembro, criarIteracao, excluirIteracoes, filtrarIteracoesPeloNomeEPeloProjeto } from '../../../../services/iteracaoService'
import FormFilterIteracoes from '../../components/FormFilterIteracoes/FormFilterIteracoes'
import FormIteracao from '../../components/FormIteracao/FormIteracao'
import TableIteracoes from '../../components/TableIteracoes/TableIteracoes'
import RenderStatus from '../../../../components/RenderStatus/RenderStatus'
import { optionsStatusIteracoes } from '../../../../services/optionsStatus'
import { IoMdCreate, IoMdTrash } from 'react-icons/io'
import { formatDate } from '../../../../services/utils'
import RenderEtapas from '../../../../components/RenderEtapas/RenderEtapas'
import { MdFilterAlt } from 'react-icons/md'

const Iteracoes = () => {

    const {usuario} = useContextoGlobalUser()

    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()
    const {actionForm, setActionForm, dadosIteracao, setDadosIteracao, iteracoes, setIteracoes} = useContextoIteracao()
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [isTableVisible, setIsTableVisible] = useState(true)
    const [isDrawerVisible, setIsDrawerVisible] = useState(false)

    const handleBuscarIteracoesDosProjetosDoMembro = async () => {
        const response = await buscarIteracoesDosProjetosDoMembro(usuario.id)

        if (!response.error && !response.empty){
            setIteracoes(response.data)
        }
    }

    useEffect(() => {
        const fetchData = async () => {

            if (usuario && usuario.id) {
                await handleBuscarIteracoesDosProjetosDoMembro()
            }
        }

        fetchData()
    }, [usuario])

    const handleReload = async () => {
        setIsFormVisible(false)
        setIsTableVisible(true)
        setDadosProjeto(null)
        setDadosIteracao(null)
        await handleBuscarIteracoesDosProjetosDoMembro()
    }

    const handleCancelar = () => {
        setIsFormVisible(false)
        setIsTableVisible(true)
        setDadosProjeto(null)
        setDadosIteracao(null)
    }

    const handleBuscarProjeto = async (id) => {
        const response = await buscarProjetoPeloId(id)
        setDadosProjeto(response.data)
    }

    const handleAdicionarIteracao = () => {
        setIsFormVisible(true)
        setIsTableVisible(false)
        setDadosIteracao(null)
        setActionForm('create')
        setDadosProjeto(null)
    }

    const handleAtualizarIteracao = async (record) => {
        await handleBuscarProjeto(record.projeto)
        setIsFormVisible(true)
        setIsTableVisible(false)
        setActionForm('update')
        setDadosIteracao(record)
    }
    
    const handleSalvarIteracao = async (formData) => {

        formData['projeto'] = dadosProjeto.id
        if (actionForm === 'create') {
            const response = await criarIteracao(formData)
            if (!response.error){
                await handleReload()
            }
        } else if (actionForm === 'update'){
            const response = await atualizarIteracao(dadosIteracao.id, formData)
            if (!response.error){
                await handleReload()
            }
        }
    }

    const handleFiltrarIteracoes = async (formData) => {
        const { nome, projeto } = formData;

        if (!nome && !projeto){
            await handleBuscarIteracoesDosProjetosDoMembro()
        } else {
            const response = await filtrarIteracoesPeloNomeEPeloProjeto(nome, projeto)
            if (!response.error){
                setIteracoes(response.data)
            }
        }
    }

    const handleExcluirIteracao = async (id) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir esta iteração ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                try {
                    await excluirIteracoes([id]);
                    await handleReload()

                } catch (error) {
                    NotificationManager.error('Falha ao tentar excluir o artefato');
                } 
            }
        });
    };

    const handleVisualizarIteracao = () => {

        
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
                <Space> {record.nome_projeto} </Space>
            ),
        },
        
        {
            title: 'Início',
            dataIndex: 'data_inicio',
            key: 'data_inicio',
            render: (_, record) => (
                <Space>
                    {formatDate(record.data_inicio)}
                </Space>
            )
        },
        {
            title: 'Término',
            dataIndex: 'data_termino',
            key: 'data_termino',
            render: (_, record) => (
                <Space>
                    {formatDate(record.data_termino)}
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
            title: 'Etapas',
            dataIndex: 'etapas',
            key: 'etapas',
            render: (_, record) => (
                <RenderEtapas data={record.dados_etapas} />
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (_, record) => (
                <RenderStatus optionsStatus={optionsStatusIteracoes} propStatus={record.status} /> 
            )
        },
        {
            title: 'Ações',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Editar">
                        <a onClick={() => handleAtualizarIteracao(record)}><IoMdCreate /></a>
                    </Tooltip>
                    <Tooltip title="Excluir">
                        <a onClick={() => handleExcluirIteracao(record.id)}><IoMdTrash /></a>
                    </Tooltip>
                </Space>
            )
        }
    ]


    return (
        <div className='content'> 
            <div style={{
                borderBottom: '1px solid #ddd',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                padding: '20px',
                backgroundColor: '#FFFFFF'
            }}> 
                <Space>
                    <h2 style={{margin: 0, fontFamily: 'Poppins, sans-serif', fontWeight: '600'}}> Iterações </h2>
                </Space>

                <Space>
                    <Button 
                        onClick={handleAdicionarIteracao} 
                        type="primary" 
                        ghost 
                        size="large"
                        icon={<FaPlus />}
                    > Criar Iteração 
                    </Button>
                </Space>

            </div>

            { isTableVisible && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    padding: '20px',
                    borderBottom: '1px solid #DDD',
                    backgroundColor: '#FFFFFF'
                }}>
                    <Flex horizontal gap="middle">
                        <Space>
                            <div> 
                                <p 
                                    style={{
                                        color: "var(--border-color)", 
                                        display: 'flex', 
                                        alignItems: 'center'
                                    }}
                                > <MdFilterAlt size={"20px"} /> Filtros </p>
                            </div>
                        </Space>
                        <Space>
                            <FormFilterIteracoes onChange={handleFiltrarIteracoes} idMembro={usuario.id}/>
                        </Space>
                    </Flex>
                </div>
            )}

            <div style={{margin: '20px'}}>

                { isFormVisible && 
                    <FormIteracao 
                        onSubmit={handleSalvarIteracao} 
                        onCancel={handleCancelar} 
                        selectProject={<SelectProject idMembro={usuario.id} />}
                    />
                }

                {(iteracoes && isTableVisible) && (
                    <div>
                        <TableIteracoes 
                            columns={columnsTable}
                            data={iteracoes}   
                        />
                    </div>
        

                    
                )}
            </div>
        </div>
    )
}

export default Iteracoes