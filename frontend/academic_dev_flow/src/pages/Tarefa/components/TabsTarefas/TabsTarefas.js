// TabsTarefas.js
import { Spin, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import TableTarefasSelect from "../TableTarefasSelect/TableTarefasSelect";
import { useContextoTarefa } from "../../context/ContextoTarefa";

const { TabPane } = Tabs;

const TabsTarefas = ({ onEdit }) => {
    
    const { dadosProjeto } = useContextoGlobalProjeto();
    const { 
        tarefas, 
        setTarefas, 
        reload,
        tasksCriadas,
        tasksEmAndamento,
        tasksPendentesRevisao,
        tasksConcluidas,
        tasksAtrasadas,
        tasksCanceladas,
        handleGetTarefas
    } = useContextoTarefa();

    useEffect(() => {
        const fetchData = async () => {
            await handleGetTarefas(dadosProjeto.id);
        };
        fetchData();
    }, [reload]);

    return (
        <Tabs defaultActiveKey="1" tabPosition="left" style={{ marginTop: '50px' }}>
            <TabPane tab="Criadas" key="1">
                <TableTarefasSelect tasks={tasksCriadas} onEdit={onEdit} />
            </TabPane>
            <TabPane tab="Em andamento" key="2">
                <TableTarefasSelect tasks={tasksEmAndamento} onEdit={onEdit} />
            </TabPane>
            <TabPane tab="Em revisão" key="3">
                <TableTarefasSelect tasks={tasksPendentesRevisao} onEdit={onEdit} />
            </TabPane>
            <TabPane tab="Concluídas" key="4">
                <TableTarefasSelect tasks={tasksConcluidas} onEdit={onEdit} />
            </TabPane>
            <TabPane tab="Atrasadas" key="5">
                <TableTarefasSelect tasks={tasksAtrasadas} onEdit={onEdit} />
            </TabPane>
            <TabPane tab="Todas" key="6">
                <TableTarefasSelect tasks={tarefas} onEdit={onEdit} />
            </TabPane>
        </Tabs>
    );
};

export default TabsTarefas;
