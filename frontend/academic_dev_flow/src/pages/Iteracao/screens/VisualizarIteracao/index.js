import React from "react";
import { ProviderIteracao } from "../../context/contextoIteracao";
import VisualizarIteracao from "./VisualizarIteracao";

const ScreenVisualizarIteracao = () => {


    return (
        <React.Fragment>
            <ProviderIteracao>
                <VisualizarIteracao />
            </ProviderIteracao>
        </React.Fragment>   
    )
}

export default ScreenVisualizarIteracao