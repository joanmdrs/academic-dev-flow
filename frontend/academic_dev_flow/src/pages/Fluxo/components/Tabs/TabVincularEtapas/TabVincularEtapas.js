import React, { useState } from "react";
import "./TabVincularEtapas.css";
import BotaoBuscar from "../../../../../components/Botoes/BotaoBuscar/BotaoBuscar";
import BotaoAdicionar from "../../../../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoExcluir from "../../../../../components/Botoes/BotaoExcluir/BotaoExcluir";
import ModalDeSelecao from "../../../../../components/Modals/ModalDeSelecao/ModalDeSelecao";
import { buscarEtapaPeloNome } from "../../../../../services/etapa_service";
import { NotificationManager } from "react-notifications";
import { Button, Checkbox, Input, Table } from "antd";



const TabVincularEtapas = () => {

    const [isModalVisivel, setIsModalVisivel] = useState(false)
    const [etapasSelecionadas, setEtapasSelecionadas] = useState([])
    const [elementosSelecionados, setElementosSelecionados] = useState([])

    const COLUNAS_MODAL = [
      {
        title: (<Input type="checkbox" style={{ transform: "scale(0.5)" }}/>),
        dataIndex: 'selecionar',
        key: 'selecionar',
        align: 'left',
        render: (_, record) => (
          <Input 
            type="checkbox" 
            onChange={(event) => handleEtapaSelecionada(event.target.checked, record)} 
            style={{ transform: "scale(0.5)" }}/>
        ),
      },
      {
        title: 'Código',
        dataIndex: 'id',
        key: 'codigo',
        // Adicione o tipo de dado se possível (por exemplo, number)
      },
      {
        title: 'Nome',
        dataIndex: 'nome',
        key: 'nome',
        // Adicione o tipo de dado se possível (por exemplo, string)
      },
      {
        title: 'Descrição',
        dataIndex: 'descricao',
        key: 'descricao',
        // Adicione o tipo de dado se possível (por exemplo, string)
      },
    ];

    const COLUNAS_TABELA = [
      {
        title: (<Input type="checkbox" style={{ transform: "scale(0.5)" }}/>),
        dataIndex: 'selecionar',
        key: 'selecionar',
        align: 'left',
        render: (_, record) => (
          <Input 
            type="checkbox" 
            onChange={(event) => handleLinhaTabelaSelecionada(event.target.checked, record)}
            style={{ transform: "scale(0.5)" }}/>
        ),
      },
      {
        title: 'Código',
        dataIndex: 'id',
        key: 'codigo',
      },
      {
        title: 'Nome',
        dataIndex: 'nome',
        key: 'nome',
      },
      {
        title: 'Descrição',
        dataIndex: 'descricao',
        key: 'descricao',

      },
    ];

    const handleEtapaSelecionada = (checked, record) => {

      if(checked) {
        const etapaNaoExiste = !etapasSelecionadas.some((e) => e.id === record.id);
        if (etapaNaoExiste) {
            setEtapasSelecionadas([...etapasSelecionadas, record]);
          }
      } else {
        const novaLista = etapasSelecionadas.filter((e) => e.id !== record.id);
        setEtapasSelecionadas(novaLista);
      }
    };

    const handleLinhaTabelaSelecionada = (checked, record) => {
      if(checked) {
        const etapaNaoExiste = !elementosSelecionados.some((e) => e.id === record.id);
        if (etapaNaoExiste) {
            setElementosSelecionados([...elementosSelecionados, record]);
          }
      } else {
        const novaLista = elementosSelecionados.filter((e) => e.id !== record.id);
        setElementosSelecionados(novaLista);
      }
    }

    const handleExibirModal = () => setIsModalVisivel(true);

    const handleFecharModal = () => setIsModalVisivel(false);

    const handleCliqueBotaoCancelar = () => {

    }

    const handleCliqueBotaoVincular = () => {

    }

    const handleRemoverSelecionados = () => {
      const novaListaEtapas = etapasSelecionadas.filter((etapa) => !elementosSelecionados.some((elemento) => elemento.id === etapa.id));
      setEtapasSelecionadas(novaListaEtapas);
      setElementosSelecionados([]); // Limpa a lista de elementos selecionados
    };

    const handleBuscarEtapa = async (parametro) => {
        try {
            const resposta = await buscarEtapaPeloNome(parametro);
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
        <div className="tab-vincular-etapas">

          <div className="tab-vincular-etapas-header"> 
            <h4>VINCULAR ETAPAS </h4>
  
            <ModalDeSelecao 
                titulo="Buscar etapa" 
                label="Nome da etapa"
                name="name-etapa"
                onCancel={handleFecharModal}
                onOk={handleBuscarEtapa}
                status={isModalVisivel}
                colunas={COLUNAS_MODAL}
            />
          </div>

          <div className="tab-vincular-etapas-content">
            <h4> ETAPAS A SEREM VINCULADAS </h4>
            <Button className="button-adicionar-etapas" type="primary" onClick={handleExibirModal}> ADICIONAR ETAPAS </Button>
            <Button 
              className="button-remover-selecionados" 
              type="primary" 
              danger 
              disabled={elementosSelecionados.length === 0}
              onClick={handleRemoverSelecionados
            }> REMOVER SELECIONADOS </Button>
            <Table 
              dataSource={etapasSelecionadas}
              columns={COLUNAS_TABELA}
              rowKey="id"
            />
          </div>

          <div className="tab-vincular-etapas-footer"> 
            <Button className="button-vincular-etapas"> VINCULAR </Button>
            <Button type="primary" danger className="button-cancelar-vincular-etapas"> CANCELAR </Button>
          </div>
            
        </div>
    )
}

export default TabVincularEtapas