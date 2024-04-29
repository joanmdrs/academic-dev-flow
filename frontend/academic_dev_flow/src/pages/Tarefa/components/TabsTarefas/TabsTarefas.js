import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { listarTarefasPorProjeto } from "../../../../services/tarefaService";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import TableTarefasSelect from "../TableTarefasSelect/TableTarefasSelect";

const {TabPane} = Tabs

const TabsTarefas = () => {

    const {dadosProjeto} = useContextoGlobalProjeto()
    const [allTasks, setAllTasks] = useState([])

    const handleGetTarefas = async () => {

        const response = await listarTarefasPorProjeto(dadosProjeto.id)
        if (!response.error) {
            setAllTasks(response.data)
        }
  
    }


    return (
        <Tabs
            defaultActiveKey="1"
            tabPosition="left"
            style={{marginTop: '50px'}}
            
            >
            <TabPane tab='Criadas' key="1">
                <TableTarefasSelect />
            </TabPane>

            <TabPane tab='Em andamento' key="2"> 
                <TableTarefasSelect />
            </TabPane>

            <TabPane tab='Pendente de Revisão' key="3">
                <TableTarefasSelect />
            </TabPane>

            <TabPane tab='Concluídas' key="4">
                <TableTarefasSelect />
            </TabPane>

            <TabPane tab='Atrasadas' key="5">
                <TableTarefasSelect />
            </TabPane>

            <TabPane tab='Canceladas' key="6">
                <TableTarefasSelect />
            </TabPane>

            <TabPane tab='Todas' key="7">
                <TableTarefasSelect />
            </TabPane>
        </Tabs>
    )
}

export default TabsTarefas