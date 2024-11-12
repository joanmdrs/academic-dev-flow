import { Button, Modal, Space, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaFilter, FaPlus, FaTrash } from 'react-icons/fa'
import FormRelease from '../../components/FormRelease/FormRelease'
import { useContextoRelease } from '../../context/ContextoRelease'
import TableRelease from '../../components/TableRelease/TableRelease'
import { formatDate } from '../../../../services/utils'
import { atualizarRelease, criarRelease, excluirReleases, filtrarReleasesPeloNomeEPeloProjeto, listarReleases } from '../../../../services/releaseService'
import SelectProject from '../../components/SelectProject/SelectProject'
import { useContextoGlobalProjeto } from '../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto'
import { buscarProjetoPeloId } from '../../../../services/projetoService'
import { NotificationManager } from 'react-notifications'
import RenderStatus from '../../../../components/RenderStatus/RenderStatus'
import { optionsStatusReleases } from '../../../../services/optionsStatus'
import { IoMdCreate, IoMdTrash } from 'react-icons/io'
import Titulo from '../../../../components/Titulo/Titulo'
import FormFilterReleases from '../../components/FormFilterReleases/FormFilterReleases'


const AdminReleases = () => {

    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()
    const {releaseData, setReleaseData, releases, setReleases} = useContextoRelease()
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [isFormFiltrarVisible, setIsFormFiltrarVisivel] = useState(false)
    const [isTableVisible, setIsTableVisible] = useState(true)
    const {actionForm, setActionForm} = useContextoRelease()

    const handleListarReleases = async () => {
        const response = await listarReleases()
        if (!response.error){
            setReleases(response.data)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
           await handleListarReleases()
        }

        fetchData()
    }, [])

    const handleReload = async () => {
        setIsFormFiltrarVisivel(false)
        setIsFormVisible(false)
        setIsTableVisible(true)
        setDadosProjeto(null)
        setReleaseData(null)
        await handleListarReleases()
    }

    const handleCancelar = () => {
        setIsFormFiltrarVisivel(false)
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
        setIsFormFiltrarVisivel(false)
        setIsFormVisible(true)
        setIsTableVisible(false)
        setReleaseData(null)
        setActionForm('create')
        setReleaseData(null)
        setDadosProjeto(null)
    }

    const handleAtualizarRelease = async (record) => {
        await handleBuscarProjeto(record.projeto)
        setIsFormFiltrarVisivel(false)
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
            await handleListarReleases()
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


    return (
        <div className='content'> 
            <Titulo 
                titulo="Releases"
                paragrafo="Administração > Gerenciar releases"
            />

            {!isFormVisible && (
                <div className="button-menu"> 
                    <Button 
                        type="primary"
                        icon={<FaFilter />}
                        onClick={() => setIsFormFiltrarVisivel(!isFormFiltrarVisible)}
                    >
                        Filtrar
                    </Button>
                    <div className="grouped-buttons">
                        <Button 
                            type="primary" 
                            icon={<FaPlus />} 
                            onClick={() => handleAdicionarRelease()}  

                        >
                            Criar Release
                        </Button> 
                    </div>
                </div>
                
            )}

            { isFormFiltrarVisible && (
                <div style={{padding: '20px', borderBottom: '1px solid #ddd', borderTop: '1px solid #ddd'}}>
                    <FormFilterReleases onChange={handleFiltrarReleases} />
                </div>

            )}

            <div style={{margin: '20px'}}>

                { isFormVisible && 
                    <FormRelease 
                        onSubmit={handleSalvarRelease} 
                        onCancel={handleCancelar} 
                        selectProject={<SelectProject />}
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

export default AdminReleases