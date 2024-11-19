import React, {useEffect, useState } from "react"
import Titulo from "../../../../components/Titulo/Titulo"
import ModalDeBusca from "../../../../components/Modals/ModalDeBusca/ModalDeBusca"
import { atualizarMembro, buscarMembroPeloNome, criarMembro, excluirMembro } from "../../../../services/membroService"
import { useMembroContexto } from "../../context/MembroContexto"
import { buscarUsuarioPeloId } from "../../../../services/usuarioService"
import Loading from "../../../../components/Loading/Loading"
import FormMembro from "../../components/FormMembro/FormMembro"
import { Button, Modal } from "antd"
import { FaPlus, FaSearch, FaTrash } from "react-icons/fa"

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
            dataIndex: "nome_grupo",
            key: "nome_grupo",
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

    const handleSalvarMembro = async (dadosForm) => {
        if (acaoForm === 'criar'){
            let avatarNumber;
            if (dadosForm.sexo === 'M') {
                avatarNumber = Math.floor(Math.random() * 50) + 1;
            } else if (dadosForm.sexo === 'F') {
                avatarNumber = Math.floor(Math.random() * 50) + 51;
            } else if (dadosForm.sexo === 'O') {
                avatarNumber = Math.floor(Math.random() * 100) + 1;
            }
            dadosForm['avatar'] = avatarNumber;
            const response = await criarMembro(dadosForm)
            handleReload('atualizar', response.data)
        } else if (acaoForm === 'atualizar') {
            const response = await atualizarMembro(dadosMembro.id, dadosForm)
            handleReload('atualizar', response.data )
        }
    }

    const handleBuscarMembro = async (parametro) => {
        const response = await buscarMembroPeloNome(parametro)
        return response
    }

    const handleExcluirMembro = async () => {

        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir este item ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk:  async () => {
                await excluirMembro(dadosMembro.id)
                handleCancelar()
            }
        });

        
    }

    return (
        <div className="content"> 
            <Titulo 
                titulo='Membros'
                paragrafo='Membros > Gerenciar membros'
            />

            <div className="button-menu"> 
                <Button
                    type="primary"
                    icon={<FaSearch />}
                    onClick={() => handleAbrirModal()}
                    disabled={isSearchBtnEnabled}
                >
                    Buscar
                </Button>
                <div className="grouped-buttons">
                    <Button
                        type="primary"
                        icon={<FaPlus />}
                        onClick={() => handleAdicionarMembro()}
                        disabled={isPlusBtnEnabled}
                    >
                        Criar Membro
                    </Button>

                    <Button
                        type="primary"
                        danger
                        icon={<FaTrash />}
                        onClick={() => handleExcluirMembro()}
                        disabled={isTrashBtnEnabled}
                    >
                        Excluir
                    </Button>
                </div>
            </div>
    

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

                <div> 
                    <FormMembro onSubmit={handleSalvarMembro} onCancel={handleCancelar}/>
                </div>
            )}
        </div>
    )
 
}

export default GerenciarMembros