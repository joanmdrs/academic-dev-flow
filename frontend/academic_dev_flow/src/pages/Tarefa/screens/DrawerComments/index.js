import React from "react";
import { ProviderComentario } from "../../../Comentario/context/ContextoComentario";
import DrawerComments from "./DrawerComments";


const ScreenDrawerComments = ({idTarefa, idProjeto, isDrawerVisible, closeDrawer }) => {
    return (
        <React.Fragment>
            <ProviderComentario >
                <DrawerComments idTarefa={idTarefa} idProjeto={idProjeto} isDrawerVisible={isDrawerVisible} closeDrawer={closeDrawer}/> 
            </ProviderComentario>
            
        </React.Fragment>   
    )
}

export default ScreenDrawerComments