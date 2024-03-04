import React, { useEffect, useState } from "react";
import { NotificationContainer, NotificationManager } from "react-notifications";
import BotaoAdicionar from "../../../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoExcluir from "../../../../components/Botoes/BotaoExcluir/BotaoExcluir";
import Titulo from "../../../../components/Titulo/Titulo";
import BotaoAtualizar from "../../../../components/Botoes/BotaoAtualizar/BotaoAtualizar";
import BotaoFiltrar from "../../../../components/Botoes/BotaoFiltrar/BotaoFiltrar";
import { buscarArtefatoPeloNome, excluirArtefato, listarArtefatos } from "../../../../services/artefatoService";
import { recarregarPagina } from "../../../../services/utils";
import ListaDados from "../../../../components/Listas/ListaDados/ListaDados";
import FormDeBusca from "../../../../components/Forms/FormDeBusca/FormDeBusca";
import ScreenSalvarArtefatos from "../ScreenSalvarArtefatos/ScreenSalvarArtefatos";

const ScreenGerenciarArtefatos = () => {

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

                <ScreenSalvarArtefatos 
                    acaoBotaoVoltar={handleCliqueBotaoVoltar} 
                    acaoForm={acaoForm} 
                    dadosLinhaListaArtefatos={dadosArtefatoSelecionado}
                />

            ) : (
                <React.Fragment>
                    <Titulo
                        titulo='Artefatos'
                        paragrafo='Artefatos > Gerenciar artefatos'
                    />

                    <div className="global-div">
                        <div className="button-menu">
                            <div id="botao-filtrar"> 
                                <BotaoFiltrar funcao={handleCliqueBotaoFiltrar}  />
                            </div>
                            <div className="grouped-buttons"> 
                                <BotaoAdicionar funcao={handleCliqueBotaoAdicionar} status={isBotaoAdicionarVisivel}/>
                                <BotaoAtualizar funcao={handleCliqueBotaoEditar} status={isBotaoEditarVisivel}/>
                                <BotaoExcluir funcao={handleCliqueBotaoExcluir} status={isBotaoExcluirVisivel}/>
                            </div>
                        </div>

                        {isFormFiltrarVisivel && (<FormDeBusca executeFuncao={handleFiltrarArtefatos}/>)}
                    
                        <ListaDados 
                            colunas={COLUNAS_LISTA} 
                            dados={dadosArtefatos} 
                            onClickRow={handleCliqueLinhaTabelaArtefatos}
                        />
                    </div>
                </React.Fragment>
            )}
            
        </div>
    )
}

export default ScreenGerenciarArtefatos;