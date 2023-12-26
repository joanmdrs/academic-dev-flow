import React, { useState } from "react";
import "./EtapaStep.css";
import { useForm } from "antd/es/form/Form";
import { Form, Input, Select, Button } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import EtapaList from "../EtapaList/EtapaList";
import { useFormContext } from "../../Flow/FormProvider/FormProvider";

const { Option } = Select;

const STATUS_CHOICES = [
    { value: 'Pendente', label: 'Pendente' },
    { value: 'Em andamento', label: 'Em andamento' },
    { value: 'Concluída', label: 'Concluída' },
];

const EtapaStep = () => {

    const [form] = useForm();
    const { etapaDetails, setEtapaDetails } = useFormContext();
    const [nameButtonAdd, setNameButtonAdd] = useState("Adicionar Etapa");
    const [editIndex, setEditIndex] = useState(null);

    const saveEtapa = (values) => {
        if (values.nome !== undefined) {
            if (editIndex !== null) {
                
                updateEtapa(editIndex, values);
                setEditIndex(null); 
            } else {
                
                createEtapa(values);
            }
            form.resetFields();
        }
    };

    const createEtapa = (values) => {
        const novaEtapa = {
            ...values,
        };
        setEtapaDetails([...etapaDetails, novaEtapa]);
    };

    const updateEtapa = (index, values) => {
        const etapaAtualizada = {
            ...etapaDetails[index],
            ...values,
        };
        const novasEtapas = [...etapaDetails];
        novasEtapas[index] = etapaAtualizada;
        setEtapaDetails(novasEtapas);
    };

    const deleteEtapa = (record) => {
        const novaListaEtapas = etapaDetails.filter(etapa => etapa !== record);
        setEtapaDetails(novaListaEtapas);
    };

    const setFieldsEtapa = (record, index) => {
        form.setFields([
            { name: 'nome', value: record.nome },
            { name: 'descricao', value: record.descricao },
            { name: 'data_inicio', value: record.data_inicio },
            { name: 'data_fim', value: record.data_fim },
            { name: 'status', value: record.status }
        ]);

        setNameButtonAdd("Editar etapa");
        setEditIndex(index);
    };

    return (
        <div className="step-add-etapa">
            <div className="form-add-etapa">
                <h4>Cadastrar etapa</h4>
                <Form form={form} layout="vertical">
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
                        <Select id="status" name="status">
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
                <Button 
                    type="primary" 
                    id="button-add-etapa" 
                    onClick={() => saveEtapa(form.getFieldsValue())}
                >
                    <PlusOutlined />
                    {nameButtonAdd}

                </Button>

                {etapaDetails.length > 0 && (
                    <EtapaList
                        etapas={etapaDetails}
                        updateEtapa={setFieldsEtapa}
                        deleteEtapa={deleteEtapa}
                    />
                )}
            </div>
        </div>
    );
};

export default EtapaStep;
