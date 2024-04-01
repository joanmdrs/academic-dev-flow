import React, { useState } from "react"
import Titulo from "../../../../components/Titulo/Titulo"
import BotaoAdicionar from "../../../../components/Botoes/BotaoAdicionar/BotaoAdicionar"
import BotaoExcluir from "../../../../components/Botoes/BotaoExcluir/BotaoExcluir"
import BotaoBuscar from "../../../../components/Botoes/BotaoBuscar/BotaoBuscar"
import ModalDeBusca from "../../../../components/Modals/ModalDeBusca/ModalDeBusca"
import { atualizarMembro, buscarMembroPeloNome, criarMembro, excluirMembro } from "../../../../services/membroService"
import FormMembro from "../FormMembro/FormMembro"
import { useMembroContexto } from "../../context/MembroContexto"

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

 
    const handleFecharModal = () => setIsModalVisivel(false)
    const handleAbrirModal = () => setIsModalVisivel(true)
    
    const handleResetar = () => {

    }

    const handleSelecionarMembro = (dados) => {
        setDadosMembro(dados)
        setAcaoForm('atualizar')
        setIsFormVisivel(true)
        setIsModalVisivel(false)
        setIsTrashBtnEnabled(false)
    }

    const handleAdicionarMembro = () => {
        setIsFormVisivel(true)
        setIsModalVisivel(false)
        setAcaoForm('criar')
        setIsPlusBtnEnabled(true)
        setIsTrashBtnEnabled(true)
        setIsSearchBtnEnabled(true)
    }

    const handleSalvarMembro = async (dados) => {
        if (acaoForm === 'criar'){
            await criarMembro(dados)
        } else if (acaoForm === 'atualizar') {
            await atualizarMembro(dadosMembro.id, dados) 
        }
        handleResetar()
    }

    const handleBuscarMembro = async (parametro) => {
        const response = await buscarMembroPeloNome(parametro)
        return response
    }

    const handleExcluirMembro = async () => {
        await excluirMembro(dadosMembro.id)
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
                    <FormMembro onSubmit={handleSalvarMembro} />
                </div>
            )}
        </div>
    )
 
}

export default GerenciarMembros