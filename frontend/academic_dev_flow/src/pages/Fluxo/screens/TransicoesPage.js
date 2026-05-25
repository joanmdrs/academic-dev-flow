import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Select, Space, Popconfirm, message, Breadcrumb, Tooltip } from "antd";
import {
    atualizarTransicao,
    criarTransicao,
    excluirTransicao,
    listarEtapasPorFluxo,
    listarTransicoes,
    listarTransicoesPorFluxo
} from "../../../services/fluxoEtapaService";

import { listarFluxos } from "../../../services/fluxoService";

import Section from "../../../components/Section/Section";
import SectionContent from "../../../components/SectionContent/SectionContent";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import { HomeOutlined } from "@ant-design/icons";
import { IoMdCreate, IoMdTrash } from "react-icons/io";

const { Option } = Select;

export const LABEL_OPTIONS = [
    { value: "iniciar", label: "Iniciar" },
    { value: "desenvolver", label: "Desenvolver" },
    { value: "revisar", label: "Revisar" },
    { value: "validar", label: "Validar" },
    { value: "planejar", label: "Planejar" },

    { value: "testar", label: "Testar" },
    { value: "corrigir", label: "Corrigir" },

    { value: "aprovar", label: "Aprovar" },
    { value: "reprovar", label: "Reprovar" },

    { value: "concluir", label: "Concluir" },
    { value: "finalizar", label: "Finalizar" },

    { value: "publicar", label: "Publicar" },
    { value: "implantar", label: "Implantar" },

    { value: "retornar", label: "Retornar" },
    { value: "reabrir", label: "Reabrir" },

    { value: "bloquear", label: "Bloquear" },
    { value: "desbloquear", label: "Desbloquear" },

    {value: "revisar", label: "Revisar"},
    {value: "melhorar", label: "Melhorar"},
    {value: "avaliar", label: "Avaliar"},
    {value: "atualizar", label: "Atualizar"},
];

export default function TransicoesPage() {
    const [fluxos, setFluxos] = useState([]);
    const [transicoes, setTransicoes] = useState([]);
    const [etapas, setEtapas] = useState([]);
    const [loading, setLoading] = useState(false);

    const [fluxoId, setFluxoId] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);

    const [form] = Form.useForm();

    useEffect(() => {
        carregarFluxos();
        
    }, []);

    const carregarFluxos = async () => {

        try {
            const response = await listarFluxos();
            setFluxos(response.data);
        } catch (error) {
            message.error("Erro ao carregar fluxos");
        }
    };

    const carregarDados = async (id) => {
        if (!id) return;

        setLoading(true);

        try {
            const [resTransicoes, resEtapas] = await Promise.all([
                listarTransicoesPorFluxo(id),
                listarEtapasPorFluxo(id),
            ]);

            setTransicoes(resTransicoes.data || []);
            setEtapas(resEtapas.data || []);
        } catch (error) {
            message.error("Erro ao carregar dados do fluxo");
        } finally {
            setLoading(false);
        }
    };

    const handleSelecionarFluxo = (id) => {
        setFluxoId(id);
        setTransicoes([]);
        setEtapas([]);
        carregarDados(id);
    };

    const openModal = (record = null) => {
        setEditing(record);
        setIsModalOpen(true);

        if (record) {
            form.setFieldsValue({
                origem: record.origem,
                destino: record.destino,
                label: record.label,
            });
        } else {
            form.resetFields();
        }
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            const payload = {
                ...values,
                fluxo: fluxoId,
            };

            if (editing) {
                await atualizarTransicao(editing.id, payload);
            } else {
                await criarTransicao(payload);
            }

            message.success("Salvo com sucesso!");
            setIsModalOpen(false);
            form.resetFields();
            setEditing(null);
            carregarDados(fluxoId);
        } catch (error) {
            message.error("Erro ao salvar transição");
        }
    };

    const handleDelete = async (id) => {
        try {
            await excluirTransicao(id);
            message.success("Excluído com sucesso!");
            carregarDados(fluxoId);
        } catch {
            message.error("Erro ao excluir");
        }
    };

    const columns = [
        {
            title: "Origem",
            dataIndex: "origem_nome",
        },
        {
            title: "Destino",
            dataIndex: "destino_nome",
        },
        {
            title: "Label",
            dataIndex: "label",
            render: (text) => text || "-",
        },
        {
            title: "Ações",
            render: (_, record) => (
                <Space>

                    <Button type="link" onClick={() => openModal(record)}>
                        <IoMdCreate />
                    </Button>

                    <Popconfirm
                        title="Deseja excluir?"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button danger type="link">
                            <IoMdTrash />
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

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
                            title: 'Transições',
                        },
                    ]}
                />
            </SectionHeader>

            <SectionContent>

                <div style={{display: "flex", gap: "16px"}}>
                    <Select
                        placeholder="Selecione um fluxo"
                        style={{ width: 350, marginBottom: 16 }}
                        onChange={handleSelecionarFluxo}
                        value={fluxoId}
                        showSearch
                        onClear
                        optionFilterProp="children"
                    >
                        {fluxos.map((fluxo) => (
                            <Option key={fluxo.id} value={fluxo.id}>
                                {fluxo.nome || fluxo.titulo || `Fluxo ${fluxo.id}`}
                            </Option>
                        ))}
                    </Select>

                    <div style={{ marginBottom: 16 }}>
                        <Button
                            type="primary"
                            disabled={!fluxoId || etapas.length < 2}
                            onClick={() => openModal()}
                        >
                            Nova Transição
                        </Button>
                    </div>
         
                </div>

                <Table
                    rowKey="id"
                    dataSource={transicoes}
                    columns={columns}
                    loading={loading}
                />

                <Modal
                    title={editing ? "Editar Transição" : "Nova Transição"}
                    open={isModalOpen}
                    onOk={handleSubmit}
                    onCancel={() => {
                        setIsModalOpen(false);
                        setEditing(null);
                        form.resetFields();
                    }}
                    okText="Salvar"
                    cancelText="Cancelar"
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="origem"
                            label="Origem"
                            rules={[{ required: true, message: "Selecione a etapa de origem" }]}
                        >
                            <Select placeholder="Selecione a etapa de origem">
                                {etapas.map((e) => (
                                    <Option key={e.id} value={e.id}>
                                        {e.nome_etapa || `Etapa ${e.id}`}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="destino"
                            label="Destino"
                            rules={[{ required: true, message: "Selecione a etapa de destino" }]}
                        >
                            <Select placeholder="Selecione a etapa de destino">
                                {etapas.map((e) => (
                                    <Option key={e.id} value={e.id}>
                                        {e.nome_etapa || `Etapa ${e.id}`}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="label"
                            label="Label"
                            rules={[{ required: true }]}
                        >
                            <Select
                                showSearch
                                placeholder="Selecione o tipo da transição"
                                optionFilterProp="label"
                                options={LABEL_OPTIONS}
                                filterOption={(input, option) =>
                                    option?.label
                                        ?.toLowerCase()
                                        ?.includes(input.toLowerCase())
                                }
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </SectionContent>
        </Section>
    );
}