import React, { useState } from "react";
import { NotificationContainer } from "react-notifications";
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
import BotaoVoltar from "../../components/Buttons/BotaoVoltar/BotaoVoltar";

const PaginaArtefato = () => {

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

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
            render: (text, record) => (
                <span
                    style={{ color: "blue", cursor: "pointer" }}
                >
                {text}
                </span>
            ),
        },
        {
            title: "Descrição",
            dataIndex: "descricao",
            key: "descricao",
        },
    ];

    const mostrarFormularioAdicao = () => {
        setMostrarFormulario(true);
    };



    return (
        <div>
            <NotificationContainer />

            {mostrarFormulario ? (

                <PaginaCadastrarArtefato onCancel={() => setMostrarFormulario(false)}/>

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
                            <Add onClick={mostrarFormularioAdicao}/>
                            <BotaoAtualizar />
                            <Delete />
                        </div>
                    </div>
                    <FormBuscarArtefato />

                    <ListaDeArtefatos colunas={colunas_tabela_artefatos} />
                </>
            )}
            
        </div>

    )
}

export default PaginaArtefato;