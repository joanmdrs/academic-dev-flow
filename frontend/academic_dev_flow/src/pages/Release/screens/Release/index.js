import React from "react";
import Release from "./Release";
import { ProviderRelease } from "../../context/ContextoRelease";

const ScreenRelease = () => {


    return (
        <React.Fragment>
            <ProviderRelease>
                <Release />
            </ProviderRelease>
        </React.Fragment>   
    )
}

export default ScreenRelease