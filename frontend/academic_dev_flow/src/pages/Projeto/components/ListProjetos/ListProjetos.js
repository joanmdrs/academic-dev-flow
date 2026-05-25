import React from "react";
import { Empty, List, Skeleton, Dropdown, Button } from "antd";
import { optionsStatusProjetos } from "../../../../services/optionsStatus";
import { FaEllipsisH } from "react-icons/fa";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import ListContent from "./ListContent";
import ListHeader from "./ListHeader";

const ActionDropdown = ({ item, onUpdate, onDelete }) => {
    const items = [
        {
            key: "edit",
            label: "Editar",
            icon: <IoMdCreate size={16} />,
            onClick: () => onUpdate(item),
        },
        {
            key: "delete",
            label: "Excluir",
            icon: <IoMdTrash size={16} />,
            danger: true,
            onClick: () => onDelete(item.projeto),
        },
    ];

    return (
        <Dropdown menu={{ items }} placement="bottomRight" trigger={["click"]}>
            <Button
                type="text"
                shape="circle"
                icon={<FaEllipsisH />}
                onClick={(e) => e.stopPropagation()}
            />
        </Dropdown>
    );
};

const ListProjetos = ({ data = [], onUpdate, onDelete }) => {
    if (!data.length) {
        return (
            <Empty
                description="Nenhum projeto para exibir"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                style={{
                    padding: 48,
                    background: "#fff",
                    borderRadius: 12,
                    border: "1px dashed #d9d9d9",
                }}
            />
        );
    }

    return (
        <List
            itemLayout="vertical"
            dataSource={data}
            renderItem={(item) => {
                const statusOption = optionsStatusProjetos.find(
                    option => option.value === item.status_projeto
                );

                const statusColor = statusOption?.color || "#d9d9d9";

                return (
                    <List.Item
                        style={{
                            padding: 0,
                            marginBottom: 16,
                            border: "none",
                        }}
                    >
                        <div
                            style={{
                                background: "#fff",
                                borderRadius: 14,
                                border: "1px solid #f0f0f0",
                                borderLeft: `5px solid ${statusColor}`,
                                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                                overflow: "hidden",
                            }}
                        >
                            <Skeleton loading={item.loading} active>
                                <div
                                    style={{
                                        padding: "18px 20px",
                                        display: "flex",
                                        alignItems: "flex-start",
                                        justifyContent: "space-between",
                                        gap: 16,
                                    }}
                                >
                                    <div style={{ flex: 1 }}>
                                        <ListHeader item={item} />
                                    </div>

                                    <ActionDropdown
                                        item={item}
                                        onDelete={onDelete}
                                        onUpdate={onUpdate}
                                    />
                                </div>

                                <div
                                    style={{
                                        padding: "0 20px 20px",
                                        borderTop: "1px solid #f5f5f5",
                                    }}
                                >
                                    <ListContent item={item} />
                                </div>
                            </Skeleton>
                        </div>
                    </List.Item>
                );
            }}
        />
    );
};

export default ListProjetos;