import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import { handleError } from "../../../../services/utils";
import { listIssues } from "../../../../services/githubIntegration/issueService";
import TableIssues from "../../components/TableIssues/TableIssues";
import { Result, Tabs } from "antd";
import SpinLoading from "../../../../components/SpinLoading/SpinLoading";
const { TabPane } = Tabs;

const Issues = () => {
    const { dadosProjeto, setDadosProjeto } = useContextoGlobalProjeto();
    const location = useLocation();
    const { state } = location;
    const [openIssues, setOpenIssues] = useState([]);
    const [closedIssues, setClosedIssues] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleBuscarProjeto = async () => {
        const response = await buscarProjetoPeloId(state.idProjeto);
        if (!response.error) {
            setDadosProjeto(response.data);
        }
    };

    const handleBuscarIssues = async () => {
        setIsLoading(true);
        const parametros = {
            github_token: state.tokenGithub,
            repository: state.repoGithub,
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
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (state.idProjeto) {
                    await handleBuscarProjeto();
                }
                if (state.repoGithub && state.tokenGithub) {
                    await handleBuscarIssues();
                }
            } catch (error) {
                handleError(error, "Falha ao tentar buscar os dados!");
            }
        };
        fetchData();
    }, [state]);

    return (
        <div className="global-div" style={{ backgroundColor: "#FFFFFF", height: "100%" }}>
            <div
                style={{
                    borderBottom: "1px solid #ddd",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    padding: "20px",
                    backgroundColor: "#FFFFFF",
                }}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <h2 style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontWeight: "600" }}>
                        Integração com o GitHub
                    </h2>
                    <h4 style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontWeight: "400" }}>
                        {dadosProjeto?.nome} | Issues
                    </h4>
                </div>
            </div>

            <div>
                {state.repoGithub && state.tokenGithub ? (
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
                ) : (
                    <Result
                        status="info"
                        title="Este projeto não possui credenciais de acesso a um repositório do GitHub."
                        subTitle="Para realizar a conexão com o GitHub, adicione as informações de acesso ao repositório no menu de Projetos."
                    />
                )}
            </div>
        </div>
    );
};

export default Issues;
