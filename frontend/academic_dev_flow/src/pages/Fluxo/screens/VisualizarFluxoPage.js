import React, { useEffect, useState, useCallback } from "react";
import { Select, message, Spin, Breadcrumb } from "antd";

import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    MarkerType,
    Position
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import Section from "../../../components/Section/Section";
import SectionContent from "../../../components/SectionContent/SectionContent";

import { listarFluxos } from "../../../services/fluxoService";

import {
    listarEtapasPorFluxo,
    listarTransicoesPorFluxo,
    atualizarFluxoEtapa,
    criarTransicao,
} from "../../../services/fluxoEtapaService";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import { HomeOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function VisualizarFluxoPage() {
    const [fluxos, setFluxos] = useState([]);
    const [fluxoId, setFluxoId] = useState(null);
    const [loading, setLoading] = useState(false);

    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    useEffect(() => {
        carregarFluxos();
    }, []);

    const carregarFluxos = async () => {
        try {
            const response = await listarFluxos();
            setFluxos(response.data || []);
        } catch (error) {
            message.error("Erro ao carregar fluxos");
        }
    };

    const carregarFluxoVisual = async (idFluxo) => {
        if (!idFluxo) return;

        setLoading(true);

        try {
            const [resEtapas, resTransicoes] = await Promise.all([
                listarEtapasPorFluxo(idFluxo),
                listarTransicoesPorFluxo(idFluxo),
            ]);

            

            const etapas = resEtapas.data || [];
            const transicoes = resTransicoes.data || [];

            const nodesFormatados = etapas.map((item, index) => ({
                id: String(item.id),
                position: {
                    x: item.posicao_x ?? 100,
                    y: item.posicao_y ?? index * 140,
                },
                sourcePosition: Position.Bottom,
                targetPosition: Position.Top,
                data: {
                    label:
                        item.nome_etapa ||
                        item.etapa?.nome ||
                        `Etapa ${item.id}`,
                },
                style: {
                    padding: 12,
                    borderRadius: 8,
                    border: "1px solid #1677ff",
                    background: "#ffffff",
                    minWidth: 180,
                    textAlign: "center",
                },
            }));
            
            const edgesFormatadas = transicoes.map((item) => ({
                id: String(item.id),
                source: String(item.origem),
                target: String(item.destino),
                label: item.label || "",
                type: "straight",
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                },
                style: {
                    strokeWidth: 2,
                },
            }));

            setNodes(nodesFormatados);
            setEdges(edgesFormatadas);

            console.log("TRANSIÇÕES DO BACKEND:", transicoes);
            console.log("EDGES FORMATADAS:", edgesFormatadas);



        } catch (error) {
            message.error("Erro ao carregar visualização do fluxo");
        } finally {
            setLoading(false);
        }
    };

    const handleSelecionarFluxo = (id) => {
        setFluxoId(id);
        setNodes([]);
        setEdges([]);
        carregarFluxoVisual(id);
    };

    const onNodesChange = useCallback((changes) => {
        setNodes((nodesSnapshot) =>
            applyNodeChanges(changes, nodesSnapshot)
        );
    }, []);

    const onEdgesChange = useCallback((changes) => {
        setEdges((edgesSnapshot) =>
            applyEdgeChanges(changes, edgesSnapshot)
        );
    }, []);

    const onConnect = useCallback(
        async (params) => {
            if (!fluxoId) {
                message.warning("Selecione um fluxo antes de criar transições");
                return;
            }

            try {
                const payload = {
                    fluxo: fluxoId,
                    origem: params.source,
                    destino: params.target,
                    label: "iniciar",
                };

                const response = await criarTransicao(payload);

                const novaEdge = {
                    id: String(response.data?.id || `${params.source}-${params.target}`),
                    source: String(params.source),
                    target: String(params.target),
                    label: response.data?.label || "iniciar",
                    type: "smoothstep",
                    animated: true,
                };

                setEdges((edgesSnapshot) =>
                    addEdge(novaEdge, edgesSnapshot)
                );

                message.success("Transição criada com sucesso!");
            } catch (error) {
                message.error("Erro ao criar transição");
            }
        },
        [fluxoId]
    );

    const onNodeDragStop = useCallback(async (_, node) => {
        try {
            await atualizarFluxoEtapa(node.id, {
                posicao_x: node.position.x,
                posicao_y: node.position.y,
            });
        } catch (error) {
            message.error("Erro ao salvar posição da etapa");
        }
    }, []);

    return (
        <Section>
            <SectionHeader>
                <Breadcrumb
                    items={[
                        {
                            href: `/academicflow/home`,
                            title: <HomeOutlined />,
                        },
                        {
                            href: `/academicflow/fluxos/transicoes`,
                            title: 'Visualizar Fluxo',
                        },
                    ]}
                />
            </SectionHeader>

            <SectionContent>
                
                <Select
                    placeholder="Selecione um fluxo"
                    style={{ width: 350, marginBottom: 16 }}
                    value={fluxoId}
                    onChange={handleSelecionarFluxo}
                    showSearch
                    optionFilterProp="children"
                >
                    {fluxos.map((fluxo) => (
                        <Option key={fluxo.id} value={fluxo.id}>
                            {fluxo.nome || fluxo.titulo || `Fluxo ${fluxo.id}`}
                        </Option>
                    ))}
                </Select>

                <div
                    style={{
                        width: "100%",
                        height: "70vh",
                        border: "1px solid #ddd",
                        borderRadius: 8,
                        background: "#f8f9fa",
                    }}
                >
                    {loading ? (
                        <div style={{ padding: 40, textAlign: "center" }}>
                            <Spin />
                        </div>
                    ) : (
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            onNodeDragStop={onNodeDragStop}
                            fitView
                        >
                            <Background />
                            <Controls />
                            <MiniMap />
                        </ReactFlow>
                    )}
                </div>
            </SectionContent>
        </Section>
    );
}