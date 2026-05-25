import React from "react";
import RenderDate from "../../../../components/RenderDate/RenderDate";
import RenderMembers from "../../../../components/RenderMembers/RenderMembers";
import { FaGithub, FaLink } from "react-icons/fa";
import { Space, Tooltip, Typography, Divider, Button } from "antd";

const { Text, Paragraph } = Typography;

const ListContent = ({ item }) => {
    const linkRepo = item.dados_projeto?.link_repo;
    const linkSite = item.dados_projeto?.link_site;

    return (
        <div style={{ paddingTop: 16 }}>
            <Paragraph
                type="secondary"
                style={{
                    marginBottom: 16,
                    lineHeight: 1.6,
                }}
            >
                {item.descricao_projeto || "Descrição não informada."}
            </Paragraph>

            <Space size={[24, 12]} wrap>
                <Text>
                    <strong>Fluxo:</strong> {item.nome_fluxo || "Não informado"}
                </Text>

                <Text>
                    <strong>Início:</strong>{" "}
                    <RenderDate
                        dateType="inicio"
                        dateValue={item.data_inicio_projeto}
                    />
                </Text>

                <Text>
                    <strong>Término:</strong>{" "}
                    <RenderDate
                        dateType="fim"
                        dateValue={item.data_termino_projeto}
                    />
                </Text>
            </Space>

            <Divider style={{ margin: "14px 0" }} />

            <Space
                align="center"
                size={16}
                wrap
                style={{ width: "100%", justifyContent: "space-between" }}
            >
                <Space align="center">
                    <Text strong>Equipe:</Text>

                    <RenderMembers
                        membros={item.equipe || []}
                        maxAvatars={3}
                        quantMembros={item.quantidade_membros || 0}
                    />
                </Space>

                <Space>
                    <Tooltip title={linkRepo ? "Abrir repositório" : "Repositório não informado"}>
                        <Button
                            shape="circle"
                            icon={<FaGithub />}
                            disabled={!linkRepo}
                            href={linkRepo}
                            target="_blank"
                        />
                    </Tooltip>

                    <Tooltip title={linkSite ? "Abrir aplicação" : "Aplicação não informada"}>
                        <Button
                            shape="circle"
                            icon={<FaLink />}
                            disabled={!linkSite}
                            href={linkSite}
                            target="_blank"
                        />
                    </Tooltip>
                </Space>
            </Space>
        </div>
    );
};

export default ListContent;