import React, { useState } from "react";
import "./EtapaForm.css";
import { useForm } from "antd/es/form/Form";
import {Form, Input, Select, Button, } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import EtapaList from "../EtapaList/EtapaList";

const {Option} = Select

const STATUS_CHOICES = [
    { value: 'Pendente', label: 'Pendente' },
    { value: 'Em andamento', label: 'Em andamento' },
    { value: 'Concluída', label: 'Concluída' },
];

const EtapaForm = () => {

    const [etapas, setEtapas] = useState([]);

    const [form] = useForm();

    return (
        <div className="step-add-etapa">
            <h3>Cadastro das etapas do fluxo de desenvolvimento</h3>
            <div className="form-add-etapa">
                <Form form={form}>
                    <Form.Item name="nome" label="Nome">
                        <Input />
                    </Form.Item>

                    <Form.Item name="descricao" label="Descrição">
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    <Form.Item name="data_inicio" label="Data Início">
                        <Input type="date" />
                    </Form.Item>

                    <Form.Item name="data_fim" label="Data Fim">
                        <Input type="date" />
                    </Form.Item>

                    <Form.Item name="status" label="Status">
                        <Select
                            id="status"
                            name="status"
                            
                            >
                            <Option value=""></Option>

                            {STATUS_CHOICES.map((option) => (
                                <Option key={option.value} value={option.value}>
                                {option.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </div>

            <div className="button-add-etapa">
                <Button id="button-add-etapa">
                    <PlusOutlined />
                    Adicionar etapa
                </Button>

                {etapas.length > 0 && (
                    <EtapaList etapas={etapas}/>
                )}
            </div>
        </div>
    );
}

export default EtapaForm;