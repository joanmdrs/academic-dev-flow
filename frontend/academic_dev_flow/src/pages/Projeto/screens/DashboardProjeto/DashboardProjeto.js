import React, { useEffect, useLayoutEffect, useState } from "react";
import { listarTarefasPorProjeto } from "../../../../services/tarefaService";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { listarArtefatosPorProjeto } from "../../../../services/artefatoService";
import { Octokit } from "octokit";
import { handleError } from "../../../../services/utils";
import { Card, Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup';
import GraficoPizzaTarefaStatus from "../../../Graficos/GraficoPizzaTarefaStatus/GraficoPizzaTarefaStatus";

const DashboardProjeto = () => {

    const {dadosProjeto} = useContextoGlobalProjeto()
    const [tarefas, setTarefas] = useState([])
    const [qtdTarefas, setQtdTarefas] = useState(null)
    const [qtdArtefatos, setQtdArtefatos] = useState(null)
    const [qtdCommits, setQtdCommits] = useState(null)

    const handleGetTarefas = async () => {
        const response = await listarTarefasPorProjeto(dadosProjeto.id)
        if (!response.error){
            setQtdTarefas(response.data.length)
            setTarefas(response.data)
        }
    }

    const handleGetArtefatos = async () => {
        
        const response = await listarArtefatosPorProjeto(dadosProjeto.id)

        if(!response.error) {
            setQtdArtefatos(response.data.length)
        } 

    }

    const handleGetCommits = async () => {
        const octokit = new Octokit({
            auth: dadosProjeto.token
        });
    
        const [owner, repo] = dadosProjeto.nome_repo.split("/");
        const perPage = 100; 
    
        try {
            let allCommits = [];
            let page = 1;
            let response;
    
            do {
                response = await octokit.request('GET /repos/:owner/:repo/commits', {
                    owner: owner,
                    repo: repo,
                    per_page: perPage,
                    page: page
                });
    
                allCommits = allCommits.concat(response.data);
    
                page++;
    
            } while (response.data.length === perPage);
    
            setQtdCommits(allCommits.length);
            
        } catch (error) {
            handleError(new Error(`Erro ao obter commits: ${error}`));
        }
    }
    

    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto !== null){
                await handleGetTarefas()
                await handleGetArtefatos()
                await handleGetCommits()
            }
        }

        fetchData()
    }, [dadosProjeto])

    const formatter = (value) => <CountUp end={value} separator="," />;

    return (
        <React.Fragment>
            <Row gutter={16}>
                <Col span={8}>
                    <Card bordered={false}>
                        <Statistic
                            title="Total de tarefas"
                            value={qtdTarefas}
                            precision={2}
                            formatter={formatter}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false}>
                        <Statistic
                            title="Total de artefatos"
                            value={qtdArtefatos}
                            precision={2}
                            formatter={formatter}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false}>
                        <Statistic
                            title="Total de commits"
                            value={qtdCommits}
                            precision={2}
                            formatter={formatter}
                        />
                    </Card>
                </Col>
            </Row>

            <div className="global-div" style={{margin: '0', marginTop: '20px'}}> 
                { tarefas.length > 0 && (
                    <GraficoPizzaTarefaStatus taskData={tarefas} />
                )}
            </div>

            
        </React.Fragment>
    )
}

export default DashboardProjeto