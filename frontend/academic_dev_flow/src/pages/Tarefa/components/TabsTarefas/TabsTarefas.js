import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { listarTarefasPorProjeto } from "../../../../services/tarefaService";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import TableTarefasSelect from "../TableTarefasSelect/TableTarefasSelect";
import { useContextoTarefa } from "../../context/ContextoTarefa";

const {TabPane} = Tabs

const TabsTarefas = ({onEdit}) => {
    const {dadosProjeto} = useContextoGlobalProjeto();
    const {tarefas, setTarefas} = useContextoTarefa()
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


    const handleGetTarefas = async () => {
        handleLimparTasks()
        const response = await listarTarefasPorProjeto(dadosProjeto.id);
        if (!response.error) {
            const tasks = response.data;

            setTarefas(tasks);
            setTasksCriadas(tasks.filter(task => task.status === 'criada'));
            setTasksEmAndamento(tasks.filter(task => task.status === 'andamento'));
            setTasksPendentesRevisao(tasks.filter(task => task.status === 'pendente de revisão'));
            setTasksConcluidas(tasks.filter(task => task.status === 'concluida'));
            setTasksAtrasadas(tasks.filter(task => task.status === 'atrasada'));
            setTasksCanceladas(tasks.filter(task => task.status === 'cancelada'));
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto !== null) {
                await handleGetTarefas();
            }

        };
        fetchData();
    }, []);

    return (
        <Tabs defaultActiveKey="1" tabPosition="left" style={{ marginTop: '50px' }}>
            <TabPane tab="Criadas" key="1">
                <TableTarefasSelect tasks={tasksCriadas} onEdit={onEdit} />
            </TabPane>
            <TabPane tab="Andamento" key="2">
                <TableTarefasSelect tasks={tasksEmAndamento} onEdit={onEdit}/>
            </TabPane>
            <TabPane tab="Revisão" key="3">
                <TableTarefasSelect tasks={tasksPendentesRevisao} onEdit={onEdit} />
            </TabPane>
            <TabPane tab="Concluídas" key="4">
                <TableTarefasSelect tasks={tasksConcluidas} onEdit={onEdit}/>
            </TabPane>
            <TabPane tab="Atrasadas" key="5">
                <TableTarefasSelect tasks={tasksAtrasadas} onEdit={onEdit} />
            </TabPane>
            <TabPane tab="Canceladas" key="6">
                <TableTarefasSelect tasks={tasksCanceladas} onEdit={onEdit}/>
            </TabPane>
            <TabPane tab="Todas" key="7">
                <TableTarefasSelect tasks={tarefas} onEdit={onEdit} />
            </TabPane>
        </Tabs>
    );
};

export default TabsTarefas;