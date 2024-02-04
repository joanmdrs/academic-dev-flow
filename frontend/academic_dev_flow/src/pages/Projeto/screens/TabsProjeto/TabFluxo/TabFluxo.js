import React, { useState } from "react";
import BotaoAdicionar from "../../../../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoExcluir from "../../../../../components/Botoes/BotaoExcluir/BotaoExcluir";
import { Table } from "antd";
import ListaDados from "../../../../../components/Listas/ListaDados/ListaDados";
import ModalDeBusca from "../../../../../components/Modals/ModalDeBusca/ModalDeBusca";
import { buscarFluxoPeloNome } from "../../../../../services/fluxo_service";
import { NotificationManager } from "react-notifications";
import ModalSelecionarObjetos from "../../../components/ModalSelecionarObjetos/ModalSelecionarObjetos";
import { atualizarFluxoProjeto } from "../../../../../services/projeto_service";
import { useFormContext } from "../../../context/Provider/Provider";

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
    
    const {hasProjeto} = useFormContext()
    const [isModalVisivel, setIsModalVisivel] = useState(false)
    const [fluxo, setFluxo] = useState({})

    const handleExibirModal = () => setIsModalVisivel(true)
    const handleFecharModal = () => setIsModalVisivel(false)

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
          NotificationManager.success("Fluxo vinculado ao projeto com sucesso!")
          setFluxo(record)
        } else {
          NotificationManager.error("Falha ao vincular o fluxo ao projeto, contate o suporte!")
        }
      } catch (error) {
        NotificationManager.error("Ocorreu um problema durante a operação, contate o suporte!")
      }
    }

    const handleBuscarFluxoProjeto = async () => {
      
    }
  
    return (
        <div> 
            <div className="box">
                <h4> VINCULAR FLUXO</h4>
            </div>

            <div
                className="group-buttons"
                style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
            >
                <BotaoAdicionar funcao={handleExibirModal}/>
                <BotaoExcluir />
            </div>
            <div>
                <ListaDados colunas={COLUNAS_LISTA} dados={[fluxo]}/>

                <ModalDeBusca 
                  titulo="BUSCAR FLUXO"
                  colunas={COLUNAS_LISTA}
                  status={isModalVisivel}
                  label="Buscar fluxo"
                  name="nomeFluxo"
                  onOk={handleBuscarFluxo}
                  onCancel={handleFecharModal}

                
                />
            </div>
        </div>
    )

}

export default TabFluxo;