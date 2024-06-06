import React from "react";
import { ProviderCommits } from "../../context/ContextoCommits";
import GerenciarCommits from "./GerenciarCommits";

const ScreenGerenciarCommits = () => {

    return (
        <React.Fragment>
            <ProviderCommits>
                <GerenciarCommits />
            </ProviderCommits>
        </React.Fragment>
    )
}

export default ScreenGerenciarCommits