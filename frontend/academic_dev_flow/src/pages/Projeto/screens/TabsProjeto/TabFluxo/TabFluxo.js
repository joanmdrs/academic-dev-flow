import React, { useEffect, useState } from "react";
import BotaoAdicionar from "../../../../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoExcluir from "../../../../../components/Botoes/BotaoExcluir/BotaoExcluir";
import ListaDados from "../../../../../components/Listas/ListaDados/ListaDados";
import ModalDeBusca from "../../../../../components/Modals/ModalDeBusca/ModalDeBusca";
import { buscarFluxoPeloId, buscarFluxoPeloNome } from "../../../../../services/fluxoService";
import { NotificationManager } from "react-notifications";
import { atualizarFluxoProjeto, buscarProjetoPeloId } from "../../../../../services/projetoService";
import { useContextoProjeto } from "../../../context/ContextoProjeto";

const TabFluxo = () => {


    const COLUNAS_LISTA = [
      {
        title: "ID",
        key: "id",
        dataIndex: "id",
      },
      {
        title: "Nome",
        dataIndex: "nome",
        key: "nome",
        render:(text) => (
          <span 
            style={{color: 'blue', cursor: 'pointer'}}
            onClick={() => setIsBotaoExcluirVisivel(true)}
          >
            {text}
          </span>
        )
      }
    ]

    const COLUNAS_MODAL = [
        {
          title: "ID",
          key: "id",
          dataIndex: "id",
        },
        {
          title: "Nome",
          dataIndex: "nome",
          key: "nome",
          render:(text, record) => (
            <span 
              style={{color: 'blue', cursor: 'pointer'}}
              onClick={async () => await handleSelecionarFluxo(record)}
            >
              {text}
            </span>
          )
        },
        
    ];
    
    const {hasProjeto, setHasProjeto} = useContextoProjeto()
    const [isBotaoAdicionarVisivel, setIsBotaoAdicionarVisivel] = useState(true)
    const [isBotaoExcluirVisivel, setIsBotaoExcluirVisivel] = useState(true)
    const [isModalVisivel, setIsModalVisivel] = useState(false)
    const [hasFluxo, setHasFluxo] = useState([])
    const [isVisivel, setIsVisivel] = useState(false)

    useEffect(() => {
      const fetchData = async () => {
        if (hasProjeto !== null) {
          setIsBotaoAdicionarVisivel(false)
          await handleBuscarFluxoProjeto();
        }
      };
  
      fetchData();
    }, [hasProjeto]);

    const handleExibirModal = () => setIsModalVisivel(true)
    const handleFecharModal = () => setIsModalVisivel(false)

    const handleCliqueLinha = () => {
      setIsBotaoExcluirVisivel(false)
    }

    const handleBuscarFluxo = async (parametro) => {
       try {
        const resposta = await buscarFluxoPeloNome(parametro)
        if(resposta.status !== 200){
          NotificationManager.error("Ocorreu um problema ao buscar os dados, contate o suporte!")
        } else {
          return resposta
        }
      } catch (error) {
        NotificationManager.error("Ocorreu um problema ao buscar os dados, contate o suporte!")
      } 
    }

    const handleSelecionarFluxo = async (record) => {
      try {
        const idFluxo = record.id
        const idProjeto = hasProjeto.id
        const resposta = await atualizarFluxoProjeto(idFluxo, idProjeto)

        if (resposta.status === 200){
          const responseFilterProject = await buscarProjetoPeloId(idProjeto)
          
          if (responseFilterProject.status === 200){
            setHasProjeto(responseFilterProject.data)
            await handleBuscarFluxoProjeto()
            handleFecharModal()
          } else {
            NotificationManager.error("Falha ao buscar as informações do projeto, contate o suporte!")
          } 
        } else {
          NotificationManager.error("Falha ao vincular o fluxo ao projeto, contate o suporte!")
        }
      } catch (error) {
        NotificationManager.error("Ocorreu um problema durante a operação, contate o suporte!")
      }
    }

    const handleBuscarFluxoProjeto = async () => {
      try {
        if (hasProjeto.fluxo !== null) {
          const resposta = await buscarFluxoPeloId(hasProjeto.fluxo)
          if (resposta.status === 200){
            setHasFluxo([resposta.data])
          } else {
            NotificationManager.error('Falha ao buscar os dados do fluxo')
          }
        } else {
          return
        }
  
      } catch (error) {
        NotificationManager.error("Ocorreu um problema durante a operação, contate o suporte!")
      }
    }

    const handleDesvincularFluxo = async () => {
      try {
        const resposta = await atualizarFluxoProjeto(0, hasProjeto.id)

        if (resposta.status === 200){
          NotificationManager.success("Fluxo desvinculado do projeto com sucesso!")
          setHasFluxo([])
          setIsBotaoExcluirVisivel(false)
        } else {
          NotificationManager.error('Falha ao desvincular o fluxo do projeto, contate o suporte!')
        }
      } catch (error) {
        NotificationManager.error("Ocorreu um problema durante a operação, contate o suporte!")
      }
    }
  
    return (
        <div> 
          <div 
            style={{
              cursor: "pointer",
              padding: "20px",
              border: "1px solid #d9d9d9",
            }}
            onClick={() => setIsVisivel(!isVisivel)}
          >
            <h4> VINCULAR FLUXO</h4>
          </div>

          { isVisivel && 
            <React.Fragment>
                <div
                    className="grouped-buttons"
                    style={{ 
                      width: "100%", 
                      display: "flex", 
                      justifyContent: "flex-end", 
                      padding:'20px'
                    }}
                >
                    <BotaoAdicionar funcao={handleExibirModal} status={isBotaoAdicionarVisivel}/>
                    <BotaoExcluir funcao={handleDesvincularFluxo} status={isBotaoExcluirVisivel}/>
                </div>
              <div>

              {hasFluxo && hasFluxo.length > 0 ? (
                <ListaDados colunas={COLUNAS_LISTA} dados={hasFluxo} onClickRow={handleCliqueLinha} />
              ) : null}

                  

                  <ModalDeBusca 
                    titulo="BUSCAR FLUXO"
                    colunas={COLUNAS_MODAL}
                    status={isModalVisivel}
                    label="Buscar fluxo"
                    name="nomeFluxo"
                    onOk={handleBuscarFluxo}
                    onCancel={handleFecharModal}
                  />
              </div>
            </React.Fragment>
          }          
        </div>
    )

}

export default TabFluxo;