import React from "react";
import { NotificationContainer } from "react-notifications";
import Add from "../../components/Buttons/Add/Add";
import Delete from "../../components/Buttons/Delete/Delete";
import Search from "../../components/Search/Search";
import Title from "../../components/Title/Title";
import FormBuscarArtefato from "../../components/Forms/FormBuscarArtefato/FormBuscarArtefato";
import BotaoAtualizar from "../../components/Buttons/BotaoAtualizar/BotaoAtualizar";
import "./PaginaArtefato.css";
import BotaoFiltrar from "../../components/Buttons/BotaoFiltrar/BotaoFiltrar";

const PaginaArtefato = () => {


    return (
        <div>
            <NotificationContainer />
            <Title 
                title='Artefatos'
                paragraph='Artefatos > Gerenciar artefatos'
            />

            <div className="botoes-de-acao">
                <div id="botao-filtrar"> 
                    <BotaoFiltrar />
                </div>
                <div id="botao-adicionar-atualizar-deletar"> 
                    <Add />
                    <BotaoAtualizar />
                    <Delete />
                </div>
            </div>
            <FormBuscarArtefato />
        </div>

    )
}

export default PaginaArtefato;