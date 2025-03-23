import React, {useEffect, useState } from "react"
import { atualizarMembro, buscarMembroPeloNome, criarMembro, excluirMembro, listarGrupos, listarMembros } from "../../../../services/membroService"
import { useMembroContexto } from "../../context/MembroContexto"
import { buscarUsuarioPeloId } from "../../../../services/usuarioService"
import FormMembro from "../../components/FormMembro/FormMembro"
import { Button, Input, Modal, Space } from "antd"
import { FaPlus, FaTrash } from "react-icons/fa"
import Section from "../../../../components/Section/Section"
import SectionHeader from "../../../../components/SectionHeader/SectionHeader"
import SectionContent from "../../../../components/SectionContent/SectionContent"
import TableMembros from "../../components/TableMembros/TableMembros"
import SectionFilters from "../../../../components/SectionFilters/SectionFilters"

const { Search } = Input;

const GerenciarMembros = () => {

    const {dadosMembro, setDadosMembro, setMembros, membrosSelecionados} = useMembroContexto()
    const [acaoForm, setAcaoForm] = useState('criar')
    const [isSaveFormVisible, setIsSaveFormVisible] = useState(false)
    
    const handleListarMembros = async () => {
        const response = await listarMembros()
        if (!response.error){
            setMembros(response.data)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await handleListarMembros()
        }
        fetchData()

    }, [dadosMembro])

    const handleCancelar = () => {
        setAcaoForm('criar')
        setDadosMembro(null)
        setIsSaveFormVisible(false)
    }

    
    const handleReload = async (acao, dadosMembro) => {
        setAcaoForm(acao)
        setIsSaveFormVisible(false)
        await handleListarMembros()
        
    }

    const handleAdicionarMembro = () => {
        setDadosMembro(null)
        setIsSaveFormVisible(true)
        setAcaoForm('criar')
    }

    const handleAtualizarMembro = (record) => {
        setDadosMembro(record)
        setIsSaveFormVisible(true)
        setAcaoForm('atualizar')
    }

    const handleSalvarMembro = async (dadosForm) => {
        if (acaoForm === 'criar'){
            const response = await criarMembro(dadosForm)
            handleReload('atualizar', response.data)
        } else if (acaoForm === 'atualizar') {
            const response = await atualizarMembro(dadosMembro.id, dadosForm)
            handleReload('atualizar', response.data )
        }
    }

    const handleBuscarMembro = async (parametro) => {
        const response = await buscarMembroPeloNome(parametro)

        if (!response.error){
            setMembros(response.data.results)
        }
    }

    const handleExcluirMembros = async (ids) => {
            Modal.confirm({
                title: 'Confirmar exclusão',
                content: 'Você está seguro de que deseja excluir este(s) membro(s)?',
                okText: 'Sim',
                cancelText: 'Não',
                onOk: async () => {
                    await excluirMembro(ids);
                    handleReload()
                }
            });
        };
    
        const handleExcluirMembrosSelecionadas = async () => {
            const ids = membrosSelecionados.map(item => item.id);
            await handleExcluirMembros(ids);
        };
        
        const handleExcluirMembroUnico = async (id) => {
            await handleExcluirMembros([id]);
        };

    return (
        <Section> 

            <SectionHeader>
                <h2> Membros 
                    {isSaveFormVisible && acaoForm === "criar" && (
                        <span style={{fontSize: '16px'}}> / Cadastrar membro </span>
                    )}

                    {isSaveFormVisible && acaoForm === 'atualizar' && (
                        <span style={{fontSize: '16px'}}> / Atualizar membro </span>
                    )}


                </h2>

                { !isSaveFormVisible && (
                    <Space>
                        <Button
                            type="primary"
                            icon={<FaPlus />}
                            onClick={() => handleAdicionarMembro()}
                        >
                            Criar Membro
                        </Button>
                    </Space>
                ) }
                
            </SectionHeader>

            { !isSaveFormVisible && (
                <SectionFilters>
                    <Search
                        style={{width: '500px'}}
                        placeholder="pesquise pelo nome"
                        allowClear
                        enterButton="Pesquisar"
                        size="middle"
                        onSearch={handleBuscarMembro}
                    />

                    { membrosSelecionados.length !== 0 && (
                        <Space >
                            <Button 
                                danger 
                                type="primary" 
                                icon={<FaTrash />}
                                onClick={handleExcluirMembrosSelecionadas}
                            > 
                                Excluir
                            </Button>
                        </Space>
                    )}

                </SectionFilters>
            )}

            <SectionContent>
                
                {isSaveFormVisible &&  (
                    <FormMembro onSubmit={handleSalvarMembro} onCancel={handleCancelar}/>
                )}

                {!isSaveFormVisible && (
                    <TableMembros onUpdate={handleAtualizarMembro} onDelete={handleExcluirMembroUnico}/>
                )}

            </SectionContent>
        </Section>
    )
 
}

export default GerenciarMembros