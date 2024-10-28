import { Button, Flex, Modal, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaFilter, FaPlus } from 'react-icons/fa'
import { handleError } from '../../../../services/utils'
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

const Iteracoes = () => {

    const {usuario} = useContextoGlobalUser()

    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()
    const {actionForm, setActionForm, dadosIteracao, setDadosIteracao, iteracoes, setIteracoes} = useContextoIteracao()
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [isTableVisible, setIsTableVisible] = useState(true)

    const handleBuscarIteracoesDosProjetosDoMembro = async () => {
        const response = await buscarIteracoesDosProjetosDoMembro(usuario.id)
        if (!response.error){
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
                    <h3> ITERAÇÕES </h3>
                </Space>

                <Space>
                    <Button 
                        onClick={handleAdicionarIteracao} 
                        type="primary" 
                        ghost 
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
                    border: '1px solid #DDD',
                    backgroundColor: '#FFFFFF'
                }}>
                    <Flex horizontal gap="middle">
                        <Space>
                            <span style={{color: '#BDBDBD'}}>  <FaFilter/> Filtros </span>
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

                { isTableVisible && (
                    <div>
                        <TableIteracoes 
                            data={iteracoes} 
                            onUpdate={handleAtualizarIteracao} 
                            onDelete={handleExcluirIteracao}
                        />
                    </div>
        

                    
                )}
            </div>
        </div>
    )
}

export default Iteracoes