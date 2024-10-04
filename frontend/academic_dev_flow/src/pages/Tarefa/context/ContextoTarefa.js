import React, { createContext, useContext, useState } from "react";
import { listarTarefasPorProjeto } from "../../../services/tarefaService";
const ContextoTarefa = createContext();

export const useContextoTarefa = () => useContext(ContextoTarefa);

export const ProviderTarefa = ({ children }) => {

    const [step, setStep] = useState('0');
    const [tarefas, setTarefas] = useState([]);
    const [dadosTarefa, setDadosTarefa] = useState(null);
    const [tarefasSelecionadas, setTarefasSelecionadas] = useState([]);
    const [reload, setReload] = useState(false);
    const [acaoForm, setAcaoForm] = useState('criar')

    const [tasksCriadas, setTasksCriadas] = useState([]);
    const [tasksEmAndamento, setTasksEmAndamento] = useState([]);
    const [tasksPendentesRevisao, setTasksPendentesRevisao] = useState([]);
    const [tasksConcluidas, setTasksConcluidas] = useState([]);
    const [tasksAtrasadas, setTasksAtrasadas] = useState([]);
    const [tasksCanceladas, setTasksCanceladas] = useState([]);

    const handleLimparTasks = async () => {
        setTasksCriadas([]);
        setTasksEmAndamento([]);
        setTasksPendentesRevisao([]);
        setTasksConcluidas([]);
        setTasksAtrasadas([]);
        setTasksCanceladas([]);
        setTarefas([]);
    };

    const handleGetTarefas = async (idProjeto) => {
        await handleLimparTasks();
        const response = await listarTarefasPorProjeto(idProjeto);
        if (!response.error) {
            const tasks = response.data;

            setTarefas(tasks);
            setTasksCriadas(tasks.filter(task => task.status === 'criada'));
            setTasksEmAndamento(tasks.filter(task => task.status === 'andamento'));
            setTasksPendentesRevisao(tasks.filter(task => task.status === 'revisao'));
            setTasksConcluidas(tasks.filter(task => task.status === 'concluida'));
            setTasksAtrasadas(tasks.filter(task => task.status === 'atrasada'));
            setTasksCanceladas(tasks.filter(task => task.status === 'cancelada'));
        }
    };

    return (
        <ContextoTarefa.Provider
            value={{
                acaoForm, setAcaoForm,
                step, setStep,
                reload, setReload,
                tarefas, setTarefas,
                dadosTarefa, setDadosTarefa,
                tarefasSelecionadas, setTarefasSelecionadas,
                tasksCriadas, tasksEmAndamento, tasksPendentesRevisao,
                tasksConcluidas, tasksAtrasadas, tasksCanceladas,
                handleLimparTasks, handleGetTarefas
            }}
        >
            {children}
        </ContextoTarefa.Provider>
    );
};
