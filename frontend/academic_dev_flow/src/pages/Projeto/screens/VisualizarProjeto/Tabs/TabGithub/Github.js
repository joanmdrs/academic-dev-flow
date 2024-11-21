import { Tabs } from "antd";
import React from "react";
import { GoCommit, GoFileCode, GoIssueOpened } from "react-icons/go";
import Issues from "../../../../../GitHub/screens/Issues/Issues";
import Contents from "../../../../../GitHub/screens/Contents/Contents";
import Commits from "../../../../../GitHub/screens/Commits/Commits";
const {TabPane} = Tabs

const GitHub = () => {


    return (
        <Tabs 
            size="middle"
            tabPosition="top"
            indicator={{
                align: "center"
            }}
        >   
            <TabPane tab={<> <GoIssueOpened /> Issues </>} key="issues">
                <Issues />
            </TabPane>

            <TabPane tab={<> <GoFileCode /> Contents </>} key="contents">
                <Contents />
            </TabPane>

            <TabPane tab={<> <GoCommit /> Commits </>} key="commits">
                <Commits />
            </TabPane>

        </Tabs>
    )
}

export default GitHub