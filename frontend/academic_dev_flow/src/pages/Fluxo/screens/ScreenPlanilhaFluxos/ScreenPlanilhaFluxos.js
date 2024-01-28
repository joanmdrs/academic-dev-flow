import React, { useEffect, useState } from "react";
import "./ScreenPlanilhaFluxos.css";
import Titulo from "../../../../components/Titulo/Titulo"; 
import { buscarFluxoPeloNome, excluirFluxo, listarFluxos } from "../../../../services/fluxo_service"
import InputBuscarFluxo from "../../components/InputBuscarFluxo/InputBuscarFluxo"; 
import { NotificationManager } from "react-notifications";
import { FormProvider } from "../../context/Provider/FormProvider"; 
import BotaoFiltrar from "../../../../components/Botoes/BotaoFiltrar/BotaoFiltrar";
import BotaoVisualizar from "../../../../components/Botoes/BotaoVisualizar/BotaoVisualizar";
import BotaoAtualizar from "../../../../components/Botoes/BotaoAtualizar/BotaoAtualizar";
import BotaoExcluir from "../../../../components/Botoes/BotaoExcluir/BotaoExcluir";
import ListaDados from "../../../../components/Listas/ListaDados/ListaDados";
import { removerVinculoEtapasFluxo } from "../../../../services/fluxo_etapa_service";

const ScreenPlanilhaFluxos = () => {

    const [hasDadosFluxo, setHasDadosFluxo] = useState([])
    const [isBotaoEditarVisivel, setIsBotaoEditarVisivel] = useState(true);
    const [isBotaoExcluirVisivel, setIsBotaoExcluirVisivel] = useState(true);
    const [isBotaoVisualizarVisivel, setIsBotaoVisualizarVisivel] = useState(true)
    const [fluxoSelecionado, setFluxoSelecionado] = useState({})

    const COLUNAS_TABELA = [
        {
            title: "ID",
            dataIndex: 'id',
            key: 'id',
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
        }
    ];

    const handleListarFluxos = async () => { 
        try {
            const resposta = await listarFluxos()

            if(resposta.status === 200) {
                setHasDadosFluxo(resposta.data)

            } else {
                NotificationManager.error("Ocorreu um problema durante a busca dos dados, contate o suporte!");
            }
        } catch (error) {
            NotificationManager.error("Ocorreu um problema durante a busca dos dados, contate o suporte!");
        }
    }

    useEffect(() => {
        handleListarFluxos();
    }, []);

    const handleBuscarFluxo = async (parametro) => {
        const resposta = await buscarFluxoPeloNome(parametro);
        setHasDadosFluxo(resposta.data)
    }

    const handleCliqueLinhaTabela = (record) => {
        console.log(record)
        setIsBotaoEditarVisivel(false)
        setIsBotaoExcluirVisivel(false)
        setIsBotaoVisualizarVisivel(false)
        setFluxoSelecionado(record)
    }

    const handleExcluirFluxo = async () => {

        try {
            const idFluxo = fluxoSelecionado.id
            const resposta = await excluirFluxo(idFluxo)

            if (resposta.status === 204){ 
                NotificationManager.success("Fluxo excluído com sucesso !")
            } else {
                NotificationManager.error("Falha ao excluir o fluxo, contate o suporte!");
            }
        } catch (error) {
            NotificationManager.error("Ocorreu um problema durante a operação, contate o suporte!");
        }
    }

    const handleExcluirVinculoEtapasFluxo = async () => {

        try {
            const idFluxo = fluxoSelecionado.id
            const resposta = await removerVinculoEtapasFluxo(idFluxo)
            if (resposta.status === 204) {
                await handleExcluirFluxo()
            } else {
                NotificationManager.error('Falhar ao excluir o vínculo entre o fluxo e as etapas, contate o suporte!')
            }
        } catch (error) {
            NotificationManager.error("Ocorreu um problema durante a operação, contate o suporte!");
        }
    }


    return (
        <FormProvider>
            <div>
                < Titulo 
                    titulo="Planilha de fluxos" 
                    paragrafo="Fluxos > Planilha de fluxos"
                />

                <div className="component-screen-planilha-fluxos-content"> 
                    <div className="div-input-buscar-fluxo">
                        <InputBuscarFluxo  funcao={handleBuscarFluxo}/>
                    </div>  

                    <div className="div-botoes-interacao-fluxo">
                        <BotaoFiltrar />
                        <BotaoVisualizar status={isBotaoVisualizarVisivel} />
                        <BotaoAtualizar status={isBotaoEditarVisivel}/>
                        <BotaoExcluir status={isBotaoExcluirVisivel} funcao={handleExcluirVinculoEtapasFluxo} />
                    </div>
                    
                    <div className="div-tabela-lista-fluxos"> 
                        <ListaDados
                            colunas={COLUNAS_TABELA} 
                            dados={hasDadosFluxo} 
                            onClickRow={handleCliqueLinhaTabela} />
                    </div>
                     
                </div>
            </div>
                


        </FormProvider>
    )

}

export default ScreenPlanilhaFluxos; 