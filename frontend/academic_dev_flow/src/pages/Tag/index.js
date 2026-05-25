import React from "react";
import {Layout} from 'antd'
import { ProviderTag } from "./context/ContextoTag";
import GerenciarTags from "./screens/GerenciarTags/GerenciarTags";
const { Content } = Layout;

const ScreenGerenciarTags = () => {

    return (
        <React.Fragment>
            <Content>
                <ProviderTag>
                    <GerenciarTags />
                </ProviderTag>
            </Content>
        </React.Fragment>
    )
}   

export default ScreenGerenciarTags