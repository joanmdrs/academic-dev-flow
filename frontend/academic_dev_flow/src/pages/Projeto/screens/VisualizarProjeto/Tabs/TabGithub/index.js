import { Tabs } from "antd";
import React from "react";
import { ProviderCommits } from "../../../../../GitHub/context/ContextoCommits";
import GitHub from "./Github";

const TabGitHub = () => {

    return (
        <React.Fragment>
            <ProviderCommits>
                <GitHub />
            </ProviderCommits>
        </React.Fragment>
    )
}

export default TabGitHub