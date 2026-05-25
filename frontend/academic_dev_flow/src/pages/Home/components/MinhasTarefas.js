import { List, Progress, Tooltip, Button, Tag, Typography, Space } from "antd";
import React from "react";
import { MdCheckCircleOutline, MdOutlineCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { LuListTodo } from "react-icons/lu";

const { Text } = Typography;

const MinhasTarefas = ({ tarefas = [], atualizarStatus }) => {
    const tarefasConcluidas = tarefas.filter(
        tarefa => tarefa.status === "concluida"
    ).length;

    const totalTarefas = tarefas.length;

    const porcentagemConcluida = totalTarefas > 0
        ? Number(((tarefasConcluidas / totalTarefas) * 100).toFixed(0))
        : 0;

    return (
        <div className="home-card">
            <div className="home-card-header">
                <div className="home-card-title-area">
                    <div className="home-card-icon">
                        <LuListTodo />
                    </div>

                    <div>
                        <h3 className="home-card-title">Minhas tarefas</h3>
                        <Text type="secondary">
                            {tarefasConcluidas} de {totalTarefas} concluídas
                        </Text>
                    </div>
                </div>

                <Link className="home-card-link" to="/tarefas">
                    Ver todas
                </Link>
            </div>

            <List
                itemLayout="horizontal"
                dataSource={tarefas.slice(0, 4)}
                pagination={false}
                renderItem={(item, index) => {
                    const isConcluida = item.status === "concluida";

                    return (
                        <List.Item className="home-list-item">
                            <List.Item.Meta
                                avatar={
                                    <div className="home-list-index">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>
                                }
                                title={
                                    <Space direction="vertical" size={2}>
                                        <span
                                            className={
                                                isConcluida
                                                    ? "home-item-title done"
                                                    : "home-item-title"
                                            }
                                        >
                                            {item.nome}
                                        </span>

                                        <Tag
                                            color={isConcluida ? "success" : "processing"}
                                            style={{ width: "fit-content" }}
                                        >
                                            {isConcluida ? "Concluída" : "Em andamento"}
                                        </Tag>
                                    </Space>
                                }
                            />

                            <Tooltip title={isConcluida ? "Reabrir tarefa" : "Concluir tarefa"}>
                                <Button
                                    type="text"
                                    shape="circle"
                                    className={isConcluida ? "home-action-success" : ""}
                                    icon={
                                        isConcluida ? (
                                            <MdCheckCircleOutline size={22} />
                                        ) : (
                                            <MdOutlineCircle size={22} />
                                        )
                                    }
                                    onClick={() =>
                                        atualizarStatus(
                                            item.id,
                                            isConcluida ? "andamento" : "concluida"
                                        )
                                    }
                                />
                            </Tooltip>
                        </List.Item>
                    );
                }}
            />

            <div className="home-progress-area">
                <Progress
                    percent={porcentagemConcluida}
                    strokeColor={{
                        from: "#1677ff",
                        to: "#52c41a",
                    }}
                    size={["100%", 14]}
                    status="active"
                />
            </div>
        </div>
    );
};

export default MinhasTarefas;