import { Button, Flex, Modal, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaFilter, FaPlus } from 'react-icons/fa'
import FormRelease from '../../components/FormRelease/FormRelease'
import { useContextoRelease } from '../../context/ContextoRelease'
import TableRelease from '../../components/TableRelease/TableRelease'
import { handleError } from '../../../../services/utils'
import { atualizarRelease, buscarReleasesDosProjetosDoMembro, criarRelease, excluirReleases, filtrarReleasesPeloNomeEPeloProjeto } from '../../../../services/releaseService'
import { useContextoGlobalUser } from '../../../../context/ContextoGlobalUser/ContextoGlobalUser'
import FormFilterReleases from '../../components/FormFilterReleases/FormFilterReleases'
import SelectProject from '../../components/SelectProject/SelectProject'
import { useContextoGlobalProjeto } from '../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto'
import { buscarProjetoPeloId } from '../../../../services/projetoService'
import { NotificationManager } from 'react-notifications'

const Release = () => {

    const {usuario} = useContextoGlobalUser()

    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()
    const {releaseData, setReleaseData, releases, setReleases} = useContextoRelease()
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [isTableVisible, setIsTableVisible] = useState(true)
    const {actionForm, setActionForm} = useContextoRelease()

    const handleBuscarReleasesDosProjetosDoMembro = async () => {
        const response = await buscarReleasesDosProjetosDoMembro(usuario.id)
        if (!response.error){
            setReleases(response.data)
        }
    }

    useEffect(() => {
        const fetchData = async () => {

            if (usuario && usuario.id) {
                await handleBuscarReleasesDosProjetosDoMembro()
            }
        }

        fetchData()
    }, [usuario])

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


    return (
        <div style={{height: '100vh', backgroundColor: "#FFFFFF"}} className="bloco-principal"> 
            <div style={{
                borderBottom: '1px solid #ddd',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                padding: '20px',
                backgroundColor: '#FFFFFF'
            }}> 
                <Space>
                    <h3> RELEASES </h3>
                </Space>

                <Space>
                    <Button onClick={handleAdicionarRelease} type="primary" ghost icon={<FaPlus />}> Criar Release </Button>
                </Space>

            </div>

            { isTableVisible && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    padding: '20px',
                    border: '1px solid #DDD',
                    backgroundColor: '#FFFFFF'
                }}>
                    <Flex horizontal gap="middle">
                        <Space>
                            <span style={{color: '#BDBDBD'}}>  <FaFilter/> Filtros </span>
                        </Space>
                        <Space>
                            <FormFilterReleases onChange={handleFiltrarReleases} idMembro={usuario.id}/>
                        </Space>
                    </Flex>
                </div>
            )}

            <div style={{margin: '20px'}}>

                { isFormVisible && 
                    <FormRelease 
                        onSubmit={handleSalvarRelease} 
                        onCancel={handleCancelar} 
                        selectProject={<SelectProject idMembro={usuario.id} />}
                    />
                }

                { isTableVisible && (
                    <div>
                        <TableRelease data={releases} onUpdate={handleAtualizarRelease} onDelete={handleExcluirRelease}/>
                    </div>
        

                    
                )}
            </div>
        </div>
    )
}

export default Release