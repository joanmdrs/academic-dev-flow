import React from "react";
import { FormProvider } from "./context/Provider/FormProvider";
import TabsFluxo from "./components/TabsFluxo/TabsFluxo"; 

const PageFluxo = () => {
    return (
        <FormProvider>
            <TabsFluxo />
        </FormProvider>
    )
}

export default PageFluxo