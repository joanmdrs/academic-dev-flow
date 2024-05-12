import React from "react";
import { ProviderGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { ProviderComentario } from "../../context/ContextoComentario";
import { useParams } from "react-router-dom";
import ComentariosArtefato from "./ComentariosArtefato";

const ScreenComentariosArtefato = () => {

    const { idTarefa } = useParams();

    return (
        <React.Fragment>
            <ProviderGlobalProjeto>
                <ProviderComentario>
                    <ComentariosArtefato />
                </ProviderComentario>
            </ProviderGlobalProjeto>
        </React.Fragment>   
    )
}

export default ScreenComentariosArtefato