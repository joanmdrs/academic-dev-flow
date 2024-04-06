import React from "react";
import { useRegisterContexto } from "../../context/RegisterContexto";
import SelecionarGrupo from "../SelecionarGrupo/SelecionarGrupo";
import FormRegister from "../FormRegister/FormRegister";
import SelecionarArea from "../SelecionarArea/SelecionarArea";

const StepsRegister = () => {

    const {step} = useRegisterContexto()

    return (
        <div> 

            { step === "1" && <SelecionarGrupo />}
            { step === "2" && <SelecionarArea />}
            { step === "3" && <FormRegister />}
        </div>

    )
}

export default StepsRegister