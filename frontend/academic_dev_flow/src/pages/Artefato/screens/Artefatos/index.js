import React from "react";
import {Layout} from 'antd'
import { ProviderArtefato } from "../../context/ContextoArtefato";
import Artefatos from "./Artefatos";
const {Content} = Layout

const ScreenArtefatos = () => {

    return (
        <React.Fragment>
            <Content>
                <ProviderArtefato>
                    <Artefatos  />
                </ProviderArtefato>
            </Content>
        </React.Fragment>   
    )
}

export default ScreenArtefatos