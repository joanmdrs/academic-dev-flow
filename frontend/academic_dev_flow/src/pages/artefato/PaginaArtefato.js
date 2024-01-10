import React, { useEffect, useState } from "react";
import { NotificationContainer, NotificationManager } from "react-notifications";
import BotaoAdicionar from "../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoExcluir from "../../components/Botoes/BotaoExcluir/BotaoExcluir";
import Titulo from "../../components/Titulo/Titulo";
import FormBuscarArtefato from "../../components/Forms/FormBuscarArtefato/FormBuscarArtefato";
import BotaoAtualizar from "../../components/Botoes/BotaoAtualizar/BotaoAtualizar";
import "./PaginaArtefato.css";
import BotaoFiltrar from "../../components/Botoes/BotaoFiltrar/BotaoFiltrar";
import ListaDeArtefatos from "../../components/Listas/ListaDeArtefatos/ListaDeArtefatos";
import PaginaCadastrarArtefato from "./PaginaCadastrarArtefato";
import { buscarArtefatoPeloNome, excluirArtefato, listarArtefatos } from "../../services/artefato_service";
import { recarregarPagina } from "../../services/utils";

const PaginaArtefato = () => {

    const [acaoForm, setAcaoForm] = useState("criar");
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [monstrarFormFiltrar, setMostrarFormFiltrar] = useState(false);
    const [statusBotaoAdicionar, setStatusBotaoAdicionar] = useState(false);
    const [statusBotaoEditar, setStatusBotaoEditar] = useState(true);
    const [statusBotaoExcluir, setStatusBotaoExcluir] = useState(true);
    const [dadosArtefatos, setDadosArtefatos] = useState([]);
    const [dadosLinhaListaArtefatos, setDadosLinhaListaArtefatos] = useState({id: "", nome: "", descricao: ""});

    const colunas_tabela_artefatos = [
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
        setMostrarFormFiltrar((prevMostrarFormFiltrar) => !prevMostrarFormFiltrar);
    }

    const handleFiltrarArtefatos = async (parametro) => {

        try {
            const resposta = await buscarArtefatoPeloNome(parametro)

            console.log(resposta)
            if(resposta.status === 200) {
                setDadosArtefatos(resposta.data)

            } else {
                NotificationManager.error("Ocorreu um problema, contate o suporte!");
            }
        } catch (error) {
            NotificationManager.error("Ocorreu um problema, contate o suporte!");
        }
    }   

    const handleCliqueLinhaTabelaArtefatos = (linha_dados) => {
        setStatusBotaoEditar(false)
        setDadosLinhaListaArtefatos(linha_dados)
        setStatusBotaoExcluir(false)
    }

    const handleCliqueBotaoAdicionar = () => {
        setAcaoForm('criar')
        setMostrarFormulario(true);
    };

    const handleCliqueBotaoEditar = () => {
        setAcaoForm("atualizar")
        setMostrarFormulario(true)
    }

    const handleCliqueBotaoExcluir = async () => {

        try {
            const resposta = await excluirArtefato(dadosLinhaListaArtefatos.id)

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
        setMostrarFormulario(false)
        setStatusBotaoAdicionar(false)
        setStatusBotaoEditar(true)
        setStatusBotaoExcluir(true)
        setDadosLinhaListaArtefatos({id: "", nome: "", descricao: ""})
    }

    return (
        <div>
            <NotificationContainer />

            {mostrarFormulario ? (

                <PaginaCadastrarArtefato 
                    onCancel={handleCliqueBotaoVoltar} 
                    acaoForm={acaoForm} 
                    dados_linha={dadosLinhaListaArtefatos}
                />

            ) : (
                <>
                    <Titulo
                        titulo='Artefatos'
                        paragrafo='Artefatos > Gerenciar artefatos'
                    />

                   

                    <div className="botoes-de-acao">
                        <div id="botao-filtrar"> 
                            <BotaoFiltrar onClick={handleCliqueBotaoFiltrar} />
                        </div>
                        <div id="botao-adicionar-atualizar-deletar"> 
                            <BotaoAdicionar funcao={handleCliqueBotaoAdicionar} status={statusBotaoAdicionar}/>
                            <BotaoAtualizar funcao={handleCliqueBotaoEditar} status={statusBotaoEditar}/>
                            <BotaoExcluir funcao={handleCliqueBotaoExcluir} status={statusBotaoExcluir}/>
                        </div>
                    </div>

                    {monstrarFormFiltrar && (<FormBuscarArtefato executeFuncao={handleFiltrarArtefatos}/>)}
                    

                    <ListaDeArtefatos 
                        colunas={colunas_tabela_artefatos} 
                        dados={dadosArtefatos} 
                        onClickRow={handleCliqueLinhaTabelaArtefatos}
                    />
                </>
            )}
            
        </div>

    )
}

export default PaginaArtefato;