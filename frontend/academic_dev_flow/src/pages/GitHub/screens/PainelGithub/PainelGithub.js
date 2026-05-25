import { Breadcrumb, Tabs } from "antd";
import React from "react";
import { GoCommit, GoFileCode, GoIssueOpened } from "react-icons/go";
import Issues from "../Issues/Issues";
import Contents from "../Contents/Contents";
import Commits from "../Commits/Commits";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import Section from "../../../../components/Section/Section";
import SectionHeader from "../../../../components/SectionHeader/SectionHeader";
import { HomeOutlined } from "@ant-design/icons";
const {TabPane} = Tabs

const PainelGitHub = () => {
    
    const {dadosProjeto} = useContextoGlobalProjeto()

    return (
        <Section>

            <SectionHeader>


                <Breadcrumb
                    items={[
                        {
                            href: `/academicflow/home`,
                            title: <HomeOutlined />,
                        },
                        {
                            href: `/academicflow/github-integration`,
                            title: 'Github Integration',
                        },
                        
                    ]}
                />
            </SectionHeader>

            <div className="content"> 
                

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
        </Section>

        
    )
}

export default PainelGitHub