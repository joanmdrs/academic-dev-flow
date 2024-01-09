import React, { useEffect, useState } from "react";
import { NotificationContainer, NotificationManager } from "react-notifications";
import Add from "../../components/Buttons/Add/Add";
import Delete from "../../components/Buttons/Delete/Delete";
import Search from "../../components/Search/Search";
import Title from "../../components/Title/Title";
import FormBuscarArtefato from "../../components/Forms/FormBuscarArtefato/FormBuscarArtefato";
import BotaoAtualizar from "../../components/Buttons/BotaoAtualizar/BotaoAtualizar";
import "./PaginaArtefato.css";
import BotaoFiltrar from "../../components/Buttons/BotaoFiltrar/BotaoFiltrar";
import ListaDeArtefatos from "../../components/Listas/ListaDeArtefatos/ListaDeArtefatos";
import PaginaCadastrarArtefato from "./PaginaCadastrarArtefato";
import { excluirArtefato, listarArtefatos } from "../../services/artefato_service";
import { recarregarPagina } from "../../services/utils";

const PaginaArtefato = () => {

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [acaoForm, setAcaoForm] = useState("criar")
    const [dadosArtefatos, setDadosArtefatos] = useState([])
    const [dadosLinhaListaArtefatos, setDadosLinhaListaArtefatos] = useState({id: "", nome: "", descricao: ""})
    const [statusBotaoAdicionar, setStatusBotaoAdicionar] = useState(false);
    const [statusBotaoEditar, setStatusBotaoEditar] = useState(true);
    const [statusBotaoExcluir, setStatusBotaoExcluir] = useState(true)

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
                    <Title 
                        title='Artefatos'
                        paragraph='Artefatos > Gerenciar artefatos'
                    />

                   

                    <div className="botoes-de-acao">
                        <div id="botao-filtrar"> 
                            <BotaoFiltrar />
                        </div>
                        <div id="botao-adicionar-atualizar-deletar"> 
                            <Add onClick={handleCliqueBotaoAdicionar} disabled={statusBotaoAdicionar}/>
                            <BotaoAtualizar onClick={handleCliqueBotaoEditar} disabled={statusBotaoEditar}/>
                            <Delete onClick={handleCliqueBotaoExcluir} disabled={statusBotaoExcluir}/>
                        </div>
                    </div>
                    <FormBuscarArtefato />

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