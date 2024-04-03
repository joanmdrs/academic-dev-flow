import React from "react";
import { useRegisterContexto } from "../../context/RegisterContexto";
import SelecionarGrupo from "../SelecionarGrupo/SelecionarGrupo";
import FormRegister from "../FormRegister/FormRegister";

const StepsRegister = () => {

    const {step} = useRegisterContexto()

    return (
        <div> 

            { step === "1" && <SelecionarGrupo />}
            { step === "2" && <FormRegister />}
        </div>

    )
}

export default StepsRegister