import { Tabs } from "antd";
import React from "react";

const {TabPane} = Tabs
const QuadroTarefas = () => {

    return (
        <React.Fragment>
            <Tabs
                tabPosition="left" >
                <TabPane tab='Criadas' key="1">
                    Tarefas criadas 
                </TabPane>

                <TabPane tab='Em andamento' key="2"> 
                    Tarefas em andamento
                </TabPane>

                <TabPane tab='Pendente de Revisão' key="3">
                    Tarefas em revisão
                </TabPane>

                <TabPane tab='Concluídas' key="4">
                    Tarefas concluídas
                </TabPane>

                <TabPane tab='Atrasadas' key="5">
                    Tarefas atrasadas
                </TabPane>

                <TabPane tab='Canceladas' key="6">
                    Tarefas bloqueadas
                </TabPane>

            </Tabs>
        </React.Fragment>
    )
}   

export default QuadroTarefas