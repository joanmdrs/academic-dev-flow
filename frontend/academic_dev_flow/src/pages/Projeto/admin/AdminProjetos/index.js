import React from "react";
import { ProviderProjeto } from "../../context/ContextoProjeto";
import AdminProjetos from "./AdminProjetos";

const ScreenAdminProjetos = () => {


    return (
        <React.Fragment>
            <ProviderProjeto>
                <AdminProjetos />
            </ProviderProjeto>            
        </React.Fragment>
        
    )
}


export default ScreenAdminProjetos