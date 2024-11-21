import { Button, Tabs } from "antd";
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { FaArrowRotateRight } from "react-icons/fa6";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { listIssues } from "../../../../services/githubIntegration/issueService";
import Titulo from "../../../../components/Titulo/Titulo";
import FormFilterIssues from "../../components/FormFilterIssues/FormFilterIssues";
import TableIssues from "../../components/TableIssues/TableIssues";
import SpinLoading from "../../../../components/SpinLoading/SpinLoading";

const {TabPane} = Tabs

const AdminIssues = () => {

    const {dadosProjeto} = useContextoGlobalProjeto();
    const [isFormVisivel, setIsFormVisivel] = useState(true)
    const [isTabsVisible, setIsTabsVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [openIssues, setOpenIssues] = useState([]);
    const [closedIssues, setClosedIssues] = useState([]);

    const handleResetar = () => {
        setClosedIssues([])
        setOpenIssues([])
        setIsTabsVisible(false)
        setIsFormVisivel(false)
    }

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

    return (
        <div className="content">

            <Titulo 
                titulo="Issues"
                paragrafo="Issues > Gerenciar Issues"
            />

            <div style={{display:'flex', justifyContent: 'space-between', margin: '20px'}}> 

                <div style={{display: 'flex', gap: '10px'}}> 
                    <Button 
                        type="primary"
                        icon={<FaFilter />}
                        onClick={() => setIsFormVisivel(!isFormVisivel)}
                    >
                        Filtrar
                    </Button>

                    <Button
                        type="primary"
                        icon={<FaArrowRotateRight />}
                        onClick={handleResetar}
                        ghost
                    >
                        Resetar
                    </Button>
                </div>

            </div>

            { isFormVisivel && (
                <div style={{width: '50%'}}>
                    <FormFilterIssues onSearch={handleBuscarIssues} />
                </div>
            )}

            {isTabsVisible &&
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
            }

        </div>
    )
}

export default AdminIssues