import React, { useState } from "react";
import "./TabVincularEtapas.css";
import ModalDeSelecao from "../../../../../components/Modals/ModalDeSelecao/ModalDeSelecao";
import { buscarEtapaPeloNome } from "../../../../../services/etapa_service";
import { NotificationManager } from "react-notifications";
import { Button, Input, Table, Checkbox } from "antd";
import { useFormContext } from "../../../context/Provider/FormProvider"


const TabVincularEtapas = () => {

    const {setCurrent} = useFormContext()
    const [isModalVisivel, setIsModalVisivel] = useState(false)
    const {hasDadosEtapas, setHasDadosEtapas} = useFormContext()
    const [elementosSelecionados, setElementosSelecionados] = useState([])
    const [isChecked, setIsChecked] = useState(false);
    const [isTurn, setIsTurn] = useState("modal")

    const COLUNAS_MODAL = [
      {
        title: (
          <Input 
            type="checkbox"
            className="checkbox-mestre-modal" 
            onChange={() => handleSelecionarTodosModal()} 
            style={{ transform: "scale(0.4)" }}/>),
            
        dataIndex: 'selecionar',
        key: 'selecionar',
        align: 'center',
        render: (_, record) => (
          <Input 
            type="checkbox"
            value={JSON.stringify(record)}
            className="checkbox-item-modal"
            onChange={(event) => handleSelecionarItemModal(event.target.checked, record)}
            style={{ transform: "scale(0.4)" }}/>
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

    const COLUNAS_TABELA = [
      {
        title: (
          <Input 
            type="checkbox" 
            onChange={() => handleSelecionarTodosTable()}
            className="checkbox-mestre-table"
            style={{ transform: "scale(0.5)"}}
          />
        ),
        dataIndex: 'selecionar',
        key: 'selecionar',
        align: 'left',
        render: (_, record) => (
          <Input 
            type="checkbox"
            value={JSON.stringify(record)}
            className="checkbox-item-table"
            onChange={(event) => handleSelecionarItemTable(event.target.checked, record)}
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

    const handleSelecionarTodosModal = () => {
      const checkboxItems = document.getElementsByClassName('checkbox-item-modal');
      const checkboxMestre = document.getElementsByClassName('checkbox-mestre-modal')

      if (isChecked === false ) {
        setIsChecked(true)
        checkboxMestre[0].checked = true
        setHasDadosEtapas([]);
        for (let i = 0; i < checkboxItems.length; i++) {
          checkboxItems[i].checked = true;
          let elemento = JSON.parse(checkboxItems[i].value);
          setHasDadosEtapas((prevValues) => [...prevValues, elemento]);
        }
      } else {
        setIsChecked(false)
        checkboxMestre[0].checked = false
        for (let i = 0; i < checkboxItems.length; i++) {
          checkboxItems[i].checked = false;
        }

        setHasDadosEtapas([]);
      }
  };
    
  const handleSelecionarItemModal = (checked, record) => {
    
    const checkboxItems = document.getElementsByClassName('checkbox-item-modal');
    const checkboxMestre = document.getElementsByClassName('checkbox-mestre-modal')
  
    if (checked) {
      const etapaNaoExiste = !hasDadosEtapas.some((e) => e.id === record.id);
      if (etapaNaoExiste) {
        setHasDadosEtapas([...hasDadosEtapas, record]);
      }
    } else {
      const novaLista = hasDadosEtapas.filter((e) => e.id !== record.id);
      setHasDadosEtapas(novaLista);
    }
  
    const todasEtapasMarcadas = checkboxItems.length > 0 && [...checkboxItems].every((el) => el.checked);
  
    setIsChecked(todasEtapasMarcadas);
    checkboxMestre[0].indeterminate = !todasEtapasMarcadas && hasDadosEtapas.length > 0;
    checkboxMestre[0].checked = todasEtapasMarcadas;
  };
  

    const handleSelecionarTodosTable = () => {

      const checkboxItems = document.getElementsByClassName('checkbox-item-table');
      const checkboxMestre = document.getElementsByClassName('checkbox-mestre-table')

      if (isChecked === false) {
        setIsChecked(true)
        checkboxMestre[0].checked = true
        setElementosSelecionados([]);
        for (let i = 0; i < checkboxItems.length; i++) {
          checkboxItems[i].checked = true;
          let elemento = JSON.parse(checkboxItems[i].value);
          setElementosSelecionados((prevValues) => [...prevValues, elemento]);
        }
      } else {
        setIsChecked(false)
        checkboxMestre[0].checked = false
        for (let i = 0; i < checkboxItems.length; i++) {
          checkboxItems[i].checked = false;
        }

        setElementosSelecionados([]);
      }

      console.log(elementosSelecionados)

    }


    const handleSelecionarItemTable = (checked, record) => {

      const checkboxItems = document.getElementsByClassName('checkbox-item-table')
      const checkboxMestre = document.getElementsByClassName('checkbox-mestre-table')
      if(checked) {
        const etapaNaoExiste = !elementosSelecionados.some((e) => e.id === record.id);
        if (etapaNaoExiste) {
            setElementosSelecionados([...elementosSelecionados, record]);
          }
      } else {
        const novaLista = elementosSelecionados.filter((e) => e.id !== record.id);
        setElementosSelecionados(novaLista);
      }

      const todasEtapasMarcadas = checkboxItems.length > 0 && [...checkboxItems].every((el) => el.checked);
  
      setIsChecked(todasEtapasMarcadas);
      checkboxMestre[0].indeterminate = !todasEtapasMarcadas && elementosSelecionados.length > 0;
      checkboxMestre[0].checked = todasEtapasMarcadas;
    }

    const handleCliqueBotaoAdicionarEtapas = () => {
      setIsModalVisivel(true);
      setIsTurn('modal')
      setIsChecked(false)
    }

    const handleCliqueBotaoFechar = () => {
      setIsModalVisivel(false)
      setIsTurn('table')
      setIsChecked(false)
    }
    
    const handleCliqueBotaoRemoverSelecionados = () => {
      const novaListaEtapas = hasDadosEtapas.filter((etapa) => !elementosSelecionados.some((elemento) => elemento.id === etapa.id));
      setHasDadosEtapas(novaListaEtapas);
      setElementosSelecionados([]);
      const checkboxMestre = document.getElementsByClassName('checkbox-mestre-table')
      checkboxMestre[0].checked = false
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
                onCancel={handleCliqueBotaoFechar}
                onOk={handleBuscarEtapa}
                status={isModalVisivel}
                colunas={COLUNAS_MODAL}
            />
          </div>

          <div className="tab-vincular-etapas-content">

            <h4> ETAPAS A SEREM VINCULADAS </h4>

            <Button 
              className="button-adicionar-etapas" 
              type="primary" 
              onClick={handleCliqueBotaoAdicionarEtapas}
            > ADICIONAR ETAPAS </Button>
            
            <Button 
              className="button-remover-selecionados" 
              type="primary" 
              danger 
              disabled={elementosSelecionados.length === 0}
              onClick={handleCliqueBotaoRemoverSelecionados}
            > REMOVER SELECIONADOS </Button>


            <Table 
              dataSource={hasDadosEtapas}
              columns={COLUNAS_TABELA}
              rowKey="id"
            />

          </div>

          <div className="tab-vincular-etapas-footer">
            <Button onClick={() => setCurrent("1")}> 
                Voltar
            </Button>
            <Button type="primary" onClick={() => setCurrent("3")}> 
                Avançar
            </Button>
          </div>
            
        </div>
    )
}

export default TabVincularEtapas