import { Empty, Flex } from "antd";
import React from "react";
import ColumnTaskBoard from "./ColumnTaskBoard/ColumnTaskBoard";

const TaskBoard = ({ tarefas, onCreate, onUpdate, onDelete, onStartTarefa, onPauseTarefa }) => {
    // Filtra as tarefas com base no status
    const tarefasToDo = tarefas.filter(tarefa => tarefa.status === 'criada');
    const tarefasDoing = tarefas.filter(tarefa => tarefa.status === 'andamento');
    const tarefasDone = tarefas.filter(tarefa => tarefa.status === 'concluida');

    return (
        <React.Fragment>
            {
                tarefas.length > 0 ? (
                    <Flex gap="large" align="flex-start">
                        {/* Coluna de To-Do */}
                        <ColumnTaskBoard 
                            tarefas={tarefasToDo} 
                            title={'To Do'} 
                            onCreate={onCreate}
                            onUpdate={onUpdate} 
                            onDelete={onDelete} 
                            onPauseTarefa={onPauseTarefa}
                            onStartTarefa={onStartTarefa}
                            
                        />

                        {/* Coluna de Doing */}
                        <ColumnTaskBoard 
                            tarefas={tarefasDoing} 
                            title={'In Progress'} 
                            onCreate={onCreate} 
                            onUpdate={onUpdate} 
                            onDelete={onDelete} 
                            onPauseTarefa={onPauseTarefa}
                            onStartTarefa={onStartTarefa}
                        />

                        {/* Coluna de Done */}
                        <ColumnTaskBoard 
                            tarefas={tarefasDone} 
                            title={'Done'}  
                            onCreate={onCreate}
                            onUpdate={onUpdate} 
                            onDelete={onDelete} 
                            onPauseTarefa={onPauseTarefa}
                            onStartTarefa={onStartTarefa}
                        />
                    </Flex>
                ) : (
                    <Empty
                        description="Nenhuma tarefa para exibir"
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        style={{
                            display: 'flex',
                            width: "100%",
                            height: "100%",
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    />
                )
            }
        </React.Fragment>
    );
}

export default TaskBoard;
