import React from "react";
import { FormProvider } from "../../context/Provider/FormProvider";
import TabsFluxo from "../../components/Tabs/Tabs";

const ScreenCadastrarFluxo = () => {

    return (
        <FormProvider>
            <TabsFluxo />
        </FormProvider>
    )
}

export default ScreenCadastrarFluxo;