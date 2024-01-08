import React from "react";
import { NotificationContainer } from "react-notifications";
import Add from "../../components/Buttons/Add/Add";
import Delete from "../../components/Buttons/Delete/Delete";
import Search from "../../components/Search/Search";
import Title from "../../components/Title/Title";
import FormBuscarArtefato from "../../components/Forms/FormBuscarArtefato/FormBuscarArtefato";
import BotaoAtualizar from "../../components/Buttons/BotaoAtualizar/BotaoAtualizar";
import "./PaginaArtefato.css";

const PaginaArtefato = () => {


    return (
        <div>
            <NotificationContainer />
            <Title 
                title='Artefatos'
                paragraph='Artefatos > Gerenciar artefatos'
            />

            <div className="botoes-de-acao">
                <Add />
                <BotaoAtualizar />
                <Delete />
            </div>
            <FormBuscarArtefato />
        </div>

    )
}

export default PaginaArtefato;