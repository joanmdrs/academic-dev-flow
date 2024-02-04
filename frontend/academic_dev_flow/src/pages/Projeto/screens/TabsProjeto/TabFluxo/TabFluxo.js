import React, { useState } from "react";
import BotaoAdicionar from "../../../../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoExcluir from "../../../../../components/Botoes/BotaoExcluir/BotaoExcluir";
import { Table } from "antd";
import ListaDados from "../../../../../components/Listas/ListaDados/ListaDados";
import ModalDeBusca from "../../../../../components/Modals/ModalDeBusca/ModalDeBusca";
import { buscarFluxoPeloNome } from "../../../../../services/fluxo_service";
import { NotificationManager } from "react-notifications";
import ModalSelecionarObjetos from "../../../components/ModalSelecionarObjetos/ModalSelecionarObjetos";

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
              onClick={() => {handleCliqueLinha(record)}}
            >
              {text}
            </span>
          )
        },
        
    ];

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
        
    }
    ];
    
    const [isModalVisivel, setIsModalVisivel] = useState(false)
    const [fluxo, setFluxo] = useState([])

    const handleExibirModal = () => setIsModalVisivel(true)
    const handleFecharModal = () => setIsModalVisivel(false)

    const handleCliqueLinha = (record) => {
        setFluxo([record])
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

    const handleSelecionarFluxo = async () => {
      
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
                <ListaDados colunas={COLUNAS_LISTA} dados={fluxo}/>
                <ModalSelecionarObjetos
                    title="BUSCAR FLUXO"
                    colunas={COLUNAS_LISTA}
                    onOk={handleBuscarFluxo}
                    onCancel={handleFecharModal}

                
                />
            </div>
        </div>
    )

}

export default TabFluxo;