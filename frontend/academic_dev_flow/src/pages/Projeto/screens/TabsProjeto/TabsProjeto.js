import React, { useState } from "react";
import "./TabsProjeto.css";
import Titulo from "../../../../components/Titulo/Titulo";
import { Button, Tabs } from "antd";
import Item from "antd/es/list/Item";
import TabProjeto from "./TabProjeto/TabProjeto";
import TabEquipe from "./TabEquipe/TabEquipe";
import TabFluxo from "./TabFluxo/TabFluxo";
import BotaoBuscar from "../../../../components/Botoes/BotaoBuscar/BotaoBuscar";
import BotaoAdicionar from "../../../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoExcluir from "../../../../components/Botoes/BotaoExcluir/BotaoExcluir";
import { useFormContext } from "../../context/Provider/Provider";
import ModalDeBusca from "../../../../components/Modals/ModalDeBusca/ModalDeBusca";
import FormDeBusca from "../../../../components/Forms/FormDeBusca/FormDeBusca";
import { buscarProjetoPeloNome } from "../../../../services/projeto_service";
import { NotificationManager } from "react-notifications";

const TabsProjeto = () => {
  
    const [current, setCurrent] = useState("1");
    const {hasProjeto, setHasProjeto} = useFormContext()
    const [valoresIniciais, setValoresIniciais] = useState({})
    const [isModalVisivel, setIsModalVisivel] = useState(false)
    const [isFormVisivel, setIsFormVisivel] = useState(false)
    const [isTabsAtivo, setIsTabsAtivo] = useState(false)

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

    const handleExibirModal = () => setIsModalVisivel(true)
    const handleFecharModal = () => setIsModalVisivel(false)
    
    const handleExibirForm = () => {
      setIsTabsAtivo(true)
    }

    const handleCliqueLinha = (record) => {
      setValoresIniciais(record)
      setHasProjeto(record)
      setIsTabsAtivo(true)
      setIsModalVisivel(false)
      console.log(record)
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


    return ( 
            <div className="component-tabs-projeto">
              <Titulo 
                titulo="Projetos"
                paragrafo="Administração > Gerenciar projetos"
              />

              <div className="botoes-de-acao"> 
                <BotaoBuscar nome="BUSCAR PROJETO" funcao={handleExibirModal}/>
                <div className="group-buttons"> 
                  <BotaoAdicionar funcao={handleExibirForm} />
                  <BotaoExcluir />
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
              
              <div className="form-box"> 
                <Tabs
                  size="large"
                  indicator={{
                    align: "center"
                  }}
                  style={{padding: "20px"}}
                  activeKey={current} 
                  onChange={setCurrent} 
                > 
                  <Item tab="Projeto" key="1" colStyle={{width: "250px"}}>
                    <TabProjeto valoresIniciais={valoresIniciais}/>
                  </Item>
                  <Item tab="Equipe" key="2" className="tab-item">
                    <TabEquipe />
                  </Item>
                  <Item tab="Fluxo" key="3" className="tab-item">
                      <TabFluxo />
                  </Item>
                </Tabs>

                <div className="tabs-projeto-footer-botoes">
                  <Button type="primary">
                    SALVAR
                  </Button >

                  <Button type="primary" danger>
                    CANCELAR
                  </Button>
                </div>
              </div>
}
            </div>    
            
    );
  }
  
  export default TabsProjeto;