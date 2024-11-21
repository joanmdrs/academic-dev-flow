import React, { useState } from "react";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { listIssues } from "../../../../services/githubIntegration/issueService";
import TableIssues from "../../components/TableIssues/TableIssues";
import { Button, Result, Tabs } from "antd";
import SpinLoading from "../../../../components/SpinLoading/SpinLoading";
import { FaFilter } from "react-icons/fa";
import { RxReset } from "react-icons/rx";

const { TabPane } = Tabs;

const Issues = () => {
    const { dadosProjeto } = useContextoGlobalProjeto();
    const [openIssues, setOpenIssues] = useState([]);
    const [closedIssues, setClosedIssues] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleBuscarIssues = async () => {

        if(dadosProjeto.nome_repo && dadosProjeto.token) {
            setIsLoading(true);

            const parametros = {
                github_token: dadosProjeto.token,
                repository: dadosProjeto.nome_repo,
            };

            const response = await listIssues(parametros);

            if (!response.error && response.data) {
                const openIssuesList = [];
                const closedIssuesList = [];
                response.data.forEach(issue => {

                    if (issue.state === "open") {
                        openIssuesList.push(issue);
                    } else if (issue.state === "closed") {
                        closedIssuesList.push(issue);
                    }
                });

                setOpenIssues(openIssuesList);
                setClosedIssues(closedIssuesList);
            }
            setIsLoading(false);
        }
        
    };

    const handleResetar = () => {
        setClosedIssues([])
        setOpenIssues([])
    }

    return (

        <div>

            {dadosProjeto?.nome_repo && dadosProjeto?.token ? (

                <div> 
                    <div className="df jc-between pa-t-20 pa-b-20" style={{borderBottom: '1px solid #ddd'}}>
                        <Button icon={<FaFilter />} type="primary" onClick={() => handleBuscarIssues()}> 
                            Buscar Issues
                        </Button>

                        <Button icon={<RxReset />} type="primary" ghost onClick={() => handleResetar()}> 
                            Resetar
                        </Button>

                    </div>

                    <div> 
                        <Tabs
                            style={{ paddingTop: "10px" }}
                            size="middle"
                            tabPosition="left"
                        >
                            <TabPane style={{ padding: "20px" }} tab="Open" key="1">
                                {!isLoading ? <TableIssues data={openIssues} /> : <SpinLoading />}
                            </TabPane>
                            <TabPane style={{ padding: "20px" }} tab="Closed" key="2">
                                {!isLoading ? <TableIssues data={closedIssues} /> : <SpinLoading />}
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
                
            ) : (
                <Result
                    status="info"
                    title="Este projeto não possui credenciais de acesso a um repositório do GitHub."
                    subTitle="Para realizar a conexão com o GitHub, adicione as informações de acesso ao repositório no menu de Projetos."
                />
            )}
        </div>
    );
};

export default Issues;
