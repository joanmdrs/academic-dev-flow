import { Button, Flex, Modal, Space, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import FormRelease from '../../components/FormRelease/FormRelease'
import { useContextoRelease } from '../../context/ContextoRelease'
import TableRelease from '../../components/TableRelease/TableRelease'
import { formatDate } from '../../../../services/utils'
import { atualizarRelease, buscarReleasesDosProjetosDoMembro, criarRelease, excluirReleases, filtrarReleasesPeloNomeEPeloProjeto } from '../../../../services/releaseService'
import { useContextoGlobalUser } from '../../../../context/ContextoGlobalUser/ContextoGlobalUser'
import FormFilterReleases from '../../components/FormFilterReleases/FormFilterReleases'
import SelectProject from '../../components/SelectProject/SelectProject'
import { useContextoGlobalProjeto } from '../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto'
import { buscarProjetoPeloId } from '../../../../services/projetoService'
import { NotificationManager } from 'react-notifications'
import RenderStatus from '../../../../components/RenderStatus/RenderStatus'
import { optionsStatusReleases } from '../../../../services/optionsStatus'
import { IoMdCreate, IoMdTrash } from 'react-icons/io'
import { MdFilterAlt } from 'react-icons/md'


const Release = () => {

    const {usuario} = useContextoGlobalUser()

    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [isTableVisible, setIsTableVisible] = useState(true)
    const {
        actionForm, 
        setActionForm,
        releaseData, 
        setReleaseData, 
        releases, 
        setReleases} = useContextoRelease()


    const handleBuscarReleasesDosProjetosDoMembro = async () => {
        const response = await buscarReleasesDosProjetosDoMembro(usuario.id)

        if (!response.error && !response.empty){
            setReleases(response.data)
        }
    }

    const handleReload = async () => {
        setIsFormVisible(false)
        setIsTableVisible(true)
        setDadosProjeto(null)
        setReleaseData(null)
        await handleBuscarReleasesDosProjetosDoMembro()
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
        setReleaseData(null)
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

    const handleFiltrarReleases = async (formData) => {
        const { nome, projeto } = formData;

        if (!nome && !projeto){
            await handleBuscarReleasesDosProjetosDoMembro()
        } else {
            const response = await filtrarReleasesPeloNomeEPeloProjeto(nome, projeto)
            if (!response.error){
                setReleases(response.data)
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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
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

    useEffect(() => {
        const fetchData = async () => {

            if (usuario && usuario.id) {
                await handleBuscarReleasesDosProjetosDoMembro()
            }
        }

        fetchData()
    }, [usuario])


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
                    <h2 style={{margin: 0, fontFamily: 'Poppins, sans-serif', fontWeight: '600'}}> Releases </h2>
                </Space>

                <Space>
                    <Button 
                        onClick={handleAdicionarRelease} 
                        type="primary" 
                        icon={<FaPlus />}> Criar Release </Button>
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
                            <FormFilterReleases onChange={handleFiltrarReleases} idMembro={usuario.id}/>
                        </Space>
                    </Flex>
                </div>
            )}

            <div className='pa-20'>

                { isFormVisible && 
                    <FormRelease 
                        onSubmit={handleSalvarRelease} 
                        onCancel={handleCancelar} 
                        selectProject={<SelectProject idMembro={usuario.id} />}
                    />
                }

                { isTableVisible && (
                    <div>
                        <TableRelease data={releases} columns={columnsTable}/>
                    </div>
        

                    
                )}
            </div>
        </div>
    )
}

export default Release