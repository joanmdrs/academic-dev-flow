import React from "react";
import { NotificationContainer } from "react-notifications";
import Add from "../../components/Buttons/Add/Add";
import Delete from "../../components/Buttons/Delete/Delete";
import Search from "../../components/Search/Search";
import Title from "../../components/Title/Title";

const PaginaArtefato = () => {


    return (
        <div>
            <NotificationContainer />
            <Title 
                title='Artefatos'
                paragraph='Artefatos > Gerenciar artefatos'
            />
        </div>

    )
}

export default PaginaArtefato;