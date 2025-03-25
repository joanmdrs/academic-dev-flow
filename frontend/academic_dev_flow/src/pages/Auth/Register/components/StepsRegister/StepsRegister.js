import React from "react";
import { useRegisterContexto } from "../../context/RegisterContexto";
import SelecionarGrupo from "../SelecionarGrupo/SelecionarGrupo";
import FormRegister from "../FormRegister/FormRegister";
import SelecionarArea from "../SelecionarArea/SelecionarArea";

const StepsRegister = () => {
    const { step } = useRegisterContexto();

    return (
        <div style={{backgroundColor: "#FFFFFF"}}>
            {step === "1" && <SelecionarGrupo key="1" />}
            {step === "2" && <SelecionarArea key="2" />}
            {step === "3" && <FormRegister key="3" />}
        </div>
    );
};

export default StepsRegister;
