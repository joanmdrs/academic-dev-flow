import React, {useEffect, useState } from "react"
import Titulo from "../../../../components/Titulo/Titulo"
import BotaoAdicionar from "../../../../components/Botoes/BotaoAdicionar/BotaoAdicionar"
import BotaoExcluir from "../../../../components/Botoes/BotaoExcluir/BotaoExcluir"
import BotaoBuscar from "../../../../components/Botoes/BotaoBuscar/BotaoBuscar"
import ModalDeBusca from "../../../../components/Modals/ModalDeBusca/ModalDeBusca"
import { atualizarMembro, buscarMembroPeloNome, criarMembro, excluirMembro } from "../../../../services/membroService"
import FormMembro from "../FormMembro/FormMembro"
import { useMembroContexto } from "../../context/MembroContexto"
import { buscarUsuarioPeloId } from "../../../../services/usuarioService"
import Loading from "../../../../components/Loading/Loading"

const GerenciarMembros = () => {

    const COLUNAS_MODAL = [
        {
            title: "Código",
            key: "codigo",
            dataIndex: "id",
        },
        {
            title: "Nome",
            dataIndex: "nome",
            key: "nome",
            render: (text, record) => (
                <span
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => handleSelecionarMembro(record)}
                >
                {text}
                </span>
            ),
        },
        {
            title: "Grupo",
            dataIndex: "grupo",
            key: "grupo",
        },
    ];

    const {dadosMembro, setDadosMembro} = useMembroContexto()
    const [acaoForm, setAcaoForm] = useState('criar')
    const [isFormVisivel, setIsFormVisivel] = useState(false)
    const [isModalVisivel, setIsModalVisivel] = useState(false)
    const [isPlusBtnEnabled, setIsPlusBtnEnabled] = useState(false)
    const [isTrashBtnEnabled, setIsTrashBtnEnabled] = useState(true)
    const [isSearchBtnEnabled, setIsSearchBtnEnabled] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 1000));
            } catch (error) {
                
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [dadosMembro])

    if (loading) {
        return <Loading />
    }
     
    const handleFecharModal = () => setIsModalVisivel(false)
    const handleAbrirModal = () => setIsModalVisivel(true)

    const handleCancelar = () => {
        setAcaoForm('criar')
        setDadosMembro(null)
        setIsFormVisivel(false)
        setIsModalVisivel(false)
        setIsPlusBtnEnabled(false)
        setIsTrashBtnEnabled(true)
        setIsSearchBtnEnabled(false)
        setLoading(false)
    }

    const handleOrganizarDados = async (dados) => {
        const response = await buscarUsuarioPeloId(dados.usuario)
        dados['usuario'] = response.data.username
        dados['senha'] = response.data.password
        setDadosMembro(dados)
    }
    
    const handleReload = async (acao, dadosMembro) => {
        await handleOrganizarDados(dadosMembro)
        setAcaoForm(acao)
        setIsPlusBtnEnabled(false)
        setIsTrashBtnEnabled(true)
        setIsSearchBtnEnabled(false)
    }

    const handleSelecionarMembro = async (dados) => {
        await handleOrganizarDados(dados)
        setAcaoForm('atualizar')
        setIsFormVisivel(true)
        setIsModalVisivel(false)
        setIsTrashBtnEnabled(false)
    }

    const handleAdicionarMembro = () => {
        setDadosMembro(null)
        setIsFormVisivel(true)
        setIsModalVisivel(false)
        setAcaoForm('criar')
        setIsPlusBtnEnabled(true)
        setIsTrashBtnEnabled(true)
        setIsSearchBtnEnabled(true)
    }

    const handleSalvarMembro = async (dados) => {
        if (acaoForm === 'criar'){
            const response = await criarMembro(dados)
            handleReload('atualizar', response.data)
        } else if (acaoForm === 'atualizar') {
            const response = await atualizarMembro(dadosMembro.id, dados)
            handleReload('atualizar', response.data )
        }
    }

    const handleBuscarMembro = async (parametro) => {
        const response = await buscarMembroPeloNome(parametro)
        return response
    }

    const handleExcluirMembro = async () => {
        await excluirMembro(dadosMembro.id)
        handleCancelar()
    }

    return (
        <div> 
        
            <Titulo 
                titulo='Membros'
                paragrafo='Membros > Gerenciar membros'
            />

            <div className='two-buttons'>
                <BotaoAdicionar funcao={handleAdicionarMembro} status={isPlusBtnEnabled}/>
                <BotaoExcluir funcao={handleExcluirMembro} status={isTrashBtnEnabled}/>
            </div>

            <BotaoBuscar nome="BUSCAR MEMBRO" funcao={handleAbrirModal} status={isSearchBtnEnabled}/>

            <ModalDeBusca  
                titulo="Buscar membro" 
                label="Nome do membro"
                name="name-membro"
                onCancel={handleFecharModal}
                onOk={handleBuscarMembro}
                status={isModalVisivel}
                colunas={COLUNAS_MODAL}
            />
                        
            {isFormVisivel &&  (

                <div className="global-div"> 
                    <FormMembro onSubmit={handleSalvarMembro} onCancel={handleCancelar}/>
                </div>
            )}
        </div>
    )
 
}

export default GerenciarMembros