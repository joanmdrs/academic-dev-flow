import React from "react";
import { ProviderCommits } from "../../context/ContextoCommits";
import PainelGitHub from "./PainelGithub";

const ScreenPainelGitHub = () => {

    return (
        <React.Fragment>
            <ProviderCommits>
                <PainelGitHub />
            </ProviderCommits>
        </React.Fragment>   
    )
}

export default ScreenPainelGitHub
