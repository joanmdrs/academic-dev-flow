import React from "react";
import { ProviderComentario } from "../../context/ContextoComentario";
import ComentariosArtefato from "./ComentariosArtefato";

const ScreenComentariosArtefato = () => {

    return (
        <React.Fragment>
            <ProviderComentario>
                <ComentariosArtefato />
            </ProviderComentario>
        </React.Fragment>   
    )
}

export default ScreenComentariosArtefato