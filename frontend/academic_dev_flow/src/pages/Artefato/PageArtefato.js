import React, { useEffect, useState } from "react";
import { NotificationContainer, NotificationManager } from "react-notifications";
import BotaoAdicionar from "../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoExcluir from "../../components/Botoes/BotaoExcluir/BotaoExcluir";
import Titulo from "../../components/Titulo/Titulo";
import FormBuscarArtefato from "./components/FormBuscarArtefato/FormBuscarArtefato";
import BotaoAtualizar from "../../components/Botoes/BotaoAtualizar/BotaoAtualizar";
import "./PageArtefato.css";
import BotaoFiltrar from "../../components/Botoes/BotaoFiltrar/BotaoFiltrar";
import ListaDeArtefatos from "./components/ListaDeArtefatos/ListaDeArtefatos";
import FormSalvarArtefato from "./components/FormSalvarArtefato/FormSalvarArtefato"
import { buscarArtefatoPeloNome, excluirArtefato, listarArtefatos } from "../../services/artefato_service";
import { recarregarPagina } from "../../services/utils";

const PageArtefato = () => {

    const [acaoForm, setAcaoForm] = useState("criar");
    const [isFormVisivel, setIsFormVisivel] = useState(false);
    const [isFormFiltrarVisivel, setIsFormFiltrarVisivel] = useState(false);
    const [isBotaoAdicionarVisivel, setIsBotaoAdicionarVisivel] = useState(false);
    const [isBotaoEditarVisivel, setIsBotaoEditarVisivel] = useState(true);
    const [isBotaoExcluirVisivel, setIsBotaoExcluirVisivel] = useState(true);

    const [dadosArtefatos, setDadosArtefatos] = useState([]);
    const [dadosArtefatoSelecionado, setDadosArtefatoSelecionado] = useState({id: "", nome: "", descricao: ""});

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

    const handleListarArtefatos = async () => { 
        
        try {
            const resposta = await listarArtefatos()

            if(resposta.status === 200) {
                setDadosArtefatos(resposta.data)
            } else {
                NotificationManager.error("Ocorreu um problema durante a busca dos dados, contate o suporte!");
            }
        } catch (error) {
            NotificationManager.error("Ocorreu um problema durante a busca dos dados, contate o suporte!");
        }
    }

    useEffect(() => {
        handleListarArtefatos();
    }, []);

    const handleCliqueBotaoFiltrar = () => {
        setIsFormFiltrarVisivel((prevIsFormFiltrarVisivel) => !prevIsFormFiltrarVisivel);
    }

    const handleFiltrarArtefatos = async (parametro) => {

        try {
            const resposta = await buscarArtefatoPeloNome(parametro)

            if(resposta.status === 200) {
                setDadosArtefatos(resposta.data)

            } else {
                NotificationManager.error("Ocorreu um problema, contate o suporte!");
            }
        } catch (error) {
            NotificationManager.error("Ocorreu um problema, contate o suporte!");
        }
    }   

    const handleCliqueLinhaTabelaArtefatos = (dados) => {
        setIsBotaoEditarVisivel(false)
        setDadosArtefatoSelecionado(dados)
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
            const resposta = await excluirArtefato(dadosArtefatoSelecionado.id)

            if(resposta.status === 204) {
                NotificationManager.success("Artefato excluído com sucesso!");
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
        setDadosArtefatoSelecionado({id: "", nome: "", descricao: ""})
    }

    return (
        <div>
            <NotificationContainer />

            {isFormVisivel ? (

                <FormSalvarArtefato 
                    acaoBotaoVoltar={handleCliqueBotaoVoltar} 
                    acaoForm={acaoForm} 
                    dadosLinhaListaArtefatos={dadosArtefatoSelecionado}
                />

            ) : (
                <>
                    <Titulo
                        titulo='Artefatos'
                        paragrafo='Artefatos > Gerenciar artefatos'
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

                    {isFormFiltrarVisivel && (<FormBuscarArtefato executeFuncao={handleFiltrarArtefatos}/>)}
                
                    <ListaDeArtefatos 
                        colunas={COLUNAS_LISTA} 
                        dados={dadosArtefatos} 
                        onClickRow={handleCliqueLinhaTabelaArtefatos}
                    />
                </>
            )}
            
        </div>

    )
}

export default PageArtefato;