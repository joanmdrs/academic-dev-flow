import React, { useEffect, useState } from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import { Button, Modal } from "antd";
import { useContextoProjeto } from "../../context/ContextoProjeto";
import { atualizarProjeto, buscarProjetoPeloNome, criarProjeto, excluirProjeto } from "../../../../services/projetoService";
import { NotificationManager } from "react-notifications";
import ModalDeBusca from "../../../../components/Modals/ModalDeBusca/ModalDeBusca";
import { FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import TabsProjeto from "../../screens/TabsProjeto";
import SpinLoading from "../../../../components/SpinLoading/SpinLoading";

const AdminProjetos = () => {
  
    const COLUNAS_MODAL = [
        {
            title: "Nome",
            dataIndex: "nome",
            key: "nome",
            render:(text, record) => (
                <span 
                    style={{color: 'blue', cursor: 'pointer'}}
                    onClick={() => {handleCliqueLinha(record)}}
                >
                    {text}
                </span>
            )
        },
        {
            title: "Descrição",
            dataIndex: "descricao",
            key: "descricao",
        },
    ];

    const [acaoForm, setAcaoForm] = useState("criar")
    const {dadosProjeto, setDadosProjeto} = useContextoProjeto()
    const [isModalVisivel, setIsModalVisivel] = useState(false)
    const [isTabsVisible, setIsTabsVisible] = useState(false)
    const [isBotaoAdicionarVisivel, setIsBotaoAdicionarVisivel] = useState(false)
    const [isBotaoExcluirVisivel, setIsBotaoExcluirVisivel] = useState(true)
    const [isBotaoBuscarVisivel, setIsBotaoBuscarVisivel] = useState(false)
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setCarregando(true);
                await new Promise((resolve) => setTimeout(resolve, 1500));
            } catch (error) {
            } finally {
                setCarregando(false);
            }
        };

      fetchData();
  }, [dadosProjeto]);

    const handleExibirModal = () => setIsModalVisivel(true)
    const handleFecharModal = () => setIsModalVisivel(false)
    
    const handleBotaoAdicionar = () => {
        setIsTabsVisible(true)
        setIsBotaoAdicionarVisivel(true)
        setIsBotaoExcluirVisivel(true)
        setIsBotaoBuscarVisivel(true)
        setAcaoForm('criar')
        setDadosProjeto(null)
    }

    const handleCliqueLinha = (record) => {
        setAcaoForm("atualizar")
        setDadosProjeto(record)
        setIsTabsVisible(true)
        setIsModalVisivel(false)
        setIsBotaoExcluirVisivel(false)
    }

    const handleBuscarProjeto = async (parametro) => {
        try {
            const resposta = await buscarProjetoPeloNome(parametro)
            if(resposta.status !== 200){
                NotificationManager.error("Ocorreu um problema ao buscar os dados, contate o suporte!")
            } else {
                return resposta
            }
        } catch (error) {
            NotificationManager.error("Ocorreu um problema ao buscar os dados, contate o suporte!")
        } 
    }

    const handleCriarProjeto = async (dados) => {
        
        const response = await criarProjeto(dados)
        
        if(response.status === 200){
            setDadosProjeto(response.data)          
        }
        
    }
  
    const handleAtualizarProjeto = async (dados, id) => {
        const response = await atualizarProjeto(dados, id)
        
        if(!response.error){
            setDadosProjeto(response.data)
        }

    }
  
    const handleSalvarProjeto = async (dados) => {
        if (acaoForm === 'criar'){
            await handleCriarProjeto(dados)
        }else if(acaoForm === 'atualizar'){
            await handleAtualizarProjeto(dados, dadosProjeto.id)
        }
    };

    const handleCancelar = () => {
        setIsTabsVisible(false)
        setIsBotaoAdicionarVisivel(false)
        setIsBotaoBuscarVisivel(false)
        setIsBotaoExcluirVisivel(true)
        handleFecharModal()
    }

    const handleExcluirProjeto = async () => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Tem certeza que deseja excluir o projeto ? Esta ação é irreversível !',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () =>  {
                await excluirProjeto(dadosProjeto.id)
                handleCancelar()
            }
                
        });
    }

    return ( 
        <div className="content" >
            <ModalDeBusca 
                colunas={COLUNAS_MODAL}
                titulo="Buscar projeto" 
                status={isModalVisivel} 
                onCancel={handleFecharModal}
                onOk={handleBuscarProjeto}
                label="Nome do projeto"
                name="name-projeto"
            />

            <Titulo 
                titulo="Projetos"
                paragrafo="Administração > Gerenciar projetos"
            />

            <div className="button-menu"> 
                <Button 
                    type="primary"
                    onClick={() => handleExibirModal()} 
                    disabled={isBotaoBuscarVisivel}
                    icon={<FaSearch />}
                >
                    Buscar Projeto
                </Button>
                <div className="grouped-buttons">
                    <Button 
                        type="primary" 
                        icon={<FaPlus />} 
                        onClick={() => handleBotaoAdicionar()}  
                        disabled={isBotaoAdicionarVisivel}
                    >
                        Criar Projeto
                    </Button> 
                    <Button 
                        type="primary"
                        danger
                        icon={<FaTrash />}
                        onClick={handleExcluirProjeto} 
                        disabled={isBotaoExcluirVisivel}
                    >
                        Excluir
                    </Button>
                </div>
            </div>


            {isTabsVisible && 
                <React.Fragment>
                    { carregando ? 
                        <SpinLoading />

                        : (
                            <div> 
                                <TabsProjeto onSubmit={handleSalvarProjeto} onCancel={handleCancelar} />
                            </div>
                        )
                        
                    }
                </React.Fragment>
            }
        </div>    
            
    );
  }
  
  export default AdminProjetos;