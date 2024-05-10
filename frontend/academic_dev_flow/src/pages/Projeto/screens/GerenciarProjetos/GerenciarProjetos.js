import React, { useEffect, useState } from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import { Spin, Tabs } from "antd";
import Item from "antd/es/list/Item";
import { useContextoProjeto } from "../../context/ContextoProjeto";
import { atualizarProjeto, buscarProjetoPeloNome, criarProjeto, excluirProjeto } from "../../../../services/projetoService";
import { NotificationManager } from "react-notifications";
import { recarregarPagina } from "../../../../services/utils";
import BotaoBuscar from "../../../../components/Botoes/BotaoBuscar/BotaoBuscar";
import BotaoAdicionar from "../../../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoExcluir from "../../../../components/Botoes/BotaoExcluir/BotaoExcluir";
import ModalDeBusca from "../../../../components/Modals/ModalDeBusca/ModalDeBusca";
import { LoadingOutlined } from "@ant-design/icons";
import TabProjeto from "../TabsProjeto/TabProjeto/TabProjeto";
import TabEquipe from "../TabsProjeto/TabEquipe/TabEquipe";
import TabFluxo from "../TabsProjeto/TabFluxo/TabFluxo";

const GerenciarProjetos = () => {
  
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

    const [current, setCurrent] = useState("1");
    const [acaoForm, setAcaoForm] = useState("criar")
    const {hasProjeto, setHasProjeto} = useContextoProjeto()
    const [isModalVisivel, setIsModalVisivel] = useState(false)
    const [isTabsAtivo, setIsTabsAtivo] = useState(false)
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
  }, [hasProjeto]);

    const handleExibirModal = () => setIsModalVisivel(true)
    const handleFecharModal = () => setIsModalVisivel(false)
    
    const handleBotaoAdicionar = () => {
        setIsTabsAtivo(true)
        setIsBotaoAdicionarVisivel(true)
        setIsBotaoExcluirVisivel(true)
        setIsBotaoBuscarVisivel(true)
        setAcaoForm('criar')
        setHasProjeto(null)
    }

    const handleCliqueLinha = (record) => {
        setAcaoForm("atualizar")
        setHasProjeto(record)
        setIsTabsAtivo(true)
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
        try {
            const resposta = await criarProjeto(dados)
            
            if(resposta.status === 200){
                NotificationManager.success('Projeto criado com sucesso!');
                setHasProjeto(resposta.data)          
            } else {
                NotificationManager.error("Ocorreu um problema, contate o suporte!");
            }
        }catch (error) {
            NotificationManager.error("Ocorreu um problema, contate o suporte!");
        }
    }
  
    const handleAtualizarProjeto = async (dados, id) => {
        try {
            const resposta = await atualizarProjeto(dados, id)
            
            if(resposta.status === 200){
                NotificationManager.success('Projeto atualizado com sucesso!');
                setHasProjeto(resposta.data)
            } else {
                NotificationManager.error("Ocorreu um problema, contate o suporte!");
            }
        }catch (error) {
            NotificationManager.error("Ocorreu um problema, contate o suporte!");
        }
    }
  
    const handleSalvarProjeto = async (dados) => {
        if (acaoForm === 'criar'){
            await handleCriarProjeto(dados)
        }else if(acaoForm === 'atualizar'){
            await handleAtualizarProjeto(dados, hasProjeto.id)
        }
    };

    const handleCancelar = () => {
        setIsTabsAtivo(false)
        setIsBotaoAdicionarVisivel(false)
        setIsBotaoBuscarVisivel(false)
        setIsBotaoExcluirVisivel(true)
    }

    const handleExcluirProjeto = async () => {
        try {
            const response = await excluirProjeto(hasProjeto.id)

            if (response.status === 204){
                NotificationManager.success("Projeto excluído com sucesso !")
                recarregarPagina()
            } else {
                NotificationManager.error("Falha ao excluir o projeto, contate o suporte !")
            }
        } catch (error) {
            console.log(error)
            NotificationManager.error("Falha durante a operação, contate o suporte !")

        }
    }

    return ( 
        <div className="component-tabs-projeto">
            <Titulo 
                titulo="Projetos"
                paragrafo="Administração > Gerenciar projetos"
            />

            <div className="button-menu"> 
                <BotaoBuscar nome="BUSCAR PROJETO" funcao={handleExibirModal} status={isBotaoBuscarVisivel}/>
                <div className="grouped-buttons"> 
                    <BotaoAdicionar funcao={handleBotaoAdicionar} status={isBotaoAdicionarVisivel}/>
                    <BotaoExcluir funcao={handleExcluirProjeto} status={isBotaoExcluirVisivel}/>
                </div>
            </div>

            <ModalDeBusca 
                colunas={COLUNAS_MODAL}
                titulo="Buscar projeto" 
                status={isModalVisivel} 
                onCancel={handleFecharModal}
                onOk={handleBuscarProjeto}
                label="Nome do projeto"
                name="name-projeto"
            />

            {isTabsAtivo && 
                <React.Fragment>
                    { carregando ? 

                        (<div style={{ textAlign: "center", padding: "20px" }}>
                            <Spin
                                indicator={
                                <LoadingOutlined
                                    style={{
                                    fontSize: 48,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    }}
                                    spin
                                />
                                }
                            />
                            </div>
                        )

                        : (
                            <div className="global-div">
                                <Tabs
                                    size="large"
                                    indicator={{
                                    align: "center"
                                    }}
                                    style={{padding: "20px"}}
                                    activeKey={current} 
                                    onChange={setCurrent} 
                                    className="tabs-projeto"
                                > 
                                    <Item tab="Projeto" key="1">
                                        <TabProjeto onSubmit={handleSalvarProjeto} onCancel={handleCancelar} />
                                    </Item>
                                    <Item tab="Equipe" key="2" className="tab-item">
                                        <TabEquipe />
                                    </Item>
                                    <Item tab="Fluxo" key="3" className="tab-item">
                                        <TabFluxo />
                                    </Item>
                                </Tabs>
                            </div>
                        )
                        
                    }
                </React.Fragment>
            }
        </div>    
            
    );
  }
  
  export default GerenciarProjetos;