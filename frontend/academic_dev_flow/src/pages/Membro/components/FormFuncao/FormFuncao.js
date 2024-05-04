import { Button, Checkbox, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { listarFuncoes } from "../../../../services/membroProjetoService";
import { useMembroContexto } from "../../context/MembroContexto";

const FormFuncao = ({ onSubmit, onCancel }) => {
    const { dadosFuncao } = useMembroContexto();
    const [form] = Form.useForm();
    const [optionsFuncoes, setOptionsFuncoes] = useState([]);

    const handleListarFuncoes = async () => {
        const response = await listarFuncoes();

        if (!response.error && response.data) {
            const dados = response.data.map((item) => {
                return {
                    value: item.id,
                    label: item.nome,
                };
            });
            setOptionsFuncoes(dados);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await handleListarFuncoes();
            if (dadosFuncao !== null) {
                form.setFieldsValue(dadosFuncao);
            }
        };

        fetchData();
    }, []);

    // Definir estado inicial do checkbox com base nos dados existentes
    useEffect(() => {
        if (dadosFuncao && dadosFuncao.ativo !== undefined) {
            form.setFieldsValue({ ativo: dadosFuncao.ativo });
        }
    }, [dadosFuncao]);

    return (
        <Form
            className="global-form"
            form={form}
            layout="vertical"
            onFinish={onSubmit}
        >
            <Form.Item>
                <h4> DEFINIR FUNÇÃO MEMBRO </h4>
            </Form.Item>

            <Form.Item label="Membro" name="nome_membro">
                <Input name="nome_membro" />
            </Form.Item>

            <Form.Item label="Função" name="id_funcao">
                <Select options={optionsFuncoes} />
            </Form.Item>

            <Form.Item label="Data de término" name="data_termino">
                <Input type="date" />
            </Form.Item>

            <Form.Item name="ativo" valuePropName="checked">
                <Checkbox>Ativo</Checkbox>
            </Form.Item>

            <div style={{ display: "flex", gap: "10px" }}>
                <Button type="primary" htmlType="submit">
                    Salvar
                </Button>
                <Button danger type="primary" onClick={onCancel}>
                    Cancelar
                </Button>
            </div>
        </Form>
    );
};

export default FormFuncao;
