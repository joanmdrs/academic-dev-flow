import React, { useEffect, useState } from "react";
import FormGenericTarefa from "../FormGenericTarefa/FormGenericTarefa";
import { useContextoTarefa } from "../../context/ContextoTarefa";
import SelecionarProjeto from "../SelecionarProjeto/SelecionarProjeto";

function FormAdminTarefa () {

    const {step} = useContextoTarefa()
    
    return (

        <React.Fragment> 
            { step === "0" && <SelecionarProjeto /> }
            { step === "1" && <FormGenericTarefa />}

        </React.Fragment>

    ) 
}

export default FormAdminTarefa