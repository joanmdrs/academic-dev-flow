import { List, Tooltip, Button, Typography, Tag } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { LuFileText } from "react-icons/lu";
import { FaExternalLinkAlt } from "react-icons/fa";

const { Text } = Typography;

const MeusArtefatos = ({ artefatos = [] }) => {
    return (
        <div className="home-card">
            <div className="home-card-header">
                <div className="home-card-title-area">
                    <div className="home-card-icon">
                        <LuFileText />
                    </div>

                    <div>
                        <h3 className="home-card-title">Meus artefatos</h3>
                        <Text type="secondary">
                            {artefatos.length} artefato(s) disponível(is)
                        </Text>
                    </div>
                </div>

                <Link className="home-card-link" to="/artefatos">
                    Ver todos
                </Link>
            </div>

            <List
                itemLayout="horizontal"
                dataSource={artefatos.slice(0, 4)}
                pagination={false}
                renderItem={(item, index) => (
                    <List.Item className="home-list-item">
                        <List.Item.Meta
                            avatar={
                                <div className="home-list-index">
                                    {String(index + 1).padStart(2, "0")}
                                </div>
                            }
                            title={
                                <span className="home-item-title">
                                    {item.nome || "Artefato sem nome"}
                                </span>
                            }
                            description={
                                <Tag color="purple">
                                    {item.status || "Sem status"}
                                </Tag>
                            }
                        />

                        {item.url && (
                            <Tooltip title="Abrir documento">
                                <Button
                                    type="text"
                                    shape="circle"
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    icon={<FaExternalLinkAlt />}
                                />
                            </Tooltip>
                        )}
                    </List.Item>
                )}
            />
        </div>
    );
};

export default MeusArtefatos;