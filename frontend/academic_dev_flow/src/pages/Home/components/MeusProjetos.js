import { List, Tooltip, Button, Typography, Tag } from "antd";
import React from "react";
import { CiFolderOn } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { LuFolderKanban } from "react-icons/lu";

const { Text } = Typography;

const MeusProjetos = ({ projetos = [] }) => {
    return (
        <div className="home-card">
            <div className="home-card-header">
                <div className="home-card-title-area">
                    <div className="home-card-icon">
                        <LuFolderKanban />
                    </div>

                    <div>
                        <h3 className="home-card-title">Projetos</h3>
                        <Text type="secondary">
                            {projetos.length} projeto(s) vinculado(s)
                        </Text>
                    </div>
                </div>

                <Link className="home-card-link" to="/projetos">
                    Ver todos
                </Link>
            </div>

            <List
                itemLayout="horizontal"
                dataSource={projetos.slice(0, 4)}
                pagination={false}
                renderItem={(item) => (
                    <List.Item className="home-list-item">
                        <List.Item.Meta
                            avatar={
                                <div className="home-project-avatar">
                                    <CiFolderOn size={22} />
                                </div>
                            }
                            title={
                                <span className="home-item-title">
                                    {item.nome_projeto || item.nome || "Projeto sem nome"}
                                </span>
                            }
                            description={
                                <Tag color="blue">
                                    {item.status_projeto || item.status || "Sem status"}
                                </Tag>
                            }
                        />

                        <Tooltip title="Visualizar projeto">
                            <Button
                                type="text"
                                shape="circle"
                                icon={<IoIosArrowForward />}
                            />
                        </Tooltip>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default MeusProjetos;