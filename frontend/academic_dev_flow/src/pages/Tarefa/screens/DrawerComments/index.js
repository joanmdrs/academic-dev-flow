import React from "react";
import { ProviderComentario } from "../../../Comentario/context/ContextoComentario";
import DrawerComments from "./DrawerComments";


const ScreenDrawerComments = ({isDrawerVisible, closeDrawer }) => {
    return (
        <React.Fragment>
            <ProviderComentario >
                <DrawerComments isDrawerVisible={isDrawerVisible} closeDrawer={closeDrawer}/> 
            </ProviderComentario>
        </React.Fragment>   
    )
}

export default ScreenDrawerComments