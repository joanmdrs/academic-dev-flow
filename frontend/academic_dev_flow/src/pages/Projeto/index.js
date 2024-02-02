import React from "react";
import { ProjetoProvider } from "./context/Provider/Provider";
import TabsProjeto from "./screens/TabsProjeto/TabsProjeto";

const PagePrincipal = () => {

    return (
        <ProjetoProvider>
            <TabsProjeto />
        </ProjetoProvider>
    )
}

export default PagePrincipal