import React, { useState, useEffect, useRef } from "react";
import Aviso from "../../../../components/Aviso/Aviso";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { Button } from "antd";
import { FaSearch } from "react-icons/fa";
import { FaArrowRotateRight } from "react-icons/fa6";
import { BsQuestionCircle } from "react-icons/bs";
import { Octokit } from "octokit";
import { handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";
import Chart from "chart.js/auto";

const GerenciarCommits = () => {
    const { dadosProjeto } = useContextoGlobalProjeto();

    const [commits, setCommits] = useState([]);
    const [isAvisoVisivel, setIsAvisoVisivel] = useState(false);
    const chartRef = useRef(null);
    const chartInstance = useRef(null); // Referência para o objeto Chart

    useEffect(() => {
        renderChart();
    }, [commits]);

    const handleDuvidaClick = () => {
        setIsAvisoVisivel(true);
    };

    const handleAvisoClose = () => {
        setIsAvisoVisivel(false);
    };

    const handleGetCommits = async (since) => {
        const octokit = new Octokit({
            auth: dadosProjeto.token
        });

        const [owner, repo] = dadosProjeto.nome_repo.split("/");

        try {
            const response = await octokit.request('GET /repos/:owner/:repo/commits', {
                owner: owner,
                repo: repo,
                since: since
            });
            setCommits(response.data);
        } catch (error) {
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING);
        }
    };

    const handleResetar = () => {
        setCommits([]);
    };

    const renderChart = () => {
        const ctx = chartRef.current;
        if (!ctx) return;

        if (chartInstance.current) {
            chartInstance.current.destroy(); // Destruir o gráfico existente antes de criar um novo
        }

        const authors = {};
        commits.forEach(commit => {
            const author = commit.commit.author.name;
            authors[author] = authors[author] ? authors[author] + 1 : 1;
        });

        chartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(authors),
                datasets: [{
                    label: 'Commits por usuário',
                    data: Object.values(authors),
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    return (
        <React.Fragment>
            {isAvisoVisivel && (
                <Aviso
                    titulo="AVISO"
                    descricao="Nesta tela, o usuário consegue listar todos os commits do repositório vinculados a este projeto. Além disso, é possível filtrar os commits por usuário e data."
                    visible={isAvisoVisivel}
                    onClose={handleAvisoClose}
                />
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button
                        icon={<FaSearch />}
                        type="primary"
                        onClick={() => handleGetCommits(null)} // Para buscar todos os commits
                    >
                        Filtrar
                    </Button>
                    <Button
                        icon={<FaArrowRotateRight />}
                        onClick={handleResetar}
                        danger
                        ghost
                    >
                        Resetar
                    </Button>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button
                        icon={<BsQuestionCircle />}
                        onClick={handleDuvidaClick}
                    />
                </div>
            </div>

            <div className="global-div" style={{margin: '0', marginTop: '20px'}}>
                <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
                    <Button
                        type="primary"
                        ghost
                        onClick={() => handleGetCommits('24 hours ago')}
                    >
                        Dia
                    </Button>
                       
                    <Button
                        type="primary"
                        ghost
                        onClick={() => handleGetCommits('7 days ago')}
                    >
                        Semana
                    </Button>
                    
                    <Button 
                        type="primary"
                        ghost
                        onClick={() => handleGetCommits('1 month ago')}
                    > 
                        Mês
                    </Button>
                </div>
                <canvas ref={chartRef}></canvas>
            </div>
        </React.Fragment>
    );
};

export default GerenciarCommits;
