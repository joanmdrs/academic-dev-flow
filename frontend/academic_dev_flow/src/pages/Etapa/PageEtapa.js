import React, { useEffect, useState } from "react";
import { NotificationContainer, NotificationManager } from "react-notifications";
import Titulo from "../../components/Titulo/Titulo";
import BotaoAdicionar from "../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoExcluir from "../../components/Botoes/BotaoExcluir/BotaoExcluir";
import BotaoAtualizar from "../../components/Botoes/BotaoAtualizar/BotaoAtualizar";
import BotaoFiltrar from "../../components/Botoes/BotaoFiltrar/BotaoFiltrar";
import ListaDados from "../../components/Listas/ListaDados/ListaDados";
import FormSalvarEtapa from "./components/FormSalvarEtapa/FormSalvarEtapa";
import { recarregarPagina } from "../../services/utils";
import { buscarEtapaPeloNome, excluirEtapa, listarEtapas } from "../../services/etapa_service";
import FormDeBusca from "../../components/Forms/FormDeBusca/FormDeBusca";

const PageEtapa = () => {

    const [acaoForm, setAcaoForm] = useState("criar");
    const [isFormVisivel, setIsFormVisivel] = useState(false);
    const [isFormFiltrarVisivel, setIsFormFiltrarVisivel] = useState(false);
    const [isBotaoAdicionarVisivel, setIsBotaoAdicionarVisivel] = useState(false);
    const [isBotaoEditarVisivel, setIsBotaoEditarVisivel] = useState(true);
    const [isBotaoExcluirVisivel, setIsBotaoExcluirVisivel] = useState(true);

    const [dadosEtapas, setDadosEtapas] = useState([]);
    const [etapaSelecionada, setEtapaSelecionada] = useState({id: "", nome: "", descricao: ""});

    const COLUNAS_LISTA = [
        {
            title: "Código",
            key: "codigo",
            dataIndex: "id",
        },
        {
            title: "Nome",
            dataIndex: "nome",
            key: "nome",
        },
        {
            title: "Descrição",
            dataIndex: "descricao",
            key: "descricao",
        },
    ];

    const handleListarEtapas = async () => { 
        
        try {
            const resposta = await listarEtapas()

            if(resposta.status === 200) {
                setDadosEtapas(resposta.data)
            } else {
                NotificationManager.error("Ocorreu um problema durante a busca dos dados, contate o suporte!");
            }
        } catch (error) {
            NotificationManager.error("Ocorreu um problema durante a busca dos dados, contate o suporte!");
        }
    }

    useEffect(() => {
        handleListarEtapas();
    }, []);

    const handleCliqueBotaoFiltrar = () => {
        setIsFormFiltrarVisivel((prevIsFormFiltrarVisivel) => !prevIsFormFiltrarVisivel);
    }

    const handleFiltrarEtapas = async (parametro) => {

        try {
            const resposta = await buscarEtapaPeloNome(parametro)
            if(resposta.status === 200) {
                setDadosEtapas(resposta.data.results)

            } else {
                NotificationManager.error("Ocorreu um problema, contate o suporte!");
            }
        } catch (error) {
            NotificationManager.error("Ocorreu um problema, contate o suporte!");
        }
    }   

    const handleCliqueEtapaSelecionada = (dados) => {
        setIsBotaoEditarVisivel(false)
        setEtapaSelecionada(dados)
        setIsBotaoExcluirVisivel(false)
    }

    const handleCliqueBotaoAdicionar = () => {
        setAcaoForm('criar')
        setIsFormVisivel(true);
    };

    const handleCliqueBotaoEditar = () => {
        setAcaoForm("atualizar")
        setIsFormVisivel(true)
    }

    const handleCliqueBotaoExcluir = async () => {

        try {
            const idEtapa = etapaSelecionada.id
            const resposta = await excluirEtapa(idEtapa)

            if(resposta.status === 204) {
                NotificationManager.success("Etapa excluída com sucesso!");
                recarregarPagina();
        } else {
            NotificationManager.error("Ocorreu um problema, contate o suporte!");
        }
        } catch (error) {
            NotificationManager.error("Ocorreu um problema, contate o suporte!");
        }
    }

    const handleCliqueBotaoVoltar = () => {
        setIsFormVisivel(false)
        setIsBotaoAdicionarVisivel(false)
        setIsBotaoEditarVisivel(true)
        setIsBotaoExcluirVisivel(true)
        setEtapaSelecionada({id: "", nome: "", descricao: ""})
    }

    return (
        <div>
            <NotificationContainer />

            {isFormVisivel ? (

                <FormSalvarEtapa 
                    acaoBotaoVoltar={handleCliqueBotaoVoltar} 
                    acaoForm={acaoForm} 
                    etapaSelecionada={etapaSelecionada}
                />

            ) : (
                <>
                    <Titulo
                        titulo='Etapas'
                        paragrafo='Etapas > Gerenciar etapas'
                    />

                    <div className="botoes-de-acao">
                        <div id="botao-filtrar"> 
                            <BotaoFiltrar funcao={handleCliqueBotaoFiltrar}  />
                        </div>
                        <div id="botao-adicionar-atualizar-deletar"> 
                            <BotaoAdicionar funcao={handleCliqueBotaoAdicionar} status={isBotaoAdicionarVisivel}/>
                            <BotaoAtualizar funcao={handleCliqueBotaoEditar} status={isBotaoEditarVisivel}/>
                            <BotaoExcluir funcao={handleCliqueBotaoExcluir} status={isBotaoExcluirVisivel}/>
                        </div>
                    </div>

                    {isFormFiltrarVisivel && (<FormDeBusca executeFuncao={handleFiltrarEtapas}/>)}
                
                    <ListaDados 
                        colunas={COLUNAS_LISTA} 
                        dados={dadosEtapas} 
                        onClickRow={handleCliqueEtapaSelecionada}
                    />
                </>
            )}
            
        </div>

    )
}

export default PageEtapa;