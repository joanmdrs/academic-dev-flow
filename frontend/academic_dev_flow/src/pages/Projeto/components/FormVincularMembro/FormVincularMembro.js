import { Button, Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { listarMembros } from "../../../../services/membroService";
import { useContextoProjeto } from "../../context/ContextoProjeto";
import { useForm } from "antd/es/form/Form";

const FormVincularMembro = ({onSubmit, onCancel}) => {

    const [optionsMembros, setOptionsMembros] = useState([]);
    const {hasProjeto} = useContextoProjeto();
    const [form] = useForm();

    const handleGetMembros = async () => {
        const response = await listarMembros();
        if (!response.error){
            const resultados = response.data.map((item) => ({
                value: item.id,
                label: `${item.nome} - ${item.nome_grupo} `,
            }));
            setOptionsMembros(resultados);
        }
    };

    useEffect(() => {
        handleGetMembros();
    }, []);

    const handleSubmitForm = () => {         
        const formData = {             
            "projeto": hasProjeto.id,             
            "membros": form.getFieldValue('membros') || []
        };         
        onSubmit(formData);
    };
    
    return (
        <div>
            <Form form={form} layout="vertical" onFinish={handleSubmitForm} className="global-form global-div">
                <Form.Item>
                    <h4>VINCULAR MEMBRO(S)</h4>
                </Form.Item>
                <Form.Item
                    label="Membro(s)"
                    name="membros"
                    rules={[{ required: true, message: "Por favor, selecione um membro!" }]}
                >
                    <Select
                        mode="multiple"
                        showSearch
                        allowClear
                        placeholder="Pesquise ou selecione o membro"
                        options={optionsMembros}
                        filterOption={(input, option) => option?.label.toLowerCase().includes(input.toLowerCase())}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Salvar
                    </Button>
                    <Button type="primary" style={{ marginLeft: "10px" }} danger onClick={onCancel}>
                        Cancelar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default FormVincularMembro;
