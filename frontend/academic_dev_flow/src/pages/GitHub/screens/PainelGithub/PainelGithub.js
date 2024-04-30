import { Tabs } from "antd";
import React from "react";
import GerenciarIssues from "../GerenciarIssues/GerenciarIssues";

const {TabPane} = Tabs

const PainelGithub = () => {

    return (

        <React.Fragment> 
            <Tabs tabPosition="left">
                <TabPane tab="Issues" key="1">
                    <GerenciarIssues />

                </TabPane>

                <TabPane tab="Contents" key="2">

                </TabPane>

                <TabPane tab="Labels" key="3">

                </TabPane>

                <TabPane tab="Commits" key="4">

                </TabPane>

            </Tabs>
            

        </React.Fragment>
    )
}

export default PainelGithub