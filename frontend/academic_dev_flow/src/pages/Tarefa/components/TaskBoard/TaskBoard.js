import { Empty, Flex } from "antd";
import './TaskBoard.css'
import React, { useEffect, useState } from "react";
import ColumnTaskBoard from "./ColumnTaskBoard/ColumnTaskBoard";
import { useContextoTarefa } from "../../context/ContextoTarefa";

const TaskBoard = ({ 
        onCreate, 
        onUpdate, 
        onDelete, 
        onStartTarefa, 
        onPauseTarefa,
        onShowComments
}) => {
    const {tarefas} = useContextoTarefa()
    const [tarefasToDo, setTarefasToDo] = useState([])
    const [tarefasDone, setTarefasDone] = useState([])
    const [tarefasDoing, setTarefasDoing] = useState([])
    const [tarefasBlock, setTarefasBlock] = useState([])

    useEffect(() => {
        const fetchData = () => {
            if (tarefas.length !== 0){
                setTarefasToDo(tarefas.filter(tarefa => tarefa.status === 'pendente'))
                setTarefasDoing(tarefas.filter(tarefa => tarefa.status === 'andamento'))
                setTarefasDone(tarefas.filter(tarefa => tarefa.status === 'concluida'))
                setTarefasBlock(tarefas.filter(tarefa => tarefa.status === 'bloqueada'))
            }
        }
        fetchData()
    }, [tarefas])

    return (
        <React.Fragment>
            {tarefas.length > 0 ? (
                <div className="taskboard-container">
                    <Flex gap="large" align="flex-start">
                        {/* Coluna de To-Do */}
                      
                        <ColumnTaskBoard 
                            tarefas={tarefasToDo} 
                            title={'Para fazer'} 
                            onCreate={onCreate}
                            onUpdate={onUpdate} 
                            onDelete={onDelete} 
                            onPauseTarefa={onPauseTarefa}
                            onStartTarefa={onStartTarefa}
                            onShowComments={onShowComments}
                        />

                        {/* Coluna de Doing */}
                        <ColumnTaskBoard 
                            tarefas={tarefasDoing} 
                            title={'Em andamento'} 
                            onCreate={onCreate} 
                            onUpdate={onUpdate} 
                            onDelete={onDelete} 
                            onPauseTarefa={onPauseTarefa}
                            onStartTarefa={onStartTarefa}
                            onShowComments={onShowComments}
                        />

                        {/* Coluna de Done */}
                        <ColumnTaskBoard 
                            tarefas={tarefasDone} 
                            title={'Feito'}  
                            onCreate={onCreate}
                            onUpdate={onUpdate} 
                            onDelete={onDelete} 
                            onPauseTarefa={onPauseTarefa}
                            onStartTarefa={onStartTarefa}
                            onShowComments={onShowComments}
                        />

                        <ColumnTaskBoard 
                            tarefas={tarefasBlock} 
                            title={'Em bloqueio'}  
                            onCreate={onCreate}
                            onUpdate={onUpdate} 
                            onDelete={onDelete} 
                            onPauseTarefa={onPauseTarefa}
                            onStartTarefa={onStartTarefa}
                            onShowComments={onShowComments}
                        />
                    </Flex>
                </div>
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
            )}
        </React.Fragment>
    );
}

export default TaskBoard;
