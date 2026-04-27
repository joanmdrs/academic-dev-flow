import "./Home.css";
import React, { useEffect, useState } from "react";
import { Empty, Splitter } from "antd";
import { useAuth } from "../../hooks/AuthProvider";
import { homeServiceAdapter } from "../../services/homeServiceAdapter";
import { atualizarStatusTarefa } from "../../services/tarefaService";
import { getDataHoraNow, handleError } from "../../services/utils";
import MinhasTarefas from "./components/MinhasTarefas";
import MeusArtefatos from "./components/MeusArtefatos";
import MeusProjetos from "./components/MeusProjetos";

const Home = () => {
    const { user } = useAuth();

    const [tarefas, setTarefas] = useState([]);
    const [artefatos, setArtefatos] = useState([]);
    const [projetos, setProjetos] = useState([]);

    const services = user ? homeServiceAdapter[user.role] : null;

    const callService = async (fn) => {
        try {
            return fn.length > 0 ? await fn(user.id) : await fn();
        } catch (error) {
            return { error: true };
        }
    };

    const handleGetTarefas = async () => {
        const response = await callService(services.tarefas);
        if (response?.error) {
            setTarefas([]);
            return;
        }

        if (Array.isArray(response.data)) {
            setTarefas(response.data);
        } else if (response.empty) {
            setTarefas([]);
        } else {
            setTarefas([]);
        }
    };

    const handleGetArtefatos = async () => {
        const response = await callService(services.artefatos);
        if (Array.isArray(response?.data)) {
            setArtefatos(response.data);
        } else {
            setArtefatos([]);
        }
    };

    const handleGetProjetos = async () => {
        const response = await callService(services.projetos);
        if (Array.isArray(response?.data)) {
            setProjetos(response.data);
        } else {
            setProjetos([]);
        }

    };

    useEffect(() => {
        if (!user || !services) return;
        console.log("Serviços disponíveis:", services);

        console.log("Dados do user:", user);
        const fetchData = async () => {
            await Promise.all([
                handleGetTarefas(),
                handleGetArtefatos(),
                handleGetProjetos()
            ]);
        };

        fetchData();
    }, [user]);

    const handleAlterarSituacaoTarefa = async (id, status) => {
        try {
            const response = await atualizarStatusTarefa(id, { status });

            if (!response.error) {
                await handleGetTarefas();
            }
        } catch (error) {
            handleError(error, "Falha ao atualizar o status da tarefa!");
        }
    };

    return (

        <div style={{ height: "100%", backgroundColor: "#FFFFFF" }}>

            <Splitter>
                <Splitter.Panel defaultSize="55%" min="20%" max="70%">
                    <div className="caixa-direita">
                        <div>
                            <h2 className="ff-pop">Hoje</h2>
                            <span className="ff-pop">{getDataHoraNow()}</span>
                        </div>

                        {tarefas.length > 0 ? (
                            <MinhasTarefas
                                tarefas={tarefas}
                                atualizarStatus={handleAlterarSituacaoTarefa}
                            />
                        ) : (
                            <Empty
                                description="Nenhuma tarefa para exibir"
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    height: "100%",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            />
                        )}

                        {artefatos.length > 0 ? (
                            <MeusArtefatos artefatos={artefatos} />
                        ) : (
                            <Empty
                                description="Nenhum artefato para exibir"
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    height: "100%",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            />
                        )}
                    </div>
                </Splitter.Panel>

                <Splitter.Panel>
                    <div className="caixa-esquerda">
                        {projetos.length ? (
                            <MeusProjetos projetos={projetos} />
                        ) : (
                            <Empty
                                description="Nenhum projeto para exibir"
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    height: "100%",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            />
                        )}
                    </div>
                </Splitter.Panel>
            </Splitter>
            
        </div>
    );
};

export default Home;