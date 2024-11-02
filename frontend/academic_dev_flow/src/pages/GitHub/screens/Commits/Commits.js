import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import { handleError } from "../../../../services/utils";
import { Button, Result } from "antd";
import SpinLoading from "../../../../components/SpinLoading/SpinLoading";
import FormBuscarCommits from "../../components/FormBuscarCommits/FormBuscarCommits";
import GraficoBarrasCommits from "../../../Graficos/GraficoBarrasCommits/GraficoBarrasCommits";
import { useContextoCommits } from "../../context/ContextoCommits";
import { FaArrowRotateRight } from "react-icons/fa6";

const Commits = () => {
    const { dadosProjeto, setDadosProjeto } = useContextoGlobalProjeto();
    const location = useLocation();
    const { state } = location;
    const { commits, setCommits, loading} = useContextoCommits()

    const handleBuscarProjeto = async () => {
        const response = await buscarProjetoPeloId(state.idProjeto);
        if (!response.error) {
            setDadosProjeto(response.data);
        }
    };

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (state.idProjeto) {
                    await handleBuscarProjeto();
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
                        {dadosProjeto?.nome} | Commits
                    </h4>
                </div>
            </div>

            { (!state?.repoGithub || !state?.tokenGithub) && (
                <div style={{padding: '20px'}}>
                    <Result
                        status="info"
                        title="Este projeto não possui credenciais de acesso a um repositório do GitHub."
                        subTitle="Para realizar a conexão com o GitHub, adicione as informações de acesso ao repositório no menu de Projetos."
                    />
                </div>
            )}

            { state?.repoGithub && state?.tokenGithub && (
                <React.Fragment>
                    <div style={{
                        borderBottom: '1px solid #ddd',
                        padding: '20px',
                        display: 'flex',
                        justifyContent: 'space-between'

                    }}> 
                        <FormBuscarCommits />

                        <Button type="primary" ghost icon={<FaArrowRotateRight />} onClick={() => setCommits([])}> Resetar </Button>
                    </div>

                    <div style={{marginTop: '40px'}}>

                        { loading ? (
                            <SpinLoading />
                        ) : (
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
                                <GraficoBarrasCommits data={commits} />
                            </div>
                        )}
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

export default Commits;
