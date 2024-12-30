import { List, Progress, Tooltip } from "antd";
import React from "react";
import { MdCheckCircleOutline, MdOutlineCircle } from "react-icons/md";
import { useContextoGlobalUser } from "../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import { Link } from "react-router-dom";

const MinhasTarefas = ({ tarefas, atualizarStatus }) => {

    const tarefasConcluidas = tarefas.filter(tarefa => tarefa.status === 'concluida').length;
    const totalTarefas = tarefas.length;

    const porcentagemConcluida = totalTarefas > 0 ? ((tarefasConcluidas / totalTarefas) * 100).toFixed(0) : '';
    const {grupo} = useContextoGlobalUser()

    return (
        <div className="minhas-tarefas box-model">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}> 
                <h3 className="ff-pop">Minhas tarefas</h3>
                { grupo === 'Administradores' && <Link to={`/admin/tarefas`}> Visualize todos </Link> }
                { grupo === 'Discentes' && <Link to={`/aluno/tarefas`}> Visualize todos </Link> }
                { grupo === 'Docentes' && <Link to={`/professor/tarefas`}> Visualize todos </Link> }
            </div>

            <div> 
                <List
                    itemLayout="horizontal"
                    dataSource={tarefas.slice(0, 4)}
                    pagination={false}
                    renderItem={(item, index) => (
                        <List.Item
                            className="item-model ff-pop"
                            actions={[
                                <span style={{cursor: 'pointer'}}>
                                    {item.status === 'concluida' ? (
                                        <Tooltip title={"Reabrir"}>
                                            <MdCheckCircleOutline
                                                onClick={() => atualizarStatus(item.id, "andamento")}
                                                size="20px"
                                            />
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title={"Concluir"}>
                                            <MdOutlineCircle
                                                onClick={() => atualizarStatus(item.id, "concluida")}
                                                size="20px"
                                            />
                                        </Tooltip>
                                    )}
                                </span>,
                            ]}
                        >
                            <List.Item.Meta
                                avatar={[
                                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: "#BDBDBD" }}>
                                        {String(index + 1).padStart(2, '0')}
                                    </div>]
                                }
                                title={<span className="ff-pop fw-500"> {item.nome} </span>}

                            />
                        </List.Item>
                    )}
                />
            </div>

            <div>
                <Progress 
                    percentPosition={{
                        align: 'center',
                        type: 'inner',
                    }} 
                    strokeColor={{
                        from: '#108ee9',
                        to: '#87d068',
                    }}
                    size={['', 20]}
                    percent={porcentagemConcluida} 
                    status="active"   
                />
            </div>
        </div>
    );
}

export default MinhasTarefas;
