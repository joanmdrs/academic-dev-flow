import { Button, Table, Tooltip, Typography, Tag } from "antd";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { LuFolderKanban } from "react-icons/lu";

import RenderMembers from "../../../../components/RenderMembers/RenderMembers";
import RenderEmpty from "../../../../components/Empty/Empty";
import { limitarCaracteres } from "../../../../services/utils";

const { Text } = Typography;

const TableProjetoEquipe = ({ data = [], onOpen }) => {
    const columnsTable = [
        {
            title: "Projeto",
            dataIndex: "nome_projeto",
            key: "nome_projeto",
            render: (_, record) => (
                <div
                    onClick={() => onOpen(record)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        cursor: "pointer",
                    }}
                >
                    <div
                        style={{
                            width: 38,
                            height: 38,
                            borderRadius: 12,
                            background: "#f0f5ff",
                            color: "#1677ff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 20,
                        }}
                    >
                        <LuFolderKanban />
                    </div>

                    <div>
                        <Text strong style={{ fontSize: 15 }}>
                            {limitarCaracteres(record.nome_projeto || "Projeto sem nome", 100)}
                        </Text>

                        <div>
                            <Tag color="blue">
                                {record.quantidade_membros || 0} membro(s)
                            </Tag>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "Equipe",
            dataIndex: "nomes_membros",
            key: "nomes_membros",
            render: (_, record) => (
                <RenderMembers
                    membros={record.equipe || []}
                    quantMembros={record.quantidade_membros || 0}
                    maxAvatars={3}
                />
            ),
        },
        {
            title: "Ações",
            key: "actions",
            align: "right",
            render: (_, record) => (
                <Tooltip title="Abrir projeto">
                    <Button
                        type="text"
                        shape="circle"
                        icon={<IoIosArrowForward />}
                        onClick={() => onOpen(record)}
                    />
                </Tooltip>
            ),
        },
    ];

    if (!data.length) {
        return <RenderEmpty title="Você não está vinculado a nenhum projeto" />;
    }

    return (
        <Table
            dataSource={data}
            columns={columnsTable}
            rowKey="id"
            pagination={{ pageSize: 6 }}
            bordered={false}
            style={{
                background: "#fff",
                borderRadius: 14,
                overflow: "hidden",
            }}
        />
    );
};

export default TableProjetoEquipe;