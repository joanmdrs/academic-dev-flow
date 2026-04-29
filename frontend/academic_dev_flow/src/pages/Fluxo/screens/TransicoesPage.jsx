import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Select, Input, Space, Popconfirm, message } from "antd";
import { atualizarTransicao, criarTransicao, excluirTransicao, listarEtapasPorFluxo, listarTransicoesPorFluxo } from "../../../services/fluxoEtapaService";
import Section from "../../../components/Section/Section";
import SectionContent from "../../../components/SectionContent/SectionContent";



const { Option } = Select;

export default function TransicoesPage() {
    const [transicoes, setTransicoes] = useState([]);
    const [etapas, setEtapas] = useState([]);
    const [loading, setLoading] = useState(false);

    const [fluxoId, setFluxoId] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);

    const [form] = Form.useForm();

    // 🔹 carregar dados
    const carregarDados = async (id) => {
        if (!id) return;

        setLoading(true);

        try {
            const [resTransicoes, resEtapas] = await Promise.all([
                listarTransicoesPorFluxo(id),
                listarEtapasPorFluxo(id),
            ]);

            setTransicoes(resTransicoes.data);
            setEtapas(resEtapas.data);
        } catch (e) {
            message.error("Erro ao carregar dados");
        }

        setLoading(false);
    };

    // 🔹 abrir modal
    const openModal = (record = null) => {
        setEditing(record);
        setIsModalOpen(true);

        if (record) {
            form.setFieldsValue(record);
        } else {
            form.resetFields();
        }
    };

    // 🔹 salvar
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
            carregarDados(fluxoId);

        } catch (e) {
            message.error("Erro ao salvar");
        }
    };

    // 🔹 excluir
    const handleDelete = async (id) => {
        try {
            await excluirTransicao(id);
            message.success("Excluído com sucesso!");
            carregarDados(fluxoId);
        } catch {
            message.error("Erro ao excluir");
        }
    };

  // 🔹 colunas
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
        },
        {
            title: "Ações",
            render: (_, record) => (
                <Space>
                <Button onClick={() => openModal(record)}>Editar</Button>

                <Popconfirm
                    title="Deseja excluir?"
                    onConfirm={() => handleDelete(record.id)}
                >
                    <Button danger>Excluir</Button>
                </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Section>
            <SectionContent>

            
            <h2>Gerenciamento de Transições</h2>

            {/* 🔹 SELECT DE FLUXO */}
            <Select
                placeholder="Selecione um fluxo"
                style={{ width: 300, marginBottom: 16 }}
                onChange={(value) => {
                setFluxoId(value);
                carregarDados(value);
                }}
            >
                {/* 🔥 você pode integrar com seu service de fluxos */}
                <Option value={1}>Fluxo 1</Option>
                <Option value={2}>Fluxo 2</Option>
            </Select>

            {/* 🔹 BOTÃO NOVO */}
            <div style={{ marginBottom: 16 }}>
                <Button
                    type="primary"
                    disabled={!fluxoId}
                    onClick={() => openModal()}
                >
                    Nova Transição
                </Button>
            </div>

            {/* 🔹 TABELA */}
            <Table
                rowKey="id"
                dataSource={transicoes}
                columns={columns}
                loading={loading}
            />

            {/* 🔹 MODAL */}
            <Modal
                title={editing ? "Editar Transição" : "Nova Transição"}
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form form={form} layout="vertical">

                    <Form.Item
                        name="origem"
                        label="Origem"
                        rules={[{ required: true }]}
                    >
                        <Select>
                            {etapas.map((e) => (
                                <Option key={e.id} value={e.id}>
                                    {e.etapa_nome}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="destino"
                        label="Destino"
                        rules={[{ required: true }]}
                    >
                        <Select>
                            {etapas.map((e) => (
                                <Option key={e.id} value={e.id}>
                                {e.etapa_nome}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="label"
                        label="Label"
                    >
                        <Input placeholder="Ex: aprovado, reprovado..." />
                    </Form.Item>
                </Form>
            </Modal>
            </SectionContent>
        </Section>
    );
}
