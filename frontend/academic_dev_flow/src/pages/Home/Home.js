import "./Home.css";
import React, { useEffect, useState, useCallback } from "react";
import { Empty, Splitter, message } from "antd";
import { useAuth } from "../../hooks/AuthProvider";
import { homeServiceAdapter } from "../../services/homeServiceAdapter";
import { atualizarStatusTarefa } from "../../services/tarefaService";
import { getDataHoraNow, handleError } from "../../services/utils";
import { buscarMembroPeloUser } from "../../services/membroService";

import MinhasTarefas from "./components/MinhasTarefas";
import MeusArtefatos from "./components/MeusArtefatos";
import MeusProjetos from "./components/MeusProjetos";

const Home = () => {
    const { user } = useAuth();

    const [membro, setMembro] = useState(null);
    const [tarefas, setTarefas] = useState([]);
    const [artefatos, setArtefatos] = useState([]);
    const [projetos, setProjetos] = useState([]);

    const services = user ? homeServiceAdapter[user.role] : null;

    const callService = async (fn, idMembro) => {
        if (!fn) return { error: true };

        try {
            return fn.length > 0 ? await fn(idMembro) : await fn();
        } catch {
            return { error: true };
        }
    };

    const handleGetTarefas = useCallback(async (idMembro) => {
        const response = await callService(services?.tarefas, idMembro);
        setTarefas(Array.isArray(response?.data) ? response.data : []);
    }, [services]);

    const handleGetArtefatos = useCallback(async (idMembro) => {
        const response = await callService(services?.artefatos, idMembro);
        setArtefatos(Array.isArray(response?.data) ? response.data : []);
    }, [services]);

    const handleGetProjetos = useCallback(async (idMembro) => {
        const response = await callService(services?.projetos, idMembro);
        setProjetos(Array.isArray(response?.data) ? response.data : []);
    }, [services]);

    useEffect(() => {
        const fetchData = async () => {
            if (!user?.id || !services) return;

            try {
                const responseMembro = await buscarMembroPeloUser(user.id);

                if (!responseMembro.error && responseMembro.data) {
                    const membroEncontrado = responseMembro.data;
                    setMembro(membroEncontrado);

                    await Promise.all([
                        handleGetTarefas(membroEncontrado.id),
                        handleGetArtefatos(membroEncontrado.id),
                        handleGetProjetos(membroEncontrado.id),
                    ]);
                } else {
                    setMembro(null);
                    setTarefas([]);
                    setArtefatos([]);
                    setProjetos([]);
                    message.warning("Nenhum membro vinculado ao usuário foi encontrado.");
                }
            } catch {
                message.error("Falha ao carregar dados da página inicial.");
            }
        };

        fetchData();
    }, [user?.id, services, handleGetTarefas, handleGetArtefatos, handleGetProjetos]);

    const handleAlterarSituacaoTarefa = async (id, status) => {
        try {
            const response = await atualizarStatusTarefa(id, { status });

            if (!response.error && membro?.id) {
                await handleGetTarefas(membro.id);
            }
        } catch (error) {
            handleError(error, "Falha ao atualizar o status da tarefa!");
        }
    };

    return (
        <div style={{ height: "100%", backgroundColor: "#FFFFFF" }}>
            <Splitter>
                <Splitter.Panel defaultSize="50%" min="20%" max="70%">
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
                            <Empty description="Nenhuma tarefa para exibir" />
                        )}

                        {artefatos.length > 0 ? (
                            <MeusArtefatos artefatos={artefatos} />
                        ) : (
                            <Empty description="Nenhum artefato para exibir" />
                        )}
                    </div>
                </Splitter.Panel>

                <Splitter.Panel>
                    <div className="caixa-esquerda">
                        {projetos.length > 0 ? (
                            <MeusProjetos projetos={projetos} />
                        ) : (
                            <Empty description="Nenhum projeto para exibir" />
                        )}
                    </div>
                </Splitter.Panel>
            </Splitter>
        </div>
    );
};

export default Home;