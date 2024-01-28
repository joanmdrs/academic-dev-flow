import React from "react";
import { FormProvider } from "../../context/Provider/FormProvider";
import TabsCriarFluxo from "../../components/TabsCriarFluxo/TabsCriarFluxo";

const ScreenCadastrarFluxo = () => {

    return (
        <FormProvider>
            <TabsCriarFluxo />
        </FormProvider>
    )
}

export default ScreenCadastrarFluxo;