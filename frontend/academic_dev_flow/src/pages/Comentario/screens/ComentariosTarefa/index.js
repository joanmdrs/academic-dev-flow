import React from "react";
import { ProviderGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { ProviderComentario } from "../../context/ContextoComentario";
import { useParams } from "react-router-dom";
import ComentariosTarefa from "./ComentariosTarefa";

const ScreenComentariosTarefa = () => {

    return (
        <React.Fragment>
            <ProviderComentario>
                <ComentariosTarefa />
            </ProviderComentario>
        </React.Fragment>   
    )
}

export default ScreenComentariosTarefa
