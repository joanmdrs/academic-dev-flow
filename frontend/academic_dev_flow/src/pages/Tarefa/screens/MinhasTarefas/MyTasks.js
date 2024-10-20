import { Button, Space, Tabs } from "antd";
import Item from "antd/es/list/Item";
import React from "react";
import { FaFilter, FaPlus } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import BoardTask from "../../components/TaskBoard/TaskBoard";
import TableTask from "../../components/TableTask/TableTask";
import CalendarTask from "../../components/CalendarTask/CalendarTask";
import TaskBoard from "../../components/TaskBoard/TaskBoard";

const MyTasks = () => {

    return (
        <div className="bloco-principal"> 
            <div style={{
                borderBottom: '1px solid #ddd',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                padding: '20px'
            }}> 
                <Space>
                    <h3> MINHAS TAREFAS </h3>
                </Space>

                <Space>
                    <Button type="primary" ghost icon={<FaPlus />}> Criar Tarefa </Button>
                    <IoNotificationsOutline size="20px" />
                </Space>

            </div>

            <div style={{
                backgroundColor: '#FFFFFF',
                padding: '20px',
                height: '100%'
            }}>
                    <Tabs
                        tabBarExtraContent={
                            <div>
                                <Button icon={<FaFilter />}> Filtrar </Button>
                            </div>
                        }
                        size="middle"
                        indicator={{align: "center"}}
                        style={{
                        }}
                    > 
                        <Item tab="Quadro" key="1" >
                            <TaskBoard />
                        </Item>
                        <Item tab="Tabela" key="2" >
                            <TableTask tasks={[]} />
                        </Item>
                        <Item tab="Calendário" key="3" >
                            <CalendarTask />
                        </Item>
                    </Tabs>
            </div>

            
        </div>
    )
}

export default MyTasks