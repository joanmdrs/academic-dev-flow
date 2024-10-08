import { Tabs } from "antd";
import React from "react";
import GerenciarIssues from "../GerenciarIssues/GerenciarIssues";
import GerenciarContents from "../GerenciarContents/GerenciarContents";
import ScreenGerenciarCommits from "../GerenciarCommits";

const {TabPane} = Tabs

const PainelGithub = () => {

    return (

        <React.Fragment> 
            <Tabs tabPosition="left">
                <TabPane tab="Issues" key="1">
                    <GerenciarIssues />

                </TabPane>

                <TabPane tab="Contents" key="2">
                    <GerenciarContents />
                </TabPane>

                {/* <TabPane tab="Labels" key="3">
                    <GerenciarLabels />
                </TabPane> */}

                <TabPane tab="Commits" key="4">
                    <ScreenGerenciarCommits />
                </TabPane>

            </Tabs>
            

        </React.Fragment>
    )
}

export default PainelGithub