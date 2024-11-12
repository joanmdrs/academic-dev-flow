import React from "react";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { Empty, Result, Tabs } from "antd";
import SpinLoading from "../../../../components/SpinLoading/SpinLoading";
import FormBuscarCommits from "../../components/FormBuscarCommits/FormBuscarCommits";
import { useContextoCommits } from "../../context/ContextoCommits";
import GraphBarCommits from "../../components/GraphBarCommits/GraphBarCommits";
import { VscGraph } from "react-icons/vsc";

const {TabPane} = Tabs

const Commits = () => {
    const { dadosProjeto} = useContextoGlobalProjeto();
    const { commits, loading} = useContextoCommits()

    return (
        <div>

            { (!dadosProjeto?.nome_repo || !dadosProjeto?.token) && (
                <div style={{padding: '20px'}}>
                    <Result
                        status="info"
                        title="Este projeto não possui credenciais de acesso a um repositório do GitHub."
                        subTitle="Para realizar a conexão com o GitHub, adicione as informações de acesso ao repositório no menu de Projetos."
                    />
                </div>
            )}

            { dadosProjeto?.nome_repo && dadosProjeto?.token && (
                <React.Fragment>
                    <div style={{
                        borderBottom: '1px solid #ddd',
                        paddingBottom: '10px',
                        paddingTop: '10px'
                    }}> 
                        <FormBuscarCommits />
                    </div>

                    <div style={{marginTop: '40px'}}>

                        { loading ? (
                            <SpinLoading />
                        ) : (
                            <React.Fragment>
                                { commits.length > 0 ? (

                                    <Tabs tabPosition="right">
                                        <TabPane tab={<VscGraph size="20px"/>} key="1">
                                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
                                                <GraphBarCommits data={commits} />
                                            </div>
                                        </TabPane>
                                    </Tabs>
                                    
                                ) : (
                                    <Empty
                                        description="Não há dados para exibir"
                                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                        style={{
                                            display: 'flex',
                                            width: "100%",
                                            height: "100%",
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '20px'
                                        }}
                                    >
                                    </Empty>
                                )}
                            </React.Fragment>
                            
                        )}
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

export default Commits;
