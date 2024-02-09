import React, { useEffect, useState } from "react";
import "./TabsProjeto.css";
import Titulo from "../../../../components/Titulo/Titulo";
import { Spin, Tabs } from "antd";
import Item from "antd/es/list/Item";
import TabProjeto from "./TabProjeto/TabProjeto";
import TabEquipe from "./TabEquipe/TabEquipe";
import TabFluxo from "./TabFluxo/TabFluxo";
import BotaoBuscar from "../../../../components/Botoes/BotaoBuscar/BotaoBuscar";
import BotaoAdicionar from "../../../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoExcluir from "../../../../components/Botoes/BotaoExcluir/BotaoExcluir";
import { useFormContext } from "../../context/Provider/Provider";
import ModalDeBusca from "../../../../components/Modals/ModalDeBusca/ModalDeBusca";
import { atualizarProjeto, buscarProjetoPeloNome, criarProjeto } from "../../../../services/projeto_service";
import { NotificationManager } from "react-notifications";
import { LoadingOutlined } from "@ant-design/icons";

const TabsProjeto = () => {
  
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
    const {hasProjeto, setHasProjeto} = useFormContext()
    const [valoresIniciais, setValoresIniciais] = useState({})
    const [isModalVisivel, setIsModalVisivel] = useState(false)
    const [isTabsAtivo, setIsTabsAtivo] = useState(false)
    const [isBotaoAdicionarVisivel, setIsBotaoAdicionarVisivel] = useState(false)
    const [isBotaoExcluirVisivel, setIsBotaoExcluirVisivel] = useState(true)
    const [isBotaoBuscarVisivel, setIsBotaoBuscarVisivel] = useState(false)
    const [carregando, setCarregando] = useState(false);

    const handleExibirModal = () => setIsModalVisivel(true)
    const handleFecharModal = () => setIsModalVisivel(false)
    
    const handleBotaoAdicionar = () => {
      setIsTabsAtivo(true)
      setIsBotaoAdicionarVisivel(true)
      setIsBotaoExcluirVisivel(true)
      setIsBotaoBuscarVisivel(true)
      setAcaoForm('criar')
      setHasProjeto({})
      setValoresIniciais({})
    }

    const handleCliqueLinha = (record) => {
      setValoresIniciais(record)
      setAcaoForm("atualizar")
      setHasProjeto(record)
      setIsTabsAtivo(true)
      setIsModalVisivel(false)
    }

    const handleCriarProjeto = async (dados) => {
      try {
        const resposta = await criarProjeto(dados)
        
        if(resposta.status === 200){
          NotificationManager.success('Projeto criado com sucesso!');
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

    return ( 
            <div className="component-tabs-projeto">
              <Titulo 
                titulo="Projetos"
                paragrafo="Administração > Gerenciar projetos"
              />

              <div className="botoes-de-acao"> 
                <BotaoBuscar nome="BUSCAR PROJETO" funcao={handleExibirModal} status={isBotaoBuscarVisivel}/>
                <div className="group-buttons"> 
                  <BotaoAdicionar funcao={handleBotaoAdicionar} status={isBotaoAdicionarVisivel}/>
                  <BotaoExcluir status={isBotaoExcluirVisivel}/>
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
                          <div className="form-box">
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
                                <TabProjeto valoresIniciais={valoresIniciais} onSubmit={handleSalvarProjeto}/>
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
  
  export default TabsProjeto;