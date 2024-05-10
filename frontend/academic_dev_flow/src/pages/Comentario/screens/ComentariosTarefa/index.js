import React from "react";
import { ProviderGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { ProviderComentario } from "../../context/ContextoComentario";
import { useParams } from "react-router-dom";
import ComentariosTarefa from "./ComentariosTarefa";

const ScreenComentariosTarefa = () => {

    const { idTarefa } = useParams();

    console.log(idTarefa)

    return (
        <React.Fragment>
            <ProviderGlobalProjeto>
                <ProviderComentario>
                    <ComentariosTarefa idTarefa={idTarefa} />
                </ProviderComentario>
            </ProviderGlobalProjeto>
        </React.Fragment>   
    )
}

export default ScreenComentariosTarefa