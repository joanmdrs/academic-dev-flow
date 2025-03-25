import { Tabs } from "antd";
import React from "react";
import { GoCommit, GoFileCode, GoIssueOpened } from "react-icons/go";
import Issues from "../Issues/Issues";
import Contents from "../Contents/Contents";
import Commits from "../Commits/Commits";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
const {TabPane} = Tabs

const PainelGitHub = () => {
    
    const {dadosProjeto} = useContextoGlobalProjeto()

    return (
        <div className="content"> 
            <div style={{
                borderBottom: '1px solid #ddd',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                padding: '20px'
            }}> 
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <h2 
                        style={{
                            margin: 0, 
                            fontWeight: '600'
                        }}> Integração com o GitHub </h2>
                    <h4 
                        style={{
                            margin: 0, 
                            fontWeight: '400'}}> {dadosProjeto?.nome} </h4>
                </div>
            </div>

            <div className="pa-20"> 
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
            </div>
        </div>

        
    )
}

export default PainelGitHub