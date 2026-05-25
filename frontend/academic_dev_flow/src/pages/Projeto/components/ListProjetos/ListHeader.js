import React from "react";
import { limitarCaracteres } from "../../../../services/utils";
import RenderStatus from "../../../../components/RenderStatus/RenderStatus";
import { optionsStatusProjetos } from "../../../../services/optionsStatus";
import { Flex, Space, Typography, Tag } from "antd";

const { Title, Text } = Typography;

const ListHeader = ({ item }) => {
    return (
        <Flex
            align="flex-start"
            justify="space-between"
            gap={16}
            wrap="wrap"
        >
            <div>
                <Title
                    level={4}
                    style={{
                        margin: 0,
                        textTransform: "capitalize",
                        lineHeight: 1.3,
                    }}
                >
                    {limitarCaracteres(item.nome_projeto || "Projeto sem nome", 100)}
                </Title>

                <Space size={8} wrap style={{ marginTop: 8 }}>
                    <Tag color="blue">#{item.projeto}</Tag>

                    <Text type="secondary">
                        Coordenador: {item.nome_coordenador || "Não definido"}
                    </Text>
                </Space>
            </div>

            <RenderStatus
                optionsStatus={optionsStatusProjetos}
                propStatus={item.status_projeto}
            />
        </Flex>
    );
};

export default ListHeader;